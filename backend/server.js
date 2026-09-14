const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const fs = require('fs');
const yaml = require('js-yaml');
const AdmZip = require('adm-zip');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const axios = require('axios');
const k8s = require('@kubernetes/client-node');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

const encryptionKey = process.env.CLUSTER_ENCRYPTION_KEY || '12345678901234567890123456789012';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'dev-secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'client',
    tenant TEXT DEFAULT 'default',
    status TEXT,
    siret TEXT,
    discount_applied INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS blueprints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    version TEXT,
    chartPath TEXT,
    owner TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    blueprint TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    namespace TEXT,
    owner TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS blueprint_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    blueprint_id INTEGER,
    version TEXT,
    chartPath TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(blueprint_id) REFERENCES blueprints(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan TEXT NOT NULL UNIQUE,
    max_slots INTEGER NOT NULL,
    used_slots INTEGER DEFAULT 0,
    discount_percent INTEGER NOT NULL,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS client_clusters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cluster_name TEXT NOT NULL,
    kubeconfig TEXT NOT NULL,
    api_server TEXT,
    token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  const initPromotions = [
    ['startup', 25, 40],
    ['scale-up', 15, 35],
    ['enterprise', 30, 30]
  ];

  initPromotions.forEach(([plan, max, discount]) => {
    db.run(
      `INSERT OR IGNORE INTO promotions (plan, max_slots, discount_percent)
       VALUES (?, ?, ?)`,
      [plan, max, discount]
    );
  });
});

app.post('/api/auth/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('status').isIn(['startup', 'scale-up', 'enterprise']),
  body('siret').isLength({ min: 14, max: 14 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, status, siret } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let discount = 0;

  const promo = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM promotions WHERE plan = ? AND active = 1', [status], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  if (promo && promo.used_slots < promo.max_slots) {
    discount = promo.discount_percent;
    db.run('UPDATE promotions SET used_slots = used_slots + 1 WHERE id = ?', [promo.id]);
    db.run('UPDATE promotions SET active = 0 WHERE used_slots >= max_slots');
  }

  db.run(
    'INSERT INTO users (email, password, status, siret, discount_applied) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, status, siret, discount],
    function(err) {
      if (err) return res.status(400).json({ error: 'Email déjà utilisé' });
      const token = jwt.sign(
        { id: this.lastID, email, role: 'client', tenant: 'default', status },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '24h' }
      );
      res.status(201).json({
        id: this.lastID,
        email,
        status,
        discount,
        token,
        user: { id: this.lastID, email, role: 'client', tenant: 'default', status, discount }
      });
    }
  );
});

app.post('/api/auth/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Identifiants invalides' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Identifiants invalides' });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, tenant: user.tenant, status: user.status },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '24h' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant: user.tenant,
        status: user.status,
        discount: user.discount_applied
      }
    });
  });
});

app.use('/api', authenticateToken);

app.get('/api/promotions', (req, res) => {
  db.run('UPDATE promotions SET active = 0 WHERE used_slots >= max_slots');
  db.all('SELECT * FROM promotions WHERE active = 1', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/clusters/register', async (req, res) => {
  const { clusterName, kubeconfig, apiServer, token } = req.body;
  const userId = req.user.id;

  let kubeconfigString = kubeconfig;
  if (!kubeconfigString && apiServer && token) {
    kubeconfigString = `
apiVersion: v1
clusters:
- cluster:
    server: ${apiServer}
  name: cluster
contexts:
- context:
    cluster: cluster
    user: user
  name: context
current-context: context
users:
- name: user
  user:
    token: ${token}
`;
  }

  if (!kubeconfigString) {
    return res.status(400).json({ error: 'Fournissez soit un kubeconfig, soit un apiServer + token.' });
  }

  try {
    const kc = new k8s.KubeConfig();
    kc.loadFromString(kubeconfigString);
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    await k8sApi.getNamespace('default');
  } catch (err) {
    return res.status(400).json({ error: 'Impossible de se connecter au cluster. Vérifiez les identifiants.' });
  }

  const encryptedKubeconfig = encrypt(kubeconfigString);

  db.run(
    `INSERT INTO client_clusters (user_id, cluster_name, kubeconfig)
     VALUES (?, ?, ?)`,
    [userId, clusterName, encryptedKubeconfig],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, clusterName });
    }
  );
});

const upload = multer({ dest: 'uploads/' });
app.post('/api/blueprints/upload', upload.single('chart'), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'Fichier manquant' });

  try {
    const zip = new AdmZip(file.path);
    const chartYaml = zip.readAsText('Chart.yaml');
    if (!chartYaml) throw new Error('Chart.yaml introuvable');
    const chart = yaml.load(chartYaml);
    const version = chart.version || '1.0.0';

    const destPath = `./charts/${name}-${version}.tgz`;
    fs.copyFileSync(file.path, destPath);

    db.run(
      `INSERT INTO blueprints (name, description, version, chartPath, owner)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description || '', version, destPath, req.user.tenant],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.run(
          `INSERT INTO blueprint_versions (blueprint_id, version, chartPath)
           VALUES (?, ?, ?)`,
          [this.lastID, version, destPath]
        );
        res.status(201).json({ id: this.lastID, name, version, chartPath: destPath });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    fs.unlinkSync(file.path);
  }
});

app.post('/api/blueprints/generate', async (req, res) => {
  const { name, description, version } = req.body;
  const destPath = `./charts/${name}-${version || '1.0.0'}.tgz`;
  fs.writeFileSync(destPath, 'Placeholder chart content');

  db.run(
    `INSERT INTO blueprints (name, description, version, chartPath, owner)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description || '', version || '1.0.0', destPath, req.user.tenant],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, version });
    }
  );
});

app.get('/api/blueprints', (req, res) => {
  const tenant = req.user.tenant;
  db.all('SELECT * FROM blueprints WHERE owner = ?', [tenant], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/blueprints/:id/versions', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM blueprint_versions WHERE blueprint_id = ? ORDER BY createdAt DESC', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/applications', async (req, res) => {
  const { name, blueprint } = req.body;
  const userId = req.user.id;
  const tenant = req.user.tenant;

  if (!name || !blueprint) {
    return res.status(400).json({ error: 'name et blueprint requis' });
  }

  const bp = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM blueprints WHERE name = ? AND owner = ?', [blueprint, tenant], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  if (!bp) return res.status(404).json({ error: 'Blueprint introuvable' });

  const cluster = await new Promise((resolve, reject) => {
    db.get('SELECT kubeconfig FROM client_clusters WHERE user_id = ?', [userId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  if (!cluster) {
    return res.status(400).json({ error: 'Aucun cluster enregistré.' });
  }

  const namespace = `${tenant}-${name}`;

  try {
    const kc = new k8s.KubeConfig();
    const decryptedKubeconfig = decrypt(cluster.kubeconfig);
    kc.loadFromString(decryptedKubeconfig);
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const appsApi = kc.makeApiClient(k8s.AppsV1Api);

    try {
      await k8sApi.createNamespace({ metadata: { name: namespace } });
    } catch (err) {
      if (err.response?.body?.reason !== 'AlreadyExists') {
        throw err;
      }
    }

    const deploymentManifest = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: { name, namespace },
      spec: {
        replicas: 1,
        selector: { matchLabels: { app: name } },
        template: {
          metadata: { labels: { app: name } },
          spec: {
            containers: [{
              name,
              image: 'nginx:latest',
              ports: [{ containerPort: 80 }]
            }]
          }
        }
      }
    };

    await appsApi.createNamespacedDeployment(namespace, deploymentManifest);

    db.run(
      `INSERT INTO applications (name, blueprint, status, namespace, owner)
       VALUES (?, ?, 'running', ?, ?)`,
      [name, blueprint, namespace, tenant],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        io.emit('app-updated', { id: this.lastID, status: 'running' });
        res.status(201).json({ id: this.lastID, name, blueprint, status: 'running', namespace });
      }
    );
  } catch (err) {
    console.error('Erreur déploiement Kubernetes:', err);
    res.status(500).json({ error: 'Échec du déploiement dans le cluster' });
  }
});

app.get('/api/applications', (req, res) => {
  const tenant = req.user.tenant;
  db.all('SELECT * FROM applications WHERE owner = ? ORDER BY createdAt DESC', [tenant], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.delete('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM applications WHERE id = ? AND owner = ?', [id, req.user.tenant], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get('/api/applications/:id/metrics', (req, res) => {
  res.json({
    cpu: Math.random() * 80 + 10,
    memory: Math.random() * 60 + 20,
    latency: Math.random() * 150 + 50
  });
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/ai/ask', async (req, res) => {
  const { message, context } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Tu es un assistant technique expert pour la plateforme PolyScale. Tu aides les utilisateurs à créer des blueprints, à déployer des applications et à interpréter les métriques. Réponds de manière concise et pratique.' },
        { role: 'user', content: message },
        ...(context ? [{ role: 'assistant', content: `Contexte actuel : ${JSON.stringify(context)}` }] : [])
      ],
      temperature: 0.7,
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ error: 'Erreur du service IA' });
  }
});

io.on('connection', (socket) => {
  console.log('Client connecté');
  socket.on('disconnect', () => console.log('Client déconnecté'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

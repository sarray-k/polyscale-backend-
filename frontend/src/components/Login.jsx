import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      login(res.data.user, res.data.token);
      setMessage('Connexion réussie');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Connexion</h3>
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={styles.input} />
      <input type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={styles.input} />
      <button type="submit" style={styles.button}>Se connecter</button>
      {message && <p>{message}</p>}
    </form>
  );
}

const styles = {
  form: { display: 'grid', gap: 12 },
  input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #334155' },
  button: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }
};

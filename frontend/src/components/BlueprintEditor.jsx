import React, { useState } from 'react';

export default function BlueprintEditor() {
  const [form, setForm] = useState({ name: 'payment-saas', description: '', version: '1.0.0' });

  return (
    <div>
      <h3>Éditeur de blueprint</h3>
      <div style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" style={styles.input} />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" style={styles.input} rows={4} />
        <input value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} placeholder="Version" style={styles.input} />
        <button style={styles.button}>Créer le blueprint</button>
      </div>
    </div>
  );
}

const styles = {
  input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#fff' },
  button: { background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }
};

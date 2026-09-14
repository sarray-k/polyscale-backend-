import React, { useState } from 'react';

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Je peux vous aider à générer un blueprint ou interpréter vos métriques.');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setReply(`Analyse de la demande: "${message}"\nRéponse suggérée: créez un blueprint avec un service web et un stockage persistant.`);
    setMessage('');
  };

  return (
    <div style={{ position: 'relative', maxWidth: 600 }}>
      <h3>Assistant IA</h3>
      <div style={{ background: '#111827', borderRadius: 12, padding: 16, border: '1px solid #334155' }}>
        <p style={{ whiteSpace: 'pre-wrap', marginTop: 0 }}>{reply}</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Posez une question à l’assistant..." style={{ padding: 12, borderRadius: 8, background: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
        <button type="submit" style={{ background: '#14b8a6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}>Envoyer</button>
      </form>
    </div>
  );
}

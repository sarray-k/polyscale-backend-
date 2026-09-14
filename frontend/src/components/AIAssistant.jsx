import React, { useState } from 'react';

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Je peux vous aider à générer un blueprint ou interpréter vos métriques.');

  const handleSubmit = (e) => {
    e.preventDefault();
    setReply(`Analyse de la demande: "${message}"\nRéponse suggérée: créez un blueprint avec un service web et un stockage persistant.`);
  };

  return (
    <div>
      <h3>Assistant IA</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Posez une question à l’assistant..." style={{ padding: 12, borderRadius: 8 }} />
        <button type="submit" style={{ background: '#14b8a6', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}>Envoyer</button>
      </form>
      <pre style={{ background: '#111827', padding: 16, borderRadius: 8, whiteSpace: 'pre-wrap' }}>{reply}</pre>
    </div>
  );
}

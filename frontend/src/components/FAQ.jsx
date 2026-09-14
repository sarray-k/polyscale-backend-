import React from 'react';

const items = [
  { q: 'Que fait PolyScale ?', a: 'Il permet de générer, gérer et déployer des blueprints applicatifs sur un cluster Kubernetes.' },
  { q: 'Peut-on intégrer un cluster ?', a: 'Oui, via kubeconfig ou apiServer + token.' },
  { q: 'Le backend est-il sécurisé ?', a: 'Il inclut JWT, validation des entrées et chiffrement des secrets.' }
];

export default function FAQ() {
  return (
    <div>
      <h3>FAQ</h3>
      {items.map((item) => (
        <div key={item.q} style={{ marginBottom: 12 }}>
          <strong>{item.q}</strong>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
}

import React from 'react';

const plans = [
  { name: 'Startup', price: '€29/mois', discount: '40%' },
  { name: 'Scale-up', price: '€79/mois', discount: '35%' },
  { name: 'Enterprise', price: '€199/mois', discount: '30%' }
];

export default function Pricing() {
  return (
    <div>
      <h3>Tarifs</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ background: '#111827', padding: 20, borderRadius: 12 }}>
            <h4>{plan.name}</h4>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>{plan.price}</p>
            <small>Réduction: {plan.discount}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

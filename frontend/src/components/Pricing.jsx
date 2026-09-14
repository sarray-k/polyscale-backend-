import React from 'react';

const plans = [
  {
    name: 'Startup',
    price: '€29/mois',
    discount: '40%',
    modules: ['1 cluster', 'Blueprints', 'Monitoring', 'Support basic']
  },
  {
    name: 'Scale-up',
    price: '€79/mois',
    discount: '35%',
    modules: ['5 clusters', 'CI/CD', 'AI Assistant', 'SLA Premium']
  },
  {
    name: 'Enterprise',
    price: '€199/mois',
    discount: '30%',
    modules: ['Clusters illimités', 'RBAC avancé', 'Audit trail', 'Support 24/7']
  }
];

export default function Pricing() {
  return (
    <div>
      <h3>Tarifs</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ background: '#111827', padding: 20, borderRadius: 12, border: '1px solid #334155' }}>
            <h4>{plan.name}</h4>
            <p style={{ fontSize: 24, fontWeight: 'bold', margin: '12px 0' }}>{plan.price}</p>
            <small style={{ color: '#a5f3fc' }}>Réduction: {plan.discount}</small>
            <ul style={{ marginTop: 16, paddingLeft: 18 }}>
              {plan.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

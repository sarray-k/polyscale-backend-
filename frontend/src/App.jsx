import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { ToastView } from './components/Toast.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Pricing from './components/Pricing.jsx';
import PromoPage from './components/PromoPage.jsx';
import FAQ from './components/FAQ.jsx';
import BlueprintEditor from './components/BlueprintEditor.jsx';
import AIAssistant from './components/AIAssistant.jsx';
import Help from './components/Help.jsx';

function PublicLayout() {
  const [view, setView] = useState('pricing');

  return (
    <div style={styles.page}>
      <div style={styles.authCard}>
        <h1>PolyScale</h1>
        <div style={styles.tabs}>
          <button style={styles.tab} onClick={() => setView('login')}>Connexion</button>
          <button style={styles.tab} onClick={() => setView('signup')}>Inscription</button>
          <button style={styles.tab} onClick={() => setView('pricing')}>Tarifs</button>
          <button style={styles.tab} onClick={() => setView('promo')}>Promotions</button>
        </div>
        {view === 'login' && <Login />}
        {view === 'signup' && <Signup />}
        {view === 'pricing' && <Pricing />}
        {view === 'promo' && <PromoPage />}
      </div>
    </div>
  );
}

function DashboardLayout() {
  const { logout } = useAuth();
  const [view, setView] = useState('editor');

  return (
    <div style={styles.dashboard}>
      <aside style={styles.sidebar}>
        <h2>PolyScale</h2>
        <button style={styles.menuButton} onClick={() => setView('editor')}>Blueprints</button>
        <button style={styles.menuButton} onClick={() => setView('assistant')}>Assistant IA</button>
        <button style={styles.menuButton} onClick={() => setView('promo')}>Promotions</button>
        <button style={styles.menuButton} onClick={() => setView('faq')}>FAQ</button>
        <button style={styles.menuButton} onClick={() => setView('help')}>Aide</button>
        <button style={styles.menuButton} onClick={logout}>Déconnexion</button>
      </aside>

      <main style={styles.main}>
        {view === 'editor' && <BlueprintEditor />}
        {view === 'assistant' && <AIAssistant />}
        {view === 'promo' && <PromoPage />}
        {view === 'faq' && <FAQ />}
        {view === 'help' && <Help />}
      </main>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <DashboardLayout /> : <PublicLayout />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastView />
    </>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'sans-serif'
  },
  authCard: {
    width: 'min(900px, 90vw)',
    background: '#111827',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20
  },
  tab: {
    background: '#1f2937',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer'
  },
  dashboard: {
    minHeight: '100vh',
    display: 'flex',
    background: '#020817'
  },
  sidebar: {
    width: 220,
    background: '#0f172a',
    color: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  main: {
    flex: 1,
    padding: 24,
    color: '#e2e8f0'
  },
  menuButton: {
    background: '#1e293b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 14px',
    cursor: 'pointer',
    textAlign: 'left'
  }
};

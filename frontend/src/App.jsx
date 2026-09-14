import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

const navItems = [
  { key: 'overview', label: 'Overview', active: true },
  { key: 'clusters', label: 'Clusters' },
  { key: 'blueprints', label: 'Blueprints' },
  { key: 'deployments', label: 'Deployments' },
  { key: 'metrics', label: 'Metrics' },
  { key: 'billing', label: 'Billing' },
  { key: 'security', label: 'Security' },
  { key: 'support', label: 'Support' }
];

const metrics = [
  { label: 'Active clusters', value: '12', delta: '+18.2%', tone: 'cyan' },
  { label: 'Deployments', value: '48', delta: '+12.4%', tone: 'green' },
  { label: 'Uptime', value: '99.97%', delta: '+0.3%', tone: 'blue' },
  { label: 'AI requests', value: '1.2K', delta: '+9.1%', tone: 'violet' }
];

const apps = [
  { name: 'crm-prod', cluster: 'prod-us-east', status: 'Healthy', uptime: '99.97%', owner: 'Ops' },
  { name: 'mobile-app', cluster: 'prod-eu-west', status: 'Running', uptime: '99.94%', owner: 'Platform' },
  { name: 'payments-saas', cluster: 'prod-us-west', status: 'Scaling', uptime: '99.91%', owner: 'Growth' },
  { name: 'billing-api', cluster: 'staging', status: 'Healthy', uptime: '99.92%', owner: 'Product' }
];

const planFeatures = [
  '1 cluster',
  '3 blueprints',
  '5 apps',
  'AI assistant',
  'Standard support'
];

function PublicLayout() {
  const [view, setView] = useState('pricing');

  return (
    <div style={styles.pageShell}>
      <div style={styles.heroGlow} />
      <header style={styles.topbarPublic}>
        <div style={styles.brandWrap}>
          <div style={styles.brandDot} />
          <div style={styles.brandTextGroup}>
            <span style={styles.brandText}>PolyScale</span>
            <span style={styles.partnerText}>by Elycoop</span>
          </div>
        </div>
        <div style={styles.topbarActions}>
          <button style={styles.ghostButton} onClick={() => setView('pricing')}>Pricing</button>
          <button style={styles.ghostButton} onClick={() => setView('promo')}>Promos</button>
          <button style={styles.primaryButton} onClick={() => setView('login')}>Login</button>
        </div>
      </header>

      <main style={styles.publicMain}>
        <section style={styles.heroSection}>
          <div style={styles.heroTextWrap}>
            <span style={styles.eyebrow}>Control plane for modern SaaS deployment</span>
            <h1 style={styles.heroTitle}>Deploy smarter. Manage clusters with confidence.</h1>
            <p style={styles.heroText}>
              PolyScale helps teams design, deploy, observe and secure SaaS workloads from a single cloud-native control plane.
            </p>
            <div style={styles.heroActions}>
              <button style={styles.primaryButton} onClick={() => setView('signup')}>Start free</button>
              <button style={styles.secondaryButton} onClick={() => setView('pricing')}>See pricing</button>
            </div>
            <div style={styles.trustRow}>
              <div><strong>99.97%</strong><span>uptime</span></div>
              <div><strong>12k</strong><span>deployments</span></div>
              <div><strong>24/7</strong><span>monitoring</span></div>
            </div>
          </div>

          <div style={styles.heroVisualCard}>
            <div style={styles.visualHeader}>
              <span style={styles.dotGreen} />
              <span style={styles.dotYellow} />
              <span style={styles.dotRed} />
            </div>
            <div style={styles.visualGrid}>
              <div style={styles.panelCard}>
                <span style={styles.panelLabel}>Cluster health</span>
                <strong style={styles.panelValue}>Excellent</strong>
                <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: '89%' }} /></div>
              </div>
              <div style={styles.panelCard}> 
                <span style={styles.panelLabel}>AI Assistant</span>
                <strong style={styles.panelValue}>Ready</strong>
              </div>
              <div style={styles.panelCardWide}>
                <div style={styles.rowBetween}><span>Deployments</span><span style={{ color: '#7ae7ff' }}>+18.2%</span></div>
                <div style={styles.barGroup}>
                  <span style={{ ...styles.bar, height: '58%' }} />
                  <span style={{ ...styles.bar, height: '72%' }} />
                  <span style={{ ...styles.bar, height: '81%' }} />
                  <span style={{ ...styles.bar, height: '93%' }} />
                  <span style={{ ...styles.bar, height: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featureGrid}>
          <div style={styles.featureCard}><span>Blueprints</span><strong>Reusable app templates</strong></div>
          <div style={styles.featureCard}><span>Clusters</span><strong>Secure multi-tenant access</strong></div>
          <div style={styles.featureCard}><span>Monitoring</span><strong>Live observability</strong></div>
          <div style={styles.featureCard}><span>Automation</span><strong>GitOps and deployment flows</strong></div>
        </section>

        <section style={styles.pricingSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.eyebrow}>Pricing</span>
            <h2 style={styles.sectionTitle}>Simple plans for every stage</h2>
          </div>
          <div style={styles.pricingCards}>
            <div style={styles.priceCard}>
              <span style={styles.planBadge}>Starter</span>
              <h3 style={styles.planTitle}>49€<small style={styles.planSmall}>/mo</small></h3>
              <ul style={styles.planList}>{planFeatures.map((f) => <li key={f}>{f}</li>)}</ul>
              <button style={styles.primaryButton} onClick={() => setView('signup')}>Get started</button>
            </div>
            <div style={{ ...styles.priceCard, ...styles.priceCardFeatured }}>
              <span style={{ ...styles.planBadge, ...styles.planBadgeFeatured }}>Scale-Up</span>
              <h3 style={styles.planTitle}>99€<small style={styles.planSmall}>/mo</small></h3>
              <ul style={styles.planList}>{['3 clusters', 'Unlimited blueprints', 'Advanced monitoring', 'Priority support', 'RBAC ready'].map((f) => <li key={f}>{f}</li>)}</ul>
              <button style={styles.primaryButton} onClick={() => setView('signup')}>Choose plan</button>
            </div>
            <div style={styles.priceCard}>
              <span style={styles.planBadge}>Enterprise</span>
              <h3 style={styles.planTitle}>199€<small style={styles.planSmall}>/mo</small></h3>
              <ul style={styles.planList}>{['Unlimited clusters', 'Advanced security', 'Private support', 'Custom onboarding', 'Dedicated tenant isolation'].map((f) => <li key={f}>{f}</li>)}</ul>
              <button style={styles.primaryButton} onClick={() => setView('signup')}>Talk to sales</button>
            </div>
          </div>
        </section>

        <section style={styles.switcherWrap}>
          <div style={styles.tabsRow}>
            <button style={styles.tabButton(view === 'login')} onClick={() => setView('login')}>Login</button>
            <button style={styles.tabButton(view === 'signup')} onClick={() => setView('signup')}>Signup</button>
            <button style={styles.tabButton(view === 'pricing')} onClick={() => setView('pricing')}>Tarifs</button>
            <button style={styles.tabButton(view === 'promo')} onClick={() => setView('promo')}>Promo</button>
          </div>
          {view === 'login' && <Login />}
          {view === 'signup' && <Signup />}
          {view === 'pricing' && <Pricing />}
          {view === 'promo' && <PromoPage />}
        </section>
      </main>
    </div>
  );
}

function DashboardLayout() {
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState('overview');

  return (
    <div style={styles.dashboardShell}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}> 
          <div style={styles.brandDot} />
          <span>PolyScale</span>
        </div>

        <nav style={styles.nav}> 
          {navItems.map((item) => (
            <button
              key={item.key}
              style={styles.navButton(item.key === activeView)}
              onClick={() => setActiveView(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button style={styles.logoutButton} onClick={logout}>Déconnexion</button>
      </aside>

      <main style={styles.dashboardBody}>
        <header style={styles.dashboardHeader}>
          <div>
            <div style={styles.headerBrandRow}>
              <span style={styles.eyebrow}>Overview</span>
              <span style={styles.partnerPill}>Elycoop</span>
            </div>
            <h2 style={styles.dashboardTitle}>Control plane status</h2>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.secondaryButton}>Export</button>
            <button style={styles.primaryButton}>Deploy</button>
          </div>
        </header>

        <section style={styles.kpiGrid}>
          {metrics.map((metric) => (
            <div key={metric.label} style={styles.kpiCard}>
              <span style={styles.kpiLabel}>{metric.label}</span>
              <div style={styles.kpiValueRow}>
                <strong style={styles.kpiValue}>{metric.value}</strong>
                <span style={styles.kpiDelta(metric.tone)}>{metric.delta}</span>
              </div>
            </div>
          ))}
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.mainPanel}> 
            <div style={styles.panelTitleRow}>
              <h3 style={styles.panelTitle}>Live deployments</h3>
              <span style={styles.chip}>Healthy</span>
            </div>
            <div style={styles.barChartWrap}>
              {[42, 58, 74, 86, 92, 99].map((h, index) => (
                <div key={index} style={styles.metricBarCol}>
                  <span style={{ ...styles.metricBar, height: `${h}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.sidePanel}>
            <div style={styles.panelTitleRow}>
              <h3 style={styles.panelTitle}>Plan</h3>
              <span style={styles.chip}>Scale-Up</span>
            </div>
            <p style={styles.sideText}>99 €/month</p>
            <ul style={styles.listSimple}>
              <li>3 clusters</li>
              <li>Unlimited blueprints</li>
              <li>RBAC controls</li>
            </ul>
          </div>
        </section>

        <section style={styles.tablePanel}>
          <div style={styles.panelTitleRow}>
            <h3 style={styles.panelTitle}>Applications</h3>
            <button style={styles.secondaryButton}>New app</button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Cluster</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Uptime</th>
                <th style={styles.th}>Owner</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.name}>
                  <td style={styles.td}>{app.name}</td>
                  <td style={styles.td}>{app.cluster}</td>
                  <td style={styles.td}><span style={styles.statusPill(app.status)}>{app.status}</span></td>
                  <td style={styles.td}>{app.uptime}</td>
                  <td style={styles.td}>{app.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={styles.bottomGrid}>
          <div style={styles.panelBox}>
            <div style={styles.panelTitleRow}>
              <h3 style={styles.panelTitle}>AI assistant</h3>
            </div>
            <AIAssistant />
          </div>
          <div style={styles.panelBox}>
            <div style={styles.panelTitleRow}>
              <h3 style={styles.panelTitle}>Blueprint editor</h3>
            </div>
            <BlueprintEditor />
          </div>
        </section>

        <footer style={styles.footerBar}>
          <span>© 2026 PolyScale</span>
          <span style={styles.footerPartner}>Partnered with Elycoop</span>
        </footer>
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
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastView />
    </>
  );
}

const styles = {
  pageShell: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, rgba(76,201,240,0.12), rgba(2,8,23,0.95) 40%, #020817 100%)',
    color: '#e2e8f0',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },
  heroGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 75% 10%, rgba(76,201,240,0.2), transparent 20%)',
    pointerEvents: 'none'
  },
  topbarPublic: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '22px 20px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 700,
    letterSpacing: '0.04em'
  },
  brandTextGroup: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap'
  },
  brandDot: {
    width: 10,
    height: 10,
    background: '#4cc9f0',
    borderRadius: '50%',
    boxShadow: '0 0 18px rgba(76,201,240,0.8)'
  },
  brandText: {
    color: '#f8fafc',
    fontSize: 18
  },
  partnerText: {
    color: '#7ae7ff',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },
  topbarActions: {
    display: 'flex',
    gap: 10,
    alignItems: 'center'
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #4cc9f0, #7ae7ff)',
    color: '#04111d',
    border: 'none',
    borderRadius: 10,
    padding: '12px 18px',
    fontWeight: 700,
    cursor: 'pointer'
  },
  secondaryButton: {
    background: 'rgba(148,163,184,0.08)',
    color: '#e2e8f0',
    border: '1px solid rgba(148,163,184,0.2)',
    borderRadius: 10,
    padding: '12px 18px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  ghostButton: {
    background: 'transparent',
    color: '#dbeafe',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer'
  },
  publicMain: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '20px 20px 60px'
  },
  heroSection: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: 28,
    alignItems: 'center',
    paddingTop: 32
  },
  heroTextWrap: {
    maxWidth: 620
  },
  eyebrow: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: 999,
    background: 'rgba(76,201,240,0.12)',
    color: '#7ae7ff',
    border: '1px solid rgba(122,231,255,0.3)',
    letterSpacing: '0.08em',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  heroTitle: {
    margin: '20px 0 18px',
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    lineHeight: 1.02,
    letterSpacing: '-0.06em',
    color: '#f8fafc'
  },
  heroText: {
    color: '#cbd5e1',
    fontSize: 18,
    lineHeight: 1.7,
    marginBottom: 24
  },
  heroActions: {
    display: 'flex',
    gap: 12,
    marginBottom: 28
  },
  trustRow: {
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap',
    color: '#cbd5e1'
  },
  heroVisualCard: {
    border: '1px solid rgba(148,163,184,0.2)',
    background: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 20,
    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: 18
  },
  visualHeader: {
    display: 'flex',
    gap: 8,
    paddingBottom: 16
  },
  dotGreen: { width: 10, height: 10, borderRadius: '50%', background: '#22c55e' },
  dotYellow: { width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' },
  dotRed: { width: 10, height: 10, borderRadius: '50%', background: '#ef4444' },
  visualGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 16
  },
  panelCard: {
    background: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  panelCardWide: {
    gridColumn: '1 / -1',
    background: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 16,
    padding: 16
  },
  panelLabel: { fontSize: 12, color: '#94a3b8' },
  panelValue: { fontSize: 22, color: '#f8fafc', fontWeight: 700 },
  progressTrack: {
    width: '100%',
    height: 8,
    background: 'rgba(148,163,184,0.12)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4cc9f0, #7ae7ff)',
    borderRadius: 999
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#cbd5e1',
    marginBottom: 14
  },
  barGroup: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 12,
    height: 120,
    paddingTop: 12
  },
  bar: {
    flex: 1,
    background: 'linear-gradient(180deg, #7ae7ff, #4cc9f0)',
    borderRadius: '10px 10px 0 0',
    minHeight: 10
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 18,
    marginTop: 40
  },
  featureCard: {
    background: 'rgba(15, 23, 42, 0.72)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 20,
    color: '#e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  pricingSection: {
    marginTop: 72
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 28
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 'clamp(2rem, 3vw, 2.8rem)',
    margin: '12px 0 0'
  },
  pricingCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 18
  },
  priceCard: {
    background: 'rgba(15, 23, 42, 0.78)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 20,
    padding: 22,
    display: 'flex',
    flexDirection: 'column',
    gap: 18
  },
  priceCardFeatured: {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(122,231,255,0.5)',
    boxShadow: '0 20px 35px rgba(76,201,240,0.18)'
  },
  planBadge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    background: 'rgba(148,163,184,0.12)',
    color: '#cbd5e1',
    borderRadius: 999,
    padding: '7px 10px',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  planBadgeFeatured: {
    background: 'rgba(122,231,255,0.15)',
    color: '#7ae7ff'
  },
  planTitle: {
    margin: 0,
    fontSize: 40,
    color: '#f8fafc'
  },
  planSmall: {
    fontSize: 14,
    color: '#94a3b8'
  },
  planList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    color: '#cbd5e1'
  },
  switcherWrap: {
    marginTop: 48,
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 20,
    padding: 18
  },
  tabsRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 18,
    flexWrap: 'wrap'
  },
  tabButton: (active) => ({
    background: active ? 'rgba(76,201,240,0.12)' : 'rgba(148,163,184,0.08)',
    color: active ? '#7ae7ff' : '#e2e8f0',
    border: active ? '1px solid rgba(122,231,255,0.4)' : '1px solid rgba(148,163,184,0.12)',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: 600
  }),
  dashboardShell: {
    minHeight: '100vh',
    display: 'flex',
    background: '#020817',
    color: '#e2e8f0',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  },
  sidebar: {
    width: 240,
    background: 'linear-gradient(180deg, rgba(15,23,42,1), rgba(9,14,28,1))',
    borderRight: '1px solid rgba(148,163,184,0.12)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 22
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 700,
    fontSize: 20,
    color: '#f8fafc'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  navButton: (active) => ({
    background: active ? 'rgba(76,201,240,0.12)' : 'transparent',
    color: active ? '#7ae7ff' : '#dbeafe',
    border: active ? '1px solid rgba(122,231,255,0.35)' : '1px solid transparent',
    borderRadius: 10,
    padding: '11px 12px',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: 600
  }),
  logoutButton: {
    marginTop: 'auto',
    background: 'rgba(239,68,68,0.1)',
    color: '#fca5a5',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: 10,
    padding: '12px 14px',
    cursor: 'pointer',
    fontWeight: 600
  },
  dashboardBody: {
    flex: 1,
    padding: 28,
    background: 'radial-gradient(circle at top right, rgba(76,201,240,0.12), transparent 24%), #020817'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  headerBrandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap'
  },
  partnerPill: {
    display: 'inline-flex',
    padding: '4px 8px',
    borderRadius: 999,
    background: 'rgba(122,231,255,0.12)',
    color: '#7ae7ff',
    border: '1px solid rgba(122,231,255,0.25)',
    fontSize: 10,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 700
  },
  dashboardTitle: {
    margin: '6px 0 0',
    fontSize: 32,
    color: '#f8fafc'
  },
  headerActions: {
    display: 'flex',
    gap: 10
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 18,
    marginBottom: 24
  },
  kpiCard: {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 20
  },
  kpiLabel: {
    display: 'block',
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 14
  },
  kpiValueRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  kpiValue: {
    fontSize: 30,
    color: '#f8fafc'
  },
  kpiDelta: (tone) => ({
    display: 'inline-flex',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: tone === 'cyan' ? 'rgba(76,201,240,0.12)' : tone === 'green' ? 'rgba(34,197,94,0.12)' : tone === 'blue' ? 'rgba(96,165,250,0.12)' : 'rgba(168,85,247,0.12)',
    color: tone === 'cyan' ? '#7ae7ff' : tone === 'green' ? '#4ade80' : tone === 'blue' ? '#93c5fd' : '#c084fc'
  }),
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.6fr',
    gap: 18,
    marginBottom: 24
  },
  mainPanel: {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 18
  },
  sidePanel: {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 18
  },
  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18
  },
  panelTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: 18
  },
  chip: {
    display: 'inline-flex',
    padding: '6px 10px',
    borderRadius: 999,
    background: 'rgba(34,197,94,0.12)',
    color: '#4ade80',
    fontSize: 12,
    fontWeight: 700
  },
  barChartWrap: {
    height: 170,
    display: 'flex',
    alignItems: 'flex-end',
    gap: 12,
    paddingTop: 12
  },
  metricBarCol: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%'
  },
  metricBar: {
    width: '100%',
    maxWidth: 22,
    background: 'linear-gradient(180deg, #7ae7ff, #4cc9f0)',
    borderRadius: '10px 10px 0 0'
  },
  sideText: {
    fontSize: 28,
    margin: '10px 0 16px',
    color: '#f8fafc',
    fontWeight: 700
  },
  listSimple: {
    margin: 0,
    paddingLeft: 18,
    color: '#cbd5e1',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  tablePanel: {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#e2e8f0'
  },
  th: {
    textAlign: 'left',
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '10px 12px',
    borderBottom: '1px solid rgba(148,163,184,0.15)'
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid rgba(148,163,184,0.1)'
  },
  statusPill: (status) => ({
    display: 'inline-flex',
    padding: '6px 10px',
    borderRadius: 999,
    background: status === 'Healthy' ? 'rgba(34,197,94,0.12)' : status === 'Running' ? 'rgba(76,201,240,0.12)' : 'rgba(245,158,11,0.12)',
    color: status === 'Healthy' ? '#4ade80' : status === 'Running' ? '#7ae7ff' : '#fbbf24',
    fontWeight: 700,
    fontSize: 12
  }),
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18
  },
  panelBox: {
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 18,
    padding: 18,
    minHeight: 220
  },
  footerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    color: '#94a3b8',
    fontSize: 12,
    paddingTop: 8,
    borderTop: '1px solid rgba(148,163,184,0.12)'
  },
  footerPartner: {
    color: '#7ae7ff',
    fontWeight: 600
  }
};


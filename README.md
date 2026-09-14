# PolyScale

PolyScale is a full-stack SaaS platform ecosystem for blueprint-driven application deployment, AI assistance, and managed Kubernetes workloads.

## Structure

- `backend/`: Express API with SQLite, auth, Kubernetes integration, AI assistant and deployment logic.
- `frontend/`: React application for login, signup, pricing, blueprint generation, dashboards and AI help.
- `blueprints/`: Helm chart templates used as application blueprints.
- `argocd/`: GitOps deployment configuration.
- `monitoring/`: Prometheus and Grafana config.
- `tests/`: load and security testing assets.
- `scripts/`: operational automation.
- `docs/`: runbooks and diagrams.

## Quick start

1. Copy `.env.example` to `.env` and set secrets.
2. Install backend dependencies:
   `cd backend && npm install`
3. Install frontend dependencies:
   `cd frontend && npm install`
4. Start backend:
   `cd backend && npm start`
5. Start frontend:
   `cd frontend && npm run dev -- --host 0.0.0.0`

## Deployment targets

- Backend: Railway or any Node.js host
- Frontend: Blink.new / Vercel / static hosting
- GitOps: ArgoCD in Kubernetes cluster
- Monitoring: Prometheus + Grafana

## Notes

This repository contains a production-oriented scaffold designed to match the PolyScale ecosystem described in the project specification.

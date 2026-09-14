# PolyScale

PolyScale is a full-stack SaaS platform designed to let users manage application blueprints, deploy workloads to Kubernetes clusters, monitor performance, and automate operational checks through a unified developer experience.

## Overview

The project is organized around 4 key layers:

- Control Plane: backend API and React frontend
- Data Fabric: SQLite persistence and encrypted cluster configuration
- Compute Mesh: Kubernetes clusters and Helm blueprints
- Edge Layer: monitoring, alerts, load tests and security validations

## Repository structure

- backend/: Express API, auth, SQLite, Kubernetes integration, AI assistant, and deployment logic
- frontend/: React + Vite interface for login, signup, pricing, FAQ, AI assistant, and blueprint editor
- blueprints/: Helm chart templates for payment SaaS, CRM SaaS, and mobile app deployment
- argocd/: GitOps configuration with ApplicationSet and RBAC policies
- monitoring/: Prometheus + Grafana configuration and alert rules
- tests/: Locust and security tests for load, RBAC, mTLS, network segmentation, and rate limiting
- scripts/: operational utilities such as generating security reports
- docs/: incident response runbooks and architecture diagrams

## Prerequisites

- Node.js 18+
- npm
- Docker or Kubernetes environment for chart deployment
- Optional: Helm, ArgoCD, Prometheus, Grafana

## Local setup

1. Create environment values:
   cp .env.example .env
2. Update the required variables in `.env`:
   - JWT_SECRET
   - OPENAI_API_KEY
   - CLUSTER_ENCRYPTION_KEY
   - PORT
3. Install backend dependencies:
   cd backend && npm install
4. Install frontend dependencies:
   cd frontend && npm install
5. Start backend:
   cd backend && npm start
6. Start frontend:
   cd frontend && npm run dev -- --host 0.0.0.0

## Useful commands

- Backend only:
  make run-backend
- Frontend only:
  make run-frontend
- Full install:
  make install
- Security tests:
  make security-test
- Load test:
  make load-test
- Report generation:
  make report
- Clean workspace:
  make clean

## Deployment targets

- Backend: Railway / Node.js hosting
- Frontend: Vercel / Blink.new / static hosting
- GitOps: ArgoCD
- Monitoring: Prometheus + Grafana

## Security notes

- JWT is used for authenticated API access
- cluster secrets are encrypted before storage
- RBAC and security tests are included in the project structure
- rate limits and access boundaries should be enforced at the edge or ingress layer in production

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and update notes.

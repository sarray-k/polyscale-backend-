# Production deployment guide

This project is structured as a live SaaS backend with a React frontend and a Railway-ready backend service.

## 1. Environment variables

Set these variables in Railway or your hosting provider:

### Root/frontend values
- `FRONTEND_URL=https://your-frontend-domain.com`
- `CORS_ORIGIN=https://your-frontend-domain.com`

### Backend values
- `PORT=3000`
- `NODE_ENV=production`
- `JWT_SECRET=<strong-random-secret>`
- `OPENAI_API_KEY=<your-openai-key>`
- `STRIPE_SECRET_KEY=<live-stripe-secret-key>`
- `STRIPE_PUBLISHABLE_KEY=<live-stripe-publishable-key>`
- `STRIPE_WEBHOOK_SECRET=<webhook-signing-secret>`
- `STRIPE_PRICE_ID=<optional-price-id>`
- `CLUSTER_ENCRYPTION_KEY=<32-byte-key>`
- `ADMIN_EMAIL=admin@yourdomain.com`
- `APP_NAME=PolyScale`

## 2. Stripe setup

1. Create a Stripe account and select live mode.
2. Create product and price objects for your plans.
3. Add the webhook endpoint:
   - URL: `https://<your-api-domain>/api/payments/webhook`
   - Events: `checkout.session.completed`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
5. Add the secret and publishable keys in Railway variables.

## 3. Railway deployment

1. Connect the repository to Railway.
2. Set the service root to the project root.
3. Use the existing `railway.json` configuration.
4. Add the variables above in the Railway dashboard.
5. Deploy the service.

The backend starts with:

```bash
cd backend && npm start
```

The health check is configured to use:

```text
/api/health
```

## 4. Frontend deployment

The frontend is a Vite app. Deploy it to a static host such as Vercel or Netlify, or continue with Railway if preferred.

Set:

```text
VITE_API_URL=https://<your-api-domain>
```

## 5. Security checklist

- Use strong JWT secret and production Stripe keys
- Restrict CORS to the real frontend domain
- Use secret manager or Railway variables, never commit .env files
- Enable audit retention and access logging
- Keep cluster credentials out of Git

## 6. Production launch

Once deployed, verify:
- `/api/health` returns HTTP 200
- `/api/promotions` responds without auth
- `/api/me` requires valid JWT
- Stripe webhook endpoint accepts events
- frontend loads and talks to the API correctly

This is the production baseline for a live SaaS deployment of PolyScale.

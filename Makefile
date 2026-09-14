.PHONY: install-backend install-frontend run-backend run-frontend install test security-test load-test deploy-all clean

install-backend:
	cd backend && npm install

install-frontend:
	cd frontend && npm install

run-backend:
	cd backend && npm start

run-frontend:
	cd frontend && npm run dev -- --host 0.0.0.0

security-test:
	chmod +x tests/security/*.sh && ./tests/security/test-rbac.sh && ./tests/security/test-mtls.sh && ./tests/security/test-network.sh && ./tests/security/test-rate-limit.sh

load-test:
	chmod +x tests/locust/run_load_test.sh && ./tests/locust/run_load_test.sh

report:
	chmod +x scripts/generate_report.sh && ./scripts/generate_report.sh

deploy-all: install-backend install-frontend
	@echo "Backend + frontend ready for deployment"

clean:
	rm -rf frontend/dist frontend/node_modules backend/node_modules backend/database.db

install: install-backend install-frontend

test: security-test

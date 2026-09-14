.PHONY: install-backend install-frontend run-backend run-frontend test

install-backend:
	cd backend && npm install

install-frontend:
	cd frontend && npm install

run-backend:
	cd backend && npm start

run-frontend:
	cd frontend && npm run dev -- --host 0.0.0.0

test:
	python3 tests/analyze_results.py

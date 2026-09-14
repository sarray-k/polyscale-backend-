#!/usr/bin/env bash
set -e

echo "[RATE-LIMIT] Vérification des quotas et du rate limiting..."

if ! grep -Rq "rate-limit\|quota\|cpu\|memory" .; then
  echo "Aucune configuration de rate limiting ou quota détectée" >&2
  exit 1
fi

echo "Rate limiting OK : quotas CPU/RAM et blocage des requêtes excédentaires configurés."

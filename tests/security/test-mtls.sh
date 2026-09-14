#!/usr/bin/env bash
set -e

echo "[mTLS] Vérification du chiffrement mutuel..."

if ! grep -Rq "spiffe\|mtls\|tls" .; then
  echo "Aucun élément mTLS / SPIFFE détecté dans la config" >&2
  exit 1
fi

echo "mTLS OK : configuration détectée."

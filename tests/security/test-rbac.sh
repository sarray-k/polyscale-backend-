#!/usr/bin/env bash
set -e

echo "[RBAC] Vérification des permissions..."

if ! grep -Rq "ClusterRole\|RoleBinding\|ClusterRoleBinding" argocd/argocd-rbac.yaml; then
  echo "RBAC absent ou incomplet" >&2
  exit 1
fi

if grep -R "password\|secret\|token" backend/server.js >/dev/null 2>&1; then
  echo "Erreur : secrets codés en dur détectés" >&2
  exit 1
fi

echo "RBAC OK : règles et non-exposition des secrets vérifiés."

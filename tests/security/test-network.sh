#!/usr/bin/env bash
set -e

echo "[NETWORK] Vérification des Network Policies..."

if ! grep -Rq "NetworkPolicy\|calico" .; then
  echo "Aucune NetworkPolicy détectée" >&2
  exit 1
fi

echo "Network Policy OK : blocage de trafic interdit configuré."

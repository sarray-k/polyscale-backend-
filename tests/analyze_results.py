#!/usr/bin/env python3
import csv
import os
import sys


path = 'tests/results/locust-results_stats.csv'

if not os.path.exists(path):
    print(f'CSV introuvable : {path}')
    print('Exécute d’abord le script de charge Locust.')
    sys.exit(1)

with open(path, newline='') as f:
    rows = list(csv.DictReader(f))

if not rows:
    print('Aucune donnée collectée.')
    sys.exit(1)

latency = float(rows[0].get('50%') or 0)
errors = float(rows[0].get('Error %') or 0)

print(f'Latence 50e percentile : {latency} ms')
print(f'Taux d’erreur : {errors}%')

if latency > 200:
    print('ALERTE : la latence dépasse 200 ms')
    sys.exit(1)

if errors > 0.5:
    print('ALERTE : le taux d’erreur dépasse 0.5%')
    sys.exit(1)

print('Validation OK : latence < 200 ms et erreur < 0.5%')

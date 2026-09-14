#!/usr/bin/env bash
set -e

locust -f tests/locust/load_test.py --host http://localhost:3000 --headless -u 10 -r 2 -t 30s

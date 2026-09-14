#!/usr/bin/env bash
set -e

LOCUST_USERS=${LOCUST_USERS:-5000}
HATCH_RATE=${HATCH_RATE:-100}
DURATION=${DURATION:-300}

locust -f tests/locust/load_test.py \
  --host http://localhost:3000 \
  --headless \
  -u "$LOCUST_USERS" \
  -r "$HATCH_RATE" \
  -t "${DURATION}s" \
  --csv=tests/results/locust-results

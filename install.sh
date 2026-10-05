#!/usr/bin/env bash
# Install frontend (npm) and backend (Maven) dependencies for KAT-Project.
# System tools (Java, Node, Postgres) must already be on your PATH.
# See dependencies.txt for the full list.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing '$1'. Install it first — see dependencies.txt"
    exit 1
  fi
}

need java
need node
need npm

echo "==> Frontend: npm install (frontend/app)"
(cd "$ROOT/frontend/app" && npm install)

echo "==> Backend: Maven dependencies (demo)"
(cd "$ROOT/demo" && ./mvnw -q dependency:resolve)

if command -v psql >/dev/null 2>&1; then
  if psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='katproj'" 2>/dev/null | grep -q 1; then
    echo "==> Postgres database 'katproj' already exists"
  else
    echo "==> Creating Postgres database 'katproj'"
    createdb -U postgres katproj
  fi
else
  echo "==> psql not found; skipped database check. Install postgresql@15 if you have not."
fi

echo
echo "Done. Start the app in two terminals:"
echo "  cd \"$ROOT/demo\" && ./mvnw spring-boot:run"
echo "  cd \"$ROOT/frontend/app\" && npm start"
echo
echo "Site: http://localhost:3000"
echo "API:  http://localhost:8080"

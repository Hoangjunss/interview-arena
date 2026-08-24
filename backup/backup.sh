#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/rotate.sh"

BACKUP_DIR="${BACKUP_DIR:-/backups}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
BACKUP_INTERVAL_SECONDS="${BACKUP_INTERVAL_SECONDS:-86400}"

run_backup() {
  timestamp=$(date -u +%Y%m%dT%H%M%SZ)
  dump_file="$BACKUP_DIR/interview_arena-$timestamp.dump"

  echo "[backup] starting dump to $dump_file"
  PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_NAME" -Fc -f "$dump_file"
  echo "[backup] dump complete: $(du -h "$dump_file" | cut -f1)"

  rotate_backups "$BACKUP_DIR" "$BACKUP_RETENTION_DAYS" 'interview_arena-*.dump'
}

run_backup

if [ "${BACKUP_RUN_ONCE:-false}" = "true" ]; then
  exit 0
fi

while true; do
  sleep "$BACKUP_INTERVAL_SECONDS"
  run_backup
done

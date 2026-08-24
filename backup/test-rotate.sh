#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/rotate.sh"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

touch "$TMP_DIR/interview_arena-new.dump"
touch -d '10 days ago' "$TMP_DIR/interview_arena-old.dump"

rotate_backups "$TMP_DIR" 7 'interview_arena-*.dump'

if [ -f "$TMP_DIR/interview_arena-old.dump" ]; then
  echo "FAIL: old backup (10 days) was not deleted by 7-day retention"
  exit 1
fi

if [ ! -f "$TMP_DIR/interview_arena-new.dump" ]; then
  echo "FAIL: new backup was incorrectly deleted"
  exit 1
fi

echo "PASS: rotate_backups deleted the old backup and kept the new one"

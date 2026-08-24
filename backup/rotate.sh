#!/bin/sh
# rotate_backups <dir> <retention_days> <name_pattern>
# Deletes files in <dir> matching <name_pattern> whose mtime is older
# than <retention_days> days. Non-recursive.
set -eu

rotate_backups() {
  dir="$1"
  retention_days="$2"
  pattern="$3"

  find "$dir" -maxdepth 1 -name "$pattern" -mtime "+$retention_days" -print -delete
}

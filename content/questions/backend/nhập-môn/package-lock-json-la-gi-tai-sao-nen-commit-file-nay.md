---
id: package-lock-json-la-gi-tai-sao-nen-commit-file-nay
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
package-lock.json là gì? Tại sao nên commit file này?

## Question (EN)
What is package-lock.json? Why should you commit this file?

## Đáp án chi tiết (VI)
package-lock.json lưu exact versions + integrity hashes (sha512) của tất cả packages kể cả transitive dependencies — đảm bảo install reproducible trên mọi máy/CI. `npm install` cập nhật lock file nếu package.json thay đổi; `npm ci` (clean install) xóa node_modules rồi install chính xác từ lock file, không bao giờ update lock — dùng trong CI/CD để đảm bảo deterministic builds. Khi nào xóa và regenerate: khi lock file bị corrupt, sau major Node.js upgrade, hoặc khi muốn update tất cả dependencies lên latest compatible. Integrity field: `'integrity': 'sha512-abc...'` — npm verify hash sau download, phát hiện supply chain attacks (tampered packages). Tương đương: `yarn.lock` (Yarn), `pnpm-lock.yaml` (pnpm) — cùng mục đích nhưng format khác nhau. Quan trọng: KHÔNG commit lock file của library packages lên npm registry (chỉ commit lock của applications).

## Detailed Answer (EN)
package-lock.json stores the exact versions and integrity hashes (sha512) of all packages, including transitive dependencies — ensuring reproducible installs across all machines and CI. `npm install` updates the lock file when package.json changes; `npm ci` (clean install) deletes node_modules and installs exactly from the lock file, never updating it — use this in CI/CD for deterministic builds. When to delete and regenerate: when the lock file is corrupted, after a major Node.js upgrade, or when you want to update all dependencies to the latest compatible versions. Integrity field: `'integrity': 'sha512-abc...'` — npm verifies the hash after downloading, detecting supply chain attacks (tampered packages). Equivalents: `yarn.lock` (Yarn), `pnpm-lock.yaml` (pnpm) — same purpose, different format. Important: do NOT commit the lock file of library packages to the npm registry (only commit lock files for applications).

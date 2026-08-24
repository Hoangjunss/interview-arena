---
id: package-json-la-gi-cac-truong-quan-trong-trong-package-json
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
package.json là gì? Các trường quan trọng trong package.json?

## Question (EN)
What is package.json? What are its important fields?

## Đáp án chi tiết (VI)
package.json manifest chứa scripts (lifecycle hooks), dependencies/devDependencies, engines (Node version), exports (conditional entry points), và workspaces (monorepo). package.json là manifest file của Node.js project. `scripts` hỗ trợ lifecycle hooks: `preinstall`/`postinstall` chạy trước/sau npm install, `prebuild`/`postbuild` bao quanh `build` — dùng để codegen, copy assets. `engines: { node: '\u003e=18.0.0' }` báo CI/CD và người dùng version Node cần thiết, npm cảnh báo nếu không match. Entry points: `main` (CJS fallback), `module` (ESM cho bundlers hỗ trợ), `exports` (field mới nhất — conditional exports theo environment): `{ '.': { import: './dist/index.mjs', require: './dist/index.cjs' } }`. `type: 'module'` đặt default module system là ESM cho tất cả `.js` files. `workspaces: ['packages/*']` cho monorepo — npm install một lần, symlink packages. `peerDependencies` khai báo packages host app phải cung cấp (tránh duplicate React trong component libraries).

## Detailed Answer (EN)
package.json manifest holds scripts (lifecycle hooks), dependencies/devDependencies, engines (Node version), exports (conditional entry points), and workspaces (monorepo). package.json is the manifest file for a Node.js project. `scripts` supports lifecycle hooks: `preinstall`/`postinstall` run before/after npm install, `prebuild`/`postbuild` wrap `build` — used for codegen and copying assets. `engines: { node: '\u003e=18.0.0' }` tells CI/CD and users which Node version is required; npm warns if it doesn't match. Entry points: `main` (CJS fallback), `module` (ESM for supporting bundlers), `exports` (the newest field — conditional exports by environment): `{ '.': { import: './dist/index.mjs', require: './dist/index.cjs' } }`. `type: 'module'` sets the default module system to ESM for all `.js` files. `workspaces: ['packages/*']` for monorepos — single npm install, symlinked packages. `peerDependencies` declares packages the host app must provide (avoids duplicate React instances in component libraries).

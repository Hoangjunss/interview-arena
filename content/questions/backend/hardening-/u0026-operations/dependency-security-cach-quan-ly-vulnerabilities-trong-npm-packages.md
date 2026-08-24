---
id: dependency-security-cach-quan-ly-vulnerabilities-trong-npm-packages
position: backend
technology: hardening-\u0026-operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency security: cách quản lý vulnerabilities trong npm packages?

## Question (EN)
Dependency security: how do you manage vulnerabilities in npm packages?

## Đáp án chi tiết (VI)
Bảo mật dependency = quản lý rủi ro supply chain — dependencies là attack vector phổ biến (log4shell, event-stream, vụ hijack ua-parser-js).\
\
- **npm audit** — scan CVE đã biết; `npm audit fix` vá patch version (`--force` cho major — coi chừng breaking change); critical/high fix ngay, moderate/low đánh giá trước.\
- **Auto-update PR** — Dependabot (built-in GitHub, config `.github/dependabot.yml`) hoặc Renovate (mạnh hơn: group update, auto-merge khi CI pass, hỗ trợ monorepo).\
- **Ngoài CVE** — Socket.dev phân tích hành vi package: phát hiện typosquatting, code đáng ngờ; Snyk scan sâu hơn kèm license/container/IaC.\
- **Nguyên tắc** — commit lockfile (reproducible install); review package trước khi cài (lượt download, GitHub activity, lần publish gần nhất); ưu tiên package ít dependency (attack surface nhỏ hơn).\
- **Enterprise** — SBOM (danh sách toàn bộ dependency + version) cho compliance; npm publish kèm provenance verify package được build từ đúng CI run cụ thể.

## Detailed Answer (EN)
$88

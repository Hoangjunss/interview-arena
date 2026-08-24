---
id: co-nhung-cach-nao-de-tich-hop-cac-micro-frontend-lai-voi-nhau
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những cách nào để tích hợp các micro-frontend lại với nhau?

## Question (EN)
What are the ways to integrate micro-frontends together?

## Đáp án chi tiết (VI)
Chia làm hai nhóm. **Build-time**: mỗi micro-frontend publish thành package, app container cài vào như thư viện — đơn giản nhưng container phải rebuild và redeploy mỗi khi một mảnh thay đổi, nên mất tính độc lập. **Run-time** (được ưa dùng hơn): container nạp các mảnh lúc chạy, gồm iframe (tách biệt rất mạnh nhưng routing/communication/UX khó), Web Components, nạp JavaScript qua module loading (Module Federation là cách phổ biến nhất hiện nay), và tích hợp ở server (Server-Side Includes / Edge-Side Includes). Lưu ý: build-time integration phá vỡ chính lợi ích cốt lõi của micro-frontend (deploy độc lập), nên đa số dự án thực tế chọn run-time integration.

## Detailed Answer (EN)
There are two groups. **Build-time**: each micro-frontend is published as a package and the container app installs it like a library — simple, but the container must rebuild and redeploy whenever a piece changes, so it loses independence. **Run-time** (preferred): the container loads the pieces while running — via iframes (very strong isolation but hard routing/communication/UX), Web Components, loading JavaScript through module loading (Module Federation is the most common today), and server-side composition (Server-Side Includes / Edge-Side Includes). Note: build-time integration breaks the core benefit of micro-frontends (independent deployment), so most real projects choose run-time integration.

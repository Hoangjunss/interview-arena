---
id: micro-frontend-la-gi
position: backend
technology: micro-frontend
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Micro-frontend là gì?

## Question (EN)
What is a micro-frontend?

## Đáp án chi tiết (VI)
Micro-frontend là kiến trúc chia giao diện thành nhiều ứng dụng frontend độc lập, mỗi ứng dụng do một team sở hữu trọn vẹn (từ code tới deploy), rồi tích hợp lại thành một sản phẩm. Nó áp ý tưởng microservices lên phía frontend. Ví dụ: Zalando xây dựng Project Mosaic (2015) — chia trang thành các fragment như Header, Product, Search, mỗi fragment do một team sở hữu và deploy độc lập mà không cần phối hợp release với các team khác. Việc tích hợp có thể ở build-time (publish package) hoặc run-time (nạp lúc chạy). Lưu ý: đừng nhầm việc tách component với micro-frontend — điểm cốt lõi là độc lập về team và về deploy, không chỉ là chia nhỏ code trong một codebase.

## Detailed Answer (EN)
A micro-frontend is an architecture that splits the UI into several independent frontend apps, each owned end-to-end (code to deploy) by one team, then integrated into a single product. It applies the microservices idea to the frontend. Example: Zalando built Project Mosaic (2015) — splitting pages into fragments like Header, Product, and Search, each owned and deployed independently by a dedicated team without coordinating releases with others. Integration can happen at build-time (publishing a package) or run-time (loaded while running). Note: don't confuse splitting into components with micro-frontends — the core is independence of teams and of deployment, not merely breaking code into smaller pieces in one codebase.

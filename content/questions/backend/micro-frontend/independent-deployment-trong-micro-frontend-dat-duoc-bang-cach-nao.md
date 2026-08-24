---
id: independent-deployment-trong-micro-frontend-dat-duoc-bang-cach-nao
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Independent deployment trong micro-frontend đạt được bằng cách nào?

## Question (EN)
How is independent deployment achieved in micro-frontends?

## Đáp án chi tiết (VI)
Deploy độc lập là lợi ích cốt lõi của micro-frontend: mỗi team release mảnh của mình mà không cần đồng bộ với cả app. Cách đạt được là run-time integration — remote publish artifact (ví dụ `remoteEntry.js`) lên một URL ổn định, host nạp bản mới nhất lúc chạy, nên team chỉ cần deploy artifact mới là thay đổi xuất hiện ngay, không phải rebuild host. Versioning: hoặc dùng URL gắn version, hoặc trỏ \\"latest\\" kèm một contract ổn định giữa host và remote. Lưu ý: build-time integration (publish thành npm package, host cài rồi build chung) buộc host phải rebuild và redeploy mỗi lần một mảnh đổi — tức là đánh mất chính tính độc lập deploy mà micro-frontend hướng tới.

## Detailed Answer (EN)
Independent deployment is the core benefit of micro-frontends: each team releases its piece without synchronizing with the whole app. It is achieved via run-time integration — a remote publishes an artifact (e.g., `remoteEntry.js`) to a stable URL, and the host loads the latest version at runtime, so a team just deploys the new artifact and the change appears immediately, no host rebuild required. Versioning: either version-tagged URLs, or point at \\"latest\\" with a stable contract between host and remote. Note: build-time integration (publishing an npm package that the host installs and builds together) forces the host to rebuild and redeploy whenever a piece changes — losing exactly the independent deployment micro-frontends aim for.

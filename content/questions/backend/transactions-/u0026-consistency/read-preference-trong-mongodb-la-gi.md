---
id: read-preference-trong-mongodb-la-gi
position: backend
technology: transactions-\u0026-consistency
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Read preference trong MongoDB là gì?

## Question (EN)
What is read preference in MongoDB?

## Đáp án chi tiết (VI)
Read preference quyết định node nào trong replica set sẽ phục vụ lệnh **đọc** của client.\
\
Các lựa chọn hay gặp:\
- **`primary`** (mặc định): mọi lệnh đọc vào Primary → luôn thấy dữ liệu mới nhất (strong consistency).\
- **`secondaryPreferred`**: ưu tiên đọc ở Secondary để giảm tải Primary; hợp cho báo cáo/dashboard chấp nhận dữ liệu trễ chút (eventual consistency).\
- **`nearest`**: đọc ở node có độ trễ mạng thấp nhất.

## Detailed Answer (EN)
Read preference decides which node in the replica set serves the client's **read** queries.\
\
Common options:\
- **`primary`** (default): all reads go to the Primary → always the latest data (strong consistency).\
- **`secondaryPreferred`**: prefers Secondaries to offload the Primary; good for reporting/dashboards that tolerate slightly stale data (eventual consistency).\
- **`nearest`**: reads from the node with the lowest network latency.

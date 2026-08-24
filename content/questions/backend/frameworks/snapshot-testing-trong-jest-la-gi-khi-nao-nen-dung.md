---
id: snapshot-testing-trong-jest-la-gi-khi-nao-nen-dung
position: backend
technology: frameworks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Snapshot testing trong Jest là gì? Khi nào nên dùng?

## Question (EN)
What is snapshot testing in Jest? When should it be used?

## Đáp án chi tiết (VI)
Snapshot testing serialize output (component render, JSON object, string) vào file `.snap` — lần chạy sau so sánh với snapshot đã lưu, fail nếu có thay đổi.\
\
- **Update** — khi thay đổi là có chủ đích: `jest -u` (`--updateSnapshot`) cập nhật tất cả; kết hợp `--testNamePattern` để giới hạn.\
- **Inline snapshot** — `toMatchInlineSnapshot()` lưu ngay trong test file thay vì file `.snap` riêng — dễ review trong PR nhưng làm file test dài.\
- **Nên dùng** — UI component ổn định ít thay đổi (Button, Card, Input), cấu trúc dữ liệu serializable, shape của API response.\
- **Không nên** — component thay đổi thường xuyên (update snapshot mỗi PR không còn ý nghĩa), nội dung động (timestamp, random ID — phải mock), business logic phức tạp (assertion tường minh tốt hơn).\
- **Rủi ro** — dev chạy update mà không review diff → snapshot test thành 'rubber stamp'. Nên kết hợp snapshot với assertion tường minh cho thuộc tính quan trọng.\
- **Custom serializer** — `jest.addSnapshotSerializer()` format output cho object tùy biến.

## Detailed Answer (EN)
$86

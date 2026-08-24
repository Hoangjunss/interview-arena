---
id: tao-resource-xong-tra-status-nao-200-201-202-hay-204-khi-nao-can-header-location
position: backend
technology: status-codes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tạo resource xong trả status nào: 200, 201, 202 hay 204? Khi nào cần header Location?

## Question (EN)
After creating a resource, which status do you return: 200, 201, 202, or 204? When do you need a Location header?

## Đáp án chi tiết (VI)
Chọn theo **việc đã làm xong chưa** và **có body trả về không**:\
\
- **201 Created** — đã tạo xong resource mới. Kèm header `Location` trỏ tới URL của resource vừa tạo, body thường là chính resource đó.\
- **200 OK** — xử lý xong và có body ý nghĩa để trả (vd `POST /search`, hoặc `POST /orders/1/cancel` trả về order sau khi huỷ).\
- **202 Accepted** — server **đã nhận yêu cầu nhưng chưa xử lý xong**. Dùng cho job chạy nền; body/`Location` nên trỏ tới tài nguyên theo dõi tiến độ.\
- **204 No Content** — thành công và **cố ý không có body**. Hợp với `DELETE` hoặc `PUT` khi client không cần dữ liệu trả về.\
\
```http\
POST /orders\
\
HTTP/1.1 201 Created\
Location: /orders/8f21\
Content-Type: application/json\
{ \\"id\\": \\"8f21\\

## Detailed Answer (EN)
$87

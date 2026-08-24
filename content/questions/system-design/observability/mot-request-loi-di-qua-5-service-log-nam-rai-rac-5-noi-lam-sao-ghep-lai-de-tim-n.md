---
id: mot-request-loi-di-qua-5-service-log-nam-rai-rac-5-noi-lam-sao-ghep-lai-de-tim-n
position: system-design
technology: observability
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một request lỗi đi qua 5 service, log nằm rải rác 5 nơi — làm sao ghép lại để tìm nguyên nhân?

## Question (EN)
A failing request crosses 5 services and logs are scattered — how do you piece it together?

## Đáp án chi tiết (VI)
Hai thứ bắt buộc: **correlation id** và **log tập trung**.\
\
**Correlation id (request id):** sinh một id duy nhất ở cửa ngõ (gateway hoặc service đầu tiên), gắn vào header, **truyền tiếp** qua mọi lời gọi xuống dưới và ghi vào mọi dòng log.\
\
```http\
X-Request-Id: 7c1f4c2a-9d3e-4a11-8a02-4f0d2b6b1e77\
```\
\
Để không phải nhớ truyền tay ở từng chỗ, lưu id trong context của request (middleware nhận vào, HTTP client tự đính khi gọi ra).\
\
**Log tập trung (log aggregation):** mọi instance đẩy log về một nơi (ELK, Loki, CloudWatch). Khi đó tìm sự cố chỉ còn một truy vấn duy nhất theo `request_id`, thấy toàn bộ hành trình.\
\
**Ghi log dạng cấu trúc (JSON), không phải chuỗi tự do** — để lọc được theo trường:\
\
```json\
{\\"ts\\":\\"2026-08-06T09:12:03Z\\

## Detailed Answer (EN)
$87

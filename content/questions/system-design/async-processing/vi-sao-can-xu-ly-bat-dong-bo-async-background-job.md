---
id: vi-sao-can-xu-ly-bat-dong-bo-async-background-job
position: system-design
technology: async-processing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cần xử lý bất đồng bộ (async / background job)?

## Question (EN)
Why do systems need asynchronous / background processing?

## Đáp án chi tiết (VI)
Ý tưởng: **không bắt user chờ** những việc nặng hoặc không cần kết quả ngay. Request nhanh chỉ **ghi một job vào queue** rồi trả về liền; worker xử lý ở nền.\
\
Hợp để async:\
- Gửi email/SMS/push, tạo thumbnail, transcode video, xuất báo cáo, xử lý ảnh/ML.\
- Việc gọi dịch vụ ngoài **chậm/không ổn định** (thanh toán, bên thứ ba).\
- Tác vụ định kỳ/hàng loạt.\
\
Lợi ích:\
- **Latency thấp** cho request người dùng; **chịu tải đột biến** (queue làm buffer).\
- **Retry** khi lỗi mà không chặn user.\
\
Đổi lại: kết quả có độ trễ (eventual), cần cơ chế theo dõi trạng thái job, **idempotency** và xử lý job lỗi (dead-letter queue).

## Detailed Answer (EN)
The idea: **do not make the user wait** for heavy work or work whose result is not needed immediately. The fast request just **enqueues a job** and returns; a worker processes it in the background.\
\
Good candidates for async:\
- Sending email/SMS/push, generating thumbnails, transcoding video, exporting reports, image/ML processing.\
- Calling **slow/unreliable** external services (payments, third parties).\
- Periodic/batch tasks.\
\
Benefits:\
- **Low latency** for user requests; **absorbs spikes** (the queue buffers).\
- **Retries** on failure without blocking the user.\
\
Costs: results are delayed (eventual), you need job-status tracking, **idempotency**, and handling failed jobs (a dead-letter queue).

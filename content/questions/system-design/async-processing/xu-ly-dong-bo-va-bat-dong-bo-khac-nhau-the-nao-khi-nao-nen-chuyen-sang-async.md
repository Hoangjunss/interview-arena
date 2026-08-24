---
id: xu-ly-dong-bo-va-bat-dong-bo-khac-nhau-the-nao-khi-nao-nen-chuyen-sang-async
position: system-design
technology: async-processing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý đồng bộ và bất đồng bộ khác nhau thế nào? Khi nào nên chuyển sang async?

## Question (EN)
Synchronous vs asynchronous processing — what is the difference and when should you go async?

## Đáp án chi tiết (VI)
- **Đồng bộ (synchronous)**: client gửi request và **chờ tới khi xong**, nhận kết quả ngay trong response. Đơn giản, dễ suy luận, nhưng **giữ tài nguyên** (connection, thread) suốt thời gian xử lý và độ trễ = thời gian tác vụ.\
- **Bất đồng bộ (asynchronous)**: server **nhận request rồi trả lời ngay** (thường `202 Accepted` kèm nơi tra trạng thái), việc nặng được đẩy vào **hàng đợi/worker** xử lý nền; client **poll** hoặc nhận **callback/webhook** khi có kết quả.\
\
Chuyển sang async khi:\
- Tác vụ **chậm/nặng** không cần kết quả tức thì: gửi email, xử lý ảnh/video, tạo báo cáo, gọi API bên thứ ba chậm.\
- Cần **làm phẳng traffic đột biến** (queue hấp thụ spike) và **tách rời** các thành phần để scale độc lập.\
\
Đánh đổi: async **phức tạp hơn** — phải theo dõi trạng thái công việc, xử lý retry/thất bại, và đảm bảo **idempotent** vì message có thể bị xử lý lại. Đừng async hóa mọi thứ: tác vụ nhanh, cần kết quả ngay thì đồng bộ vẫn đúng và gọn hơn.

## Detailed Answer (EN)
$89

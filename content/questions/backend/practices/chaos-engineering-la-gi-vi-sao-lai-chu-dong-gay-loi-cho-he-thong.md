---
id: chaos-engineering-la-gi-vi-sao-lai-chu-dong-gay-loi-cho-he-thong
position: backend
technology: practices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chaos engineering là gì? Vì sao lại chủ động gây lỗi cho hệ thống?

## Question (EN)
What is chaos engineering, and why deliberately inject failures into a system?

## Đáp án chi tiết (VI)
Chaos engineering là **kỷ luật chủ động tiêm lỗi vào hệ thống** (kể cả trong production, có kiểm soát) để **kiểm chứng khả năng chịu đựng sự cố** — xây niềm tin **trước khi** lỗi thật xảy ra vào lúc bất tiện nhất.\
\
Lý do: hệ phân tán có vô số cách hỏng (một service chết, mạng chậm, dependency timeout) mà test thông thường không phủ hết. Thay vì chờ sự cố tự đến, ta **gây lỗi có chủ đích** để phát hiện điểm yếu ẩn (retry sai, thiếu timeout, thiếu fallback).\
\
Quy trình theo Principles of Chaos:\
1. Xác định **steady state** — chỉ số cho biết hệ thống đang bình thường.\
2. Đưa **giả thuyết** steady state vẫn giữ khi có lỗi.\
3. **Tiêm lỗi** phản ánh sự cố thực (tắt instance, thêm latency, ngắt mạng).\
4. **So sánh** thực tế với giả thuyết; điểm khác biệt là lỗ hổng cần vá.\
\
Nguyên tắc an toàn: **thu hẹp bán kính ảnh hưởng (blast radius)**, có nút dừng. Mục tiêu không phải gây gián đoạn vô ích mà **học về hệ thống một cách có kiểm soát**. Netflix Chaos Monkey là ví dụ kinh điển.

## Detailed Answer (EN)
$87

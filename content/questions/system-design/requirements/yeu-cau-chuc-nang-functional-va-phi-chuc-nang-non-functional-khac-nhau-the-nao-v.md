---
id: yeu-cau-chuc-nang-functional-va-phi-chuc-nang-non-functional-khac-nhau-the-nao-v
position: system-design
technology: requirements
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Yêu cầu chức năng (functional) và phi chức năng (non-functional) khác nhau thế nào? Vì sao phải tách rõ?

## Question (EN)
What is the difference between functional and non-functional requirements? Why separate them explicitly?

## Đáp án chi tiết (VI)
**Yêu cầu chức năng** trả lời \\"hệ thống làm được gì\\": người dùng đăng bài, theo dõi người khác, xem bảng tin. Chúng thành các endpoint và bảng dữ liệu.\
\
**Yêu cầu phi chức năng** trả lời \\"hệ thống phải chạy tốt tới mức nào\\": độ trễ mục tiêu, mức sẵn sàng, quy mô người dùng, tỷ lệ đọc/ghi, mức nhất quán chấp nhận được, chi phí, yêu cầu lưu trữ dữ liệu theo luật.\
\
Phải tách rõ vì **chính nhóm phi chức năng mới quyết định kiến trúc**. Hai hệ thống có cùng danh sách tính năng nhưng khác chỉ tiêu phi chức năng sẽ ra hai thiết kế khác hẳn:\
\
- 10k người dùng nội bộ, chấp nhận downtime đêm → một service, một database, không cần cache.\
- 50 triệu người dùng, p99 dưới 200 ms, 99.99% sẵn sàng → cần CDN, cache nhiều tầng, replica đa vùng, hàng đợi bất đồng bộ.\
\
Mẹo trả lời: sau khi liệt kê 3-4 tính năng cốt lõi, hỏi thẳng người phỏng vấn về nhóm phi chức năng — \\"quy mô cỡ bao nhiêu DAU\\

## Detailed Answer (EN)
**Functional requirements** answer \\"what can the system do\\": users post, follow others, read a feed. They become endpoints and tables.\
\
**Non-functional requirements** answer \\"how well must it run\\": target latency, availability, user scale, read/write ratio, acceptable consistency, cost, legal data-retention rules.\
\
Separating them matters because **the non-functional set is what actually drives the architecture**. Two systems with the same feature list but different non-functional targets end up with very different designs:\
\
- 10k internal users, night downtime acceptable → one service, one database, no cache needed.\
- 50M users, p99 under 200 ms, 99.99% availability → CDN, multi-layer caching, multi-region replicas, async queues.\
\
Practical tip: after listing 3-4 core features, ask the interviewer directly about the non-functional side — \\"roughly how many DAU\\

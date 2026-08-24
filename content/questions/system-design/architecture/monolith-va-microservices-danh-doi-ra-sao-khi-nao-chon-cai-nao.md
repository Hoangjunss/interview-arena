---
id: monolith-va-microservices-danh-doi-ra-sao-khi-nao-chon-cai-nao
position: system-design
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Monolith và microservices: đánh đổi ra sao, khi nào chọn cái nào?

## Question (EN)
Monolith vs microservices — what are the trade-offs and when to pick each?

## Đáp án chi tiết (VI)
- **Monolith**: toàn bộ ứng dụng trong **một codebase/deploy**. Ưu: đơn giản, dễ dev/test/deploy lúc đầu, gọi hàm trong tiến trình rất nhanh, không có độ phức tạp phân tán. Nhược: khi lớn thì build/deploy chậm, coupling tăng, khó scale **từng phần**.\
- **Microservices**: chia thành nhiều dịch vụ nhỏ, **deploy độc lập**, mỗi dịch vụ sở hữu dữ liệu riêng. Ưu: scale và deploy độc lập, đội nhóm tự chủ, cô lập lỗi tốt hơn. Nhược: **độ phức tạp phân tán** (mạng, nhất quán, quan sát), chi phí vận hành cao, test end-to-end khó.\
\
Lời khuyên thực tế (**monolith-first**): bắt đầu bằng monolith được module hóa tốt; **tách microservice khi** đội nhóm/domain đã đủ lớn và ranh giới rõ. Tách sớm dễ trả giá cho phức tạp không cần thiết.

## Detailed Answer (EN)
- **Monolith**: the whole app in **one codebase/deploy**. Pros: simple, easy to develop/test/deploy early, in-process calls are very fast, no distributed complexity. Cons: at scale, builds/deploys slow down, coupling grows, and it is hard to scale **parts** independently.\
- **Microservices**: split into small **independently deployable** services, each owning its data. Pros: independent scaling/deploys, team autonomy, better fault isolation. Cons: **distributed complexity** (network, consistency, observability), higher operational cost, hard end-to-end testing.\
\
Practical advice (**monolith-first**): start with a well-modularized monolith; **extract microservices when** teams/domains are large enough and boundaries are clear. Splitting too early buys unnecessary complexity.

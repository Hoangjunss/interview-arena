---
id: blue-green-va-canary-deployment-khac-nhau-the-nao
position: backend
technology: deployment
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Blue-green và canary deployment khác nhau thế nào?

## Question (EN)
Blue-green vs canary deployment — what is the difference?

## Đáp án chi tiết (VI)
Cả hai giảm rủi ro khi release và tránh downtime:\
\
- **Blue-green**: chạy **hai môi trường song song** — \\"blue\\" (đang live) và \\"green\\" (bản mới). Test xong thì **chuyển toàn bộ traffic** sang green một lần; nếu lỗi thì **switch ngược** tức thì. Rollback rất nhanh, nhưng tốn gấp đôi hạ tầng và vẫn đổi 100% người dùng cùng lúc.\
- **Canary**: đưa bản mới ra **một phần nhỏ** người dùng (vd 5%), **theo dõi metric** (tỉ lệ lỗi, latency), rồi tăng dần tới 100%. Phát hiện sự cố sớm trên phạm vi nhỏ, nhưng release lâu hơn và cần giám sát/tự động hóa tốt.\
\
Liên quan: **rolling update** (thay dần từng instance) và **feature flag** (bật/tắt tính năng độc lập với deploy). Chọn theo mức chịu rủi ro và khả năng quan sát của hệ thống.

## Detailed Answer (EN)
Both reduce release risk and avoid downtime:\
\
- **Blue-green**: run **two parallel environments** — \\"blue\\" (live) and \\"green\\" (new). After testing, **switch all traffic** to green at once; on failure, **switch back** instantly. Rollback is very fast, but it doubles infrastructure and still flips 100% of users at once.\
- **Canary**: release the new version to a **small fraction** of users (e.g. 5%), **watch metrics** (error rate, latency), then ramp gradually to 100%. Catches problems early on a small blast radius, but releases take longer and need good monitoring/automation.\
\
Related: **rolling update** (replace instances gradually) and **feature flags** (toggle a feature independently of deployment). Choose by your risk tolerance and observability.

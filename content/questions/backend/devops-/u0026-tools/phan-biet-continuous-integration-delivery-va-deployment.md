---
id: phan-biet-continuous-integration-delivery-va-deployment
position: backend
technology: devops-\u0026-tools
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Continuous Integration, Delivery và Deployment?

## Question (EN)
Distinguish Continuous Integration, Delivery and Deployment.

## Đáp án chi tiết (VI)
- **Continuous Integration (CI)**: mỗi lập trình viên **merge thường xuyên** vào nhánh chung; mỗi lần merge tự động **build + test** để phát hiện xung đột/lỗi sớm. Trọng tâm là chất lượng code khi tích hợp.\
- **Continuous Delivery (CD)**: mở rộng CI để mọi bản build đã pass **luôn sẵn sàng release**, nhưng bước **đẩy lên production vẫn cần phê duyệt thủ công** (approval).\
- **Continuous Deployment (CD)**: đi xa hơn — mọi thay đổi qua được test **tự động lên production**, không cần can thiệp tay.\
\
Khác biệt cốt lõi giữa hai \\"CD\\": **Delivery = deploy thủ công có kiểm soát**; **Deployment = deploy hoàn toàn tự động**. CI là nền tảng cho cả hai.

## Detailed Answer (EN)
- **Continuous Integration (CI)**: developers **merge frequently** into a shared branch; each merge auto **builds + tests** to catch conflicts/bugs early. Focus is code quality at integration.\
- **Continuous Delivery (CD)**: extends CI so every passing build is **always release-ready**, but the **push to production is manual** (an approval).\
- **Continuous Deployment (CD)**: goes further — every change that passes tests goes to **production automatically**, no manual step.\
\
Key distinction between the two \\"CD\\"s: **Delivery = controlled manual deploy**; **Deployment = fully automated deploy**. CI underpins both.

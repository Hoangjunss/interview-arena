---
id: bon-muc-test-unit-integration-system-acceptance-khac-nhau-ra-sao
position: backend
technology: loại-\u0026-mức-test
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bốn mức test (unit, integration, system, acceptance) khác nhau ra sao?

## Question (EN)
How do the four test levels (unit, integration, system, acceptance) differ?

## Đáp án chi tiết (VI)
Bốn mức đi từ **nhỏ tới lớn**, mỗi mức có mục tiêu và người thực hiện riêng:\
\
1. **Unit / Component** — test **từng module/hàm riêng lẻ**, thường do dev viết. Nhanh, cô lập, bắt lỗi logic sớm nhất.\
2. **Integration** — test **sự tương tác giữa các thành phần** (module với module, service với DB/API). Bắt lỗi ở *giao diện* giữa các phần.\
3. **System** — test **toàn bộ hệ thống đã tích hợp** trong môi trường gần production, đối chiếu với yêu cầu (cả functional lẫn non-functional).\
4. **Acceptance (UAT)** — **người dùng/khách hàng** xác nhận hệ thống đáp ứng nhu cầu và **sẵn sàng để dùng**. Thiên về validation.\
\
Càng lên cao, phạm vi càng rộng và càng gần góc nhìn người dùng.

## Detailed Answer (EN)
The four levels go from **small to large**, each with its own goal and owner:\
\
1. **Unit / Component** — tests **individual modules/functions** in isolation, usually written by developers. Fast, isolated, catches logic bugs earliest.\
2. **Integration** — tests the **interaction between components** (module to module, service to DB/API). Catches defects at the *interfaces*.\
3. **System** — tests the **whole integrated system** in a near-production environment against the requirements (both functional and non-functional).\
4. **Acceptance (UAT)** — **users/customers** confirm the system meets their needs and is **ready to use**. Leans toward validation.\
\
The higher the level, the broader the scope and the closer to the user perspective.

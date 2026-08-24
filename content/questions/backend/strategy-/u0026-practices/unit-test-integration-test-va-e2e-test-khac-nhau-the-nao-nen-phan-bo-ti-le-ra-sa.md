---
id: unit-test-integration-test-va-e2e-test-khac-nhau-the-nao-nen-phan-bo-ti-le-ra-sa
position: backend
technology: strategy-\u0026-practices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Unit test, integration test và e2e test khác nhau thế nào? Nên phân bổ tỉ lệ ra sao?

## Question (EN)
How do unit, integration, and e2e tests differ, and how should you balance them?

## Đáp án chi tiết (VI)
- **Unit test**: kiểm tra một đơn vị nhỏ (hàm, class) trong cô lập, mock/stub dependency. Chạy trong mili-giây, fail chỉ đúng chỗ hỏng → dễ tìm nguyên nhân, viết nhiều nhất.\
- **Integration test**: kiểm tra nhiều thành phần ghép với nhau — code với DB thật, gọi API service khác, đọc/ghi queue. Chậm hơn vì cần hạ tầng (DB test, container).\
- **E2E test**: chạy cả hệ thống theo góc nhìn người dùng (qua UI hoặc API), toàn bộ stack thật. Đắt nhất, chậm nhất, dễ flaky (fail chập chờn vì timing/network) → chỉ giữ vài luồng quan trọng.\
\
**Phân bổ:** nhiều unit → ít integration → rất ít e2e (nguyên tắc \\"kim tự tháp\\" test). Lý do: test nhanh/rẻ chạy thường xuyên bắt lỗi sớm; e2e chậm và mơ hồ nên chỉ phủ luồng cốt lõi. Quy tắc chung: viết test ở tầng thấp nhất có thể bắt được lỗi đó.

## Detailed Answer (EN)
- **Unit test**: checks one small unit (function, class) in isolation with mocked/stubbed dependencies. Runs in milliseconds; a failure points at the exact spot → easiest to write, so write the most of these.\
- **Integration test**: checks several components working together — real DB, calls to another service, queue reads/writes. Slower, needs infrastructure (test DB, containers).\
- **E2E test**: runs the whole system from the user's viewpoint (via UI or API), the full real stack. Most expensive, slowest, prone to flakiness (timing/network) → keep only a few critical flows.\
\
**Balance:** many unit → fewer integration → very few e2e (the test \\"pyramid\\" idea). Fast, cheap tests run often to catch bugs early; e2e is slow and vague, so it only covers core flows. Rule of thumb: test at the lowest layer that can catch the bug.

---
id: test-micro-frontend-nhu-the-nao
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test micro-frontend như thế nào?

## Question (EN)
How do you test micro-frontends?

## Đáp án chi tiết (VI)
Test theo tầng đúng với tinh thần độc lập: mỗi micro-frontend tự chạy unit và integration test như một app bình thường; phần khó là chỗ tích hợp, nên thêm contract test cho hợp đồng giao tiếp giữa các mảnh (event/props) và một ít end-to-end cho các luồng đi xuyên nhiều mảnh ở shell. Martin Fowler nhấn mạnh: test tích hợp nên tập trung vào contract và cách các mảnh tích hợp với nhau, không nhân bản lại unit test đã có trong từng mảnh. Lưu ý: chỉ test từng mảnh mà bỏ test tích hợp thì lỗi sẽ xuất hiện đúng chỗ các mảnh giao tiếp; ngược lại đừng e2e mọi thứ vì chậm và dễ gãy — cân bằng giữa contract test và e2e tối thiểu.

## Detailed Answer (EN)
Test in layers, consistent with their independence: each micro-frontend runs its own unit and integration tests like a normal app; the hard part is the seams, so add contract tests for the communication agreement between pieces (events/props) and a few end-to-end tests for flows that cross multiple pieces in the shell. Martin Fowler emphasizes that integration testing should focus on the contracts and how pieces fit together, not duplicate the unit tests already inside each piece. Note: testing only individual pieces while skipping integration means bugs surface exactly where pieces communicate; conversely, don't e2e everything (slow and brittle) — balance contract tests with minimal e2e.

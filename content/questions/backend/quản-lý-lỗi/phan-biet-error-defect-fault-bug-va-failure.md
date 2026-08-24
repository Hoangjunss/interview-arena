---
id: phan-biet-error-defect-fault-bug-va-failure
position: backend
technology: quản-lý-lỗi
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Error, Defect (Fault/Bug) và Failure?

## Question (EN)
What is the difference between Error, Defect (Fault/Bug), and Failure?

## Đáp án chi tiết (VI)
Đây là một **chuỗi nhân quả**, không phải từ đồng nghĩa:\
\
- **Error (sai sót)** — hành động sai của con người, ví dụ lập trình viên hiểu nhầm yêu cầu hoặc gõ nhầm.\
- **Defect / Fault / Bug (khiếm khuyết)** — chỗ sai nằm trong code hoặc tài liệu do error tạo ra. Ba từ này là **đồng nghĩa** trong ISTQB.\
- **Failure (hỏng)** — hành vi sai lệch quan sát được **khi defect bị thực thi**, tức hệ thống cho kết quả khác kỳ vọng.\
\
Chuỗi: **Error → Defect → Failure**. Lưu ý một defect chưa chắc gây failure (nếu đoạn code đó không bao giờ chạy tới), và failure còn có thể đến từ điều kiện môi trường chứ không chỉ defect.

## Detailed Answer (EN)
These form a **causal chain**, not synonyms:\
\
- **Error (mistake)** — a human action that produces an incorrect result, e.g. a developer misunderstands a requirement or mistypes.\
- **Defect / Fault / Bug (flaw)** — the flaw in the code or document that the error introduced. These three are **synonyms** in ISTQB.\
- **Failure** — the observable deviation in behavior **when the defect is executed**, i.e. the system produces a result different from what was expected.\
\
The chain is **Error → Defect → Failure**. Note a defect does not always cause a failure (if that code is never reached), and a failure can also stem from environmental conditions, not only a defect.

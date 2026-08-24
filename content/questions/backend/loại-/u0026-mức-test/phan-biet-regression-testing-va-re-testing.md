---
id: phan-biet-regression-testing-va-re-testing
position: backend
technology: loại-\u0026-mức-test
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Regression testing và Re-testing?

## Question (EN)
What is the difference between Regression testing and Re-testing?

## Đáp án chi tiết (VI)
- **Re-testing (confirmation testing)** — **chạy lại đúng test case đã fail** trên build đã sửa, để **xác nhận defect thực sự hết**. Phạm vi hẹp, bám đúng vào chỗ vừa fix.\
- **Regression testing** — chạy lại **các test case của phần vốn đang chạy đúng**, để đảm bảo thay đổi/bản fix **không làm hỏng chức năng cũ**. Phạm vi rộng hơn, thường được **tự động hóa** vì lặp lại nhiều.\
\
Thứ tự thực tế: fix xong → **re-test** để chắc lỗi đã hết → **regression** để chắc không phát sinh lỗi mới ở nơi khác. Một cái xác nhận \\"đã đúng\\

## Detailed Answer (EN)
- **Re-testing (confirmation testing)** — **rerun the exact failed test case** on the fixed build to **confirm the defect is truly gone**. Narrow scope, aimed at the spot just fixed.\
- **Regression testing** — rerun **test cases for already-working areas** to ensure a change/fix **did not break existing functionality**. Broader scope, usually **automated** because it repeats often.\
\
Typical order: after a fix → **re-test** to confirm the defect is gone → **regression** to confirm no new defect appeared elsewhere. One confirms \\"it is now correct\\

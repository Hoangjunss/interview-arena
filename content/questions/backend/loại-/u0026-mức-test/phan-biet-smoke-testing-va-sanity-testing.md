---
id: phan-biet-smoke-testing-va-sanity-testing
position: backend
technology: loại-\u0026-mức-test
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Smoke testing và Sanity testing?

## Question (EN)
What is the difference between Smoke testing and Sanity testing?

## Đáp án chi tiết (VI)
Cả hai đều là **kiểm nhanh trước khi test sâu**, nhưng khác về phạm vi và độ sâu:\
\
- **Smoke testing** — **rộng và nông**. Chạy nhanh qua các chức năng cốt lõi để xác nhận **build đủ ổn định để test tiếp** (app mở được, đăng nhập được, luồng chính không sập). Thường chạy trên **mỗi build mới**.\
- **Sanity testing** — **hẹp và sâu**. Sau một sửa lỗi hoặc thay đổi nhỏ, kiểm **một vùng chức năng cụ thể** hoạt động đúng như mong đợi. Là một **tập con của regression**.\
\
Câu chốt: smoke hỏi *\\"build này có đáng để test không?\\"*, sanity hỏi *\\"chỗ vừa sửa đã đúng chưa?\\"*.

## Detailed Answer (EN)
Both are **quick checks before deeper testing**, but differ in scope and depth:\
\
- **Smoke testing** — **broad and shallow**. A fast pass over core functions to confirm the **build is stable enough to test further** (app launches, login works, main flow does not crash). Usually run on **each new build**.\
- **Sanity testing** — **narrow and deep**. After a bug fix or small change, check that **one specific area** behaves as expected. It is a **subset of regression**.\
\
In short: smoke asks *\\"is this build worth testing?\\"*, sanity asks *\\"is the thing we just changed correct?\\"*.

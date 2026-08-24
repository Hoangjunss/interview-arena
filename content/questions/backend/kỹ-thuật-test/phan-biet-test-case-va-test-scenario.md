---
id: phan-biet-test-case-va-test-scenario
position: backend
technology: kỹ-thuật-test
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Test case và Test scenario?

## Question (EN)
What is the difference between a Test case and a Test scenario?

## Đáp án chi tiết (VI)
Khác nhau ở **mức độ chi tiết**:\
\
- **Test scenario** — mô tả **cấp cao \\"cần test cái gì\\"**: một chức năng hoặc luồng cần kiểm chứng, ví dụ *\\"Kiểm tra chức năng đăng nhập\\"*. Trả lời *what*.\
- **Test case** — **các bước chi tiết \\"test như thế nào\\"**: gồm **điều kiện tiên quyết, dữ liệu test, các bước thực hiện, kết quả mong đợi**. Ví dụ *\\"Nhập đúng email + sai mật khẩu → hiện thông báo lỗi\\"*. Trả lời *how*.\
\
Quan hệ **một–nhiều**: một scenario \\"đăng nhập\\" sinh ra nhiều test case (đúng cả hai, sai mật khẩu, tài khoản khóa, để trống...). Scenario giúp bao quát phạm vi, test case giúp thực thi cụ thể và tái lập được.

## Detailed Answer (EN)
They differ by **level of detail**:\
\
- **Test scenario** — a **high-level \\"what to test\\"**: a feature or flow to verify, e.g. *\\"Verify the login feature\\"*. Answers *what*.\
- **Test case** — the **detailed \\"how to test\\"**: includes **preconditions, test data, steps, and expected result**. E.g. *\\"Enter a valid email + wrong password → an error message is shown\\"*. Answers *how*.\
\
The relationship is **one-to-many**: one \\"login\\" scenario spawns many test cases (both correct, wrong password, locked account, empty fields...). Scenarios ensure coverage; test cases make execution concrete and repeatable.

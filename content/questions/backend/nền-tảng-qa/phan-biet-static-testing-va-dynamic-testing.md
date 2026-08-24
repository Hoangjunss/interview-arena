---
id: phan-biet-static-testing-va-dynamic-testing
position: backend
technology: nền-tảng-qa
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Static testing và Dynamic testing?

## Question (EN)
What is the difference between Static and Dynamic testing?

## Đáp án chi tiết (VI)
- **Static testing** — kiểm tra sản phẩm **không chạy code**. Gồm **review, walkthrough, inspection** (tài liệu, yêu cầu, thiết kế, code) và **static analysis** (linter, phân tích tĩnh). Ưu điểm: bắt lỗi **sớm và rẻ**, ngay từ khâu yêu cầu — trước khi lỗi lọt vào code.\
- **Dynamic testing** — **thực thi phần mềm** với dữ liệu đầu vào rồi so kết quả thực tế với kỳ vọng. Đây là \\"test\\" theo nghĩa thông thường (unit, integration, system...).\
\
Hai loại **bổ sung** nhau: static tìm defect ngay trong work product, dynamic quan sát failure khi hệ thống chạy. Lỗi phát hiện càng sớm bằng static thì chi phí sửa càng thấp.

## Detailed Answer (EN)
- **Static testing** — examines a work product **without running the code**. It covers **reviews, walkthroughs, inspections** (documents, requirements, design, code) and **static analysis** (linters). Advantage: catches defects **early and cheaply**, even at the requirements stage — before they reach the code.\
- **Dynamic testing** — **executes the software** with input data and compares actual results against expected ones. This is \\"testing\\" in the everyday sense (unit, integration, system...).\
\
The two are **complementary**: static finds defects inside the work product, dynamic observes failures while the system runs. The earlier static catches a defect, the cheaper it is to fix.

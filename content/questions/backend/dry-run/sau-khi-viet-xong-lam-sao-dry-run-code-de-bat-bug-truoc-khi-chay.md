---
id: sau-khi-viet-xong-lam-sao-dry-run-code-de-bat-bug-truoc-khi-chay
position: backend
technology: dry-run
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi viết xong, làm sao dry-run code để bắt bug trước khi chạy?

## Question (EN)
How do you dry-run code to catch bugs before running it?

## Đáp án chi tiết (VI)
Dry-run là đọc code như máy tính: chọn một ví dụ nhỏ rồi lần theo từng dòng, ghi giá trị biến ra giấy hoặc comment. Tập trung vào những chỗ hay sai: điều kiện vòng lặp (`\u003c` hay `\u003c=`), cập nhật pointer/index, khởi tạo và reset biến tích lũy, nhánh edge case. Hãy thử ít nhất một case thường và một case biên (rỗng, một phần tử, đáp án ở đầu/cuối). Khi giá trị biến lệch với kỳ vọng, bạn đã tìm thấy bug mà không cần chạy. Trong interview không phải lúc nào cũng có runtime, nên kỹ năng đọc code bằng mắt rất giá trị.

## Detailed Answer (EN)
Dry-running means reading code like the machine: pick a small example and trace each line, writing variable values down. Focus on common mistakes: loop conditions (\u003c vs \u003c=), pointer/index updates, accumulator initialization and reset, and edge-case branches. Test at least one normal case and one boundary (empty, single element, answer at the ends). When a value diverges from expectation, you have found the bug without running it.

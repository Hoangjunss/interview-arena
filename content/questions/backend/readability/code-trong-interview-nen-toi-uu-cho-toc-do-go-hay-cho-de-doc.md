---
id: code-trong-interview-nen-toi-uu-cho-toc-do-go-hay-cho-de-doc
position: backend
technology: readability
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Code trong interview nên tối ưu cho tốc độ gõ hay cho dễ đọc?

## Question (EN)
Should interview code optimize for typing speed or readability?

## Đáp án chi tiết (VI)
Dễ đọc thắng, vì interviewer phải hiểu code của bạn để chấm. Vài quy tắc rẻ tiền mà hiệu quả: đặt tên biến có nghĩa (`left`, `right`, `freq` thay vì `i`, `j`, `m`); tách helper function khi một khối làm việc rõ ràng; tránh one-liner rối; xử lý edge case ở đầu cho gọn. Không cần micro-optimize từng dòng nếu nó làm code khó hiểu. Một lời giải O(n log n) sạch sẽ thường ăn điểm cao hơn O(n) viết rối và đầy bug. Hãy code như đang viết cho đồng nghiệp đọc, không phải để qua mặt máy chấm.

## Detailed Answer (EN)
Readability wins, because the interviewer must understand your code to grade it. Use meaningful names (left, right, freq, not i, j, m), extract helpers for clear blocks, avoid tangled one-liners, and handle edge cases up front. A clean O(n log n) often scores higher than a buggy, tangled O(n). Write as if a teammate will read it, not to outsmart a judge.

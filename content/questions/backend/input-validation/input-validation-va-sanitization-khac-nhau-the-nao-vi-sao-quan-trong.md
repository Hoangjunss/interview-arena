---
id: input-validation-va-sanitization-khac-nhau-the-nao-vi-sao-quan-trong
position: backend
technology: input-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Input validation và sanitization khác nhau thế nào? Vì sao quan trọng?

## Question (EN)
Input validation vs sanitization — what is the difference and why does it matter?

## Đáp án chi tiết (VI)
- **Validation**: kiểm input **có hợp lệ không** (kiểu, độ dài, khoảng giá trị, định dạng) và **từ chối** nếu sai. Ưu tiên **allow-list** (chỉ chấp nhận cái đúng) hơn deny-list (chặn cái xấu — dễ sót).\
- **Sanitization**: **làm sạch/biến đổi** input để an toàn khi dùng (loại/thoát ký tự nguy hiểm, chuẩn hóa).\
\
Nguyên tắc cốt lõi (OWASP): **không bao giờ tin input từ client**; validate ở **server** (client-side chỉ để cải thiện UX). Quan trọng vì input độc là gốc của SQL injection, XSS, path traversal...\
\
Điểm hay nhầm: validation **không thay thế** phòng thủ theo ngữ cảnh — chống SQLi phải **parameterized query**, chống XSS phải **output encoding** đúng nơi hiển thị. Validation là lớp phòng thủ **bổ sung**, không phải lớp duy nhất.

## Detailed Answer (EN)
- **Validation**: check whether input **is valid** (type, length, range, format) and **reject** if not. Prefer an **allow-list** (accept only what is correct) over a deny-list (block the bad — easy to miss cases).\
- **Sanitization**: **clean/transform** input to make it safe to use (strip/escape dangerous characters, normalize).\
\
Core principle (OWASP): **never trust client input**; validate on the **server** (client-side is only for UX). It matters because malicious input is the root of SQL injection, XSS, path traversal...\
\
Common confusion: validation **does not replace** context-specific defenses — stop SQLi with **parameterized queries**, stop XSS with **output encoding** at the render site. Validation is an **additional** layer of defense, not the only one.

---
id: vi-sao-khong-co-cho-luu-token-nao-la-hoan-hao-trade-off-xss-csrf
position: backend
technology: auth-\u0026-token
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không có chỗ lưu token nào là hoàn hảo? (trade-off XSS/CSRF)

## Question (EN)
Why is there no perfect place to store a token? (the XSS/CSRF trade-off)

## Đáp án chi tiết (VI)
Mỗi cách lưu token cân giữa **ba tính chất** và chỉ đạt tối đa **2/3**:\
\
1. **XSS-resistant** — JS không đọc được token.\
2. **JS-accessible** — JS đọc được để tự gắn header `Authorization`.\
3. **CSRF-resistant** — không bị tự gửi kèm trong request cross-site.\
\
Ma trận trade-off:\
\
- **`localStorage`**: JS-accessible + CSRF-resistant, nhưng **KHÔNG** XSS-resistant — một script XSS đọc được token và replay từ nơi khác.\
- **Cookie `HttpOnly`**: XSS-resistant, nhưng JS không đọc được (không tự gắn `Authorization` được) và **dễ CSRF** vì trình duyệt tự đính kèm — phải bù bằng `SameSite`/anti-CSRF token.\
- **In-memory (biến/closure JS)**: JS-accessible + CSRF-resistant; XSS về lý thuyết vẫn với tới nhưng token biến mất khi reload nên cửa sổ tấn công hẹp — đổi lại UX phải khôi phục phiên sau mỗi lần reload.\
\
Vì không phương án nào đạt 3/3, thiết kế thực tế luôn là **tổ hợp** nhiều nơi lưu + biện pháp bù cho điểm yếu của từng nơi (khuyến nghị cụ thể ở câu \\"lưu token ở đâu\\").

## Detailed Answer (EN)
$88

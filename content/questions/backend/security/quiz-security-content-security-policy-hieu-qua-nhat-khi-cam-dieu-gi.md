---
id: quiz-security-content-security-policy-hieu-qua-nhat-khi-cam-dieu-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Content-Security-Policy hiệu quả nhất khi cấm điều gì?

## Đáp án trắc nghiệm
- [x] Script inline và eval, chỉ cho script từ nguồn xác định
- [ ] Mọi request tới domain khác ngoài domain của mình
- [ ] Việc nhúng trang trong iframe của site khác
- [ ] Tải CSS từ CDN bên ngoài để tránh bị chèn style

## Giải thích (VI)
Cấm script inline và eval, chỉ cho phép script từ nguồn khai báo (dùng nonce hoặc hash cho script cần inline). Vì phần lớn payload XSS là inline script, đây là phần mang lại hiệu quả cao nhất.

### Giải thích các phương án:
- **Script inline và eval, chỉ cho script từ nguồn xác định** (Đúng): Phần lớn payload XSS là script inline, nên cấm inline là chặn được đa số.
- **Mọi request tới domain khác ngoài domain của mình** (Sai): Chặn quá rộng sẽ phá ảnh, font và analytics mà lợi ích không tương xứng.
- **Việc nhúng trang trong iframe của site khác** (Sai): Hữu ích chống clickjacking nhưng không phải tác dụng chính của CSP.
- **Tải CSS từ CDN bên ngoài để tránh bị chèn style** (Sai): CSS ít rủi ro hơn script rất nhiều.

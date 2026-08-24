---
id: vi-sao-khong-nen-de-container-chay-bang-root-doi-sang-non-root-xong-app-bao-loi
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên để container chạy bằng root? Đổi sang non-root xong app báo lỗi ghi file thì xử lý thế nào?

## Question (EN)
Why should containers not run as root, and how do you handle permission errors after switching to a non-root user?

## Đáp án chi tiết (VI)
Mặc định process trong container chạy bằng **root (uid 0)**, và uid đó **trùng với root của host** — namespace chỉ tách tiến trình/mạng, không tách user (trừ khi bật user namespace remapping). Nếu kẻ tấn công thoát được container hoặc bind mount trúng thư mục host, họ thao tác với quyền root trên host.\
\
```dockerfile\
RUN groupadd -r app \u0026\u0026 useradd -r -g app app\
WORKDIR /app\
COPY --chown=app:app --from=build /app/dist ./dist\
USER app\
CMD [\\"node\\

## Detailed Answer (EN)
$83

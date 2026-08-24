---
id: quiz-nextjs-trong-app-router-tao-mot-api-endpoint-bang-cach-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong App Router, tạo một API endpoint bằng cách nào?

## Đáp án trắc nghiệm
- [ ] Đặt file trong pages/api/ như Pages Router — App Router không hỗ trợ API
- [ ] Khai báo trong next.config.js phần api
- [ ] Export hàm handler mặc định từ page.tsx
- [x] Tạo file route.ts và export hàm theo tên HTTP method

## Giải thích (VI)
File route.ts với các hàm export tên đúng HTTP method. app/api/users/route.ts phục vụ /api/users. Hàm nhận và trả về Web Request/Response chuẩn, không phải object riêng của Next.js như pages/api.

### Giải thích các phương án:
- **Đặt file trong pages/api/ như Pages Router — App Router không hỗ trợ API** (Sai): App Router có Route Handler; pages/api chỉ là cách cũ.
- **Khai báo trong next.config.js phần api** (Sai): Không tồn tại cấu hình khai báo endpoint như vậy.
- **Export hàm handler mặc định từ page.tsx** (Sai): page.tsx dùng để render giao diện, không phục vụ API.
- **Tạo file route.ts và export hàm theo tên HTTP method** (Đúng): Đây là quy ước Route Handler của App Router. Tên hàm export chính là method: GET, POST, PUT, DELETE…

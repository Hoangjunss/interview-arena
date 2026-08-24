---
id: quiz-nextjs-bien-moi-truong-nao-doc-duoc-tu-code-chay-trong-trinh-duyet
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Biến môi trường nào đọc được từ code chạy trong trình duyệt?

## Đáp án trắc nghiệm
- [x] Chỉ những biến có tiền tố NEXT_PUBLIC_
- [ ] Chỉ biến khai báo trong next.config.js
- [ ] Mọi biến trong .env.local đều đọc được ở cả hai phía
- [ ] Không biến nào — client phải gọi API để lấy cấu hình

## Giải thích (VI)
Chỉ biến bắt đầu bằng NEXT_PUBLIC_. Next.js thay giá trị của chúng thẳng vào bundle lúc build. Biến không có tiền tố chỉ đọc được ở Server Component, Route Handler, Server Action — vì thế DATABASE_URL không bao giờ rơi xuống trình duyệt.

### Giải thích các phương án:
- **Chỉ những biến có tiền tố NEXT_PUBLIC_** (Đúng): Next.js thay thế chúng vào bundle lúc build; biến không có tiền tố này chỉ tồn tại ở phía server. Tiền tố là cơ chế chủ động chọn biến nào được phép đi xuống client.
- **Chỉ biến khai báo trong next.config.js** (Sai): Không phải cơ chế được dùng cho việc này.
- **Mọi biến trong .env.local đều đọc được ở cả hai phía** (Sai): Nếu vậy thì mọi secret trong .env đều bị lộ ra client.
- **Không biến nào — client phải gọi API để lấy cấu hình** (Sai): Biến NEXT_PUBLIC_ đọc được trực tiếp ở client.

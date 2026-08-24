---
id: quiz-nextjs-middleware-trong-nextjs-chay-o-thoi-diem-nao-va-hop-voi-viec-gi
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong Next.js chạy ở thời điểm nào và hợp với việc gì?

## Đáp án trắc nghiệm
- [x] Chạy trước khi request tới route; hợp cho chuyển hướng, rewrite, đặt header
- [ ] Chạy sau khi trang render xong, dùng để sửa HTML trước khi gửi đi
- [ ] Chạy lúc build, dùng để sinh danh sách route
- [ ] Chỉ chạy cho các route trong app/api, không áp dụng cho trang

## Giải thích (VI)
Middleware chạy trước khi request được xử lý bởi route. Hợp cho việc nhẹ: redirect, rewrite, set header, kiểm tra nhanh cookie. Vì nằm trên đường đi của mọi request nên tránh truy vấn database hay logic nặng ở đây.

### Giải thích các phương án:
- **Chạy trước khi request tới route; hợp cho chuyển hướng, rewrite, đặt header** (Đúng): Middleware nằm trên đường đi của mọi request nên phải nhẹ. Kiểm tra sơ bộ cookie phiên đăng nhập cũng thuộc nhóm việc nhẹ đặt được ở đây.
- **Chạy sau khi trang render xong, dùng để sửa HTML trước khi gửi đi** (Sai): Nó chạy trước route handler chứ không phải sau khi render.
- **Chạy lúc build, dùng để sinh danh sách route** (Sai): Middleware hoàn toàn là cơ chế runtime.
- **Chỉ chạy cho các route trong app/api, không áp dụng cho trang** (Sai): Nó áp cho mọi request khớp matcher, gồm cả trang.

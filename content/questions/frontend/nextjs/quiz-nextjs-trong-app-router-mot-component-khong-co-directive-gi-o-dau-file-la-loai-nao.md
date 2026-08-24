---
id: quiz-nextjs-trong-app-router-mot-component-khong-co-directive-gi-o-dau-file-la-loai-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong App Router, một component không có directive gì ở đầu file là loại nào?

## Đáp án trắc nghiệm
- [x] Server Component — đây là mặc định trong App Router
- [ ] Component lai, chạy cả hai phía tùy theo hook được dùng bên trong
- [ ] Client Component — mọi component React đều chạy ở trình duyệt trừ khi đánh dấu 'use server'
- [ ] Next.js tự phân tích code và quyết định, không có mặc định

## Giải thích (VI)
Server Component — mặc định của App Router. Nó chạy trên server, không gửi JavaScript của mình xuống client, truy cập trực tiếp được database và biến môi trường bí mật. Thêm 'use client' khi cần state, effect hoặc sự kiện trình duyệt.

### Giải thích các phương án:
- **Server Component — đây là mặc định trong App Router** (Đúng): Muốn thành Client Component phải khai báo 'use client' ở đầu file. App Router đảo mặc định so với Pages Router: server trước, client khi cần.
- **Component lai, chạy cả hai phía tùy theo hook được dùng bên trong** (Sai): Không có loại lai; ranh giới được xác định tường minh bằng directive.
- **Client Component — mọi component React đều chạy ở trình duyệt trừ khi đánh dấu 'use server'** (Sai): Ngược lại; 'use server' dùng cho Server Action chứ không phải để đánh dấu component.
- **Next.js tự phân tích code và quyết định, không có mặc định** (Sai): Mặc định là Server Component, không có bước tự đoán nào.

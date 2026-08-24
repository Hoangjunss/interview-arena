---
id: quiz-nextjs-trong-app-router-file-nao-dinh-nghia-giao-dien-cua-mot-route
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong App Router, file nào định nghĩa giao diện của một route?

## Đáp án trắc nghiệm
- [ ] Bất kỳ file .tsx nào trong thư mục app/ đều tự thành một route
- [x] page.tsx — chỉ thư mục có file này mới trở thành route
- [ ] index.tsx, giống quy ước của Pages Router
- [ ] route.tsx — dùng cho cả giao diện lẫn API

## Giải thích (VI)
page.tsx. Trong App Router chỉ các tên file quy ước mới có ý nghĩa: page (giao diện route), layout (khung bao quanh), loading, error, not-found, route (API). File thường đặt chung thư mục sẽ không tạo route — nên component đặt cạnh trang được.

### Giải thích các phương án:
- **Bất kỳ file .tsx nào trong thư mục app/ đều tự thành một route** (Sai): Đây là hành vi của Pages Router; App Router chỉ nhận các tên file quy ước.
- **page.tsx — chỉ thư mục có file này mới trở thành route** (Đúng): App Router dùng quy ước tên file đặc biệt, page là file làm thư mục thành route. Các file khác trong thư mục không tự tạo route truy cập được.
- **index.tsx, giống quy ước của Pages Router** (Sai): index.tsx không có ý nghĩa đặc biệt trong App Router.
- **route.tsx — dùng cho cả giao diện lẫn API** (Sai): route.ts dành riêng cho API handler, không render giao diện.

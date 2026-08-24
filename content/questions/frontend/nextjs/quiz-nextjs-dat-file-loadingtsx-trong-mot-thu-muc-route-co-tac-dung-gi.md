---
id: quiz-nextjs-dat-file-loadingtsx-trong-mot-thu-muc-route-co-tac-dung-gi
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt file loading.tsx trong một thư mục route có tác dụng gì?

## Đáp án trắc nghiệm
- [x] Next.js tự bọc page.tsx của thư mục đó trong <Suspense> với fallback là component này
- [ ] Nó hiển thị trong lúc trình duyệt tải file JavaScript của trang, không liên quan tới dữ liệu
- [ ] Nó thay thế page.tsx khi việc lấy dữ liệu thất bại
- [ ] Nó chỉ hoạt động khi được import và render thủ công trong page.tsx

## Giải thích (VI)
loading.tsx là fallback của một <Suspense> mà Next.js tự đặt quanh route. Trang được stream: vỏ tĩnh cùng giao diện chờ hiện ngay, nội dung thật thay vào khi dữ liệu server xong. Người dùng thấy phản hồi tức thì thay vì màn hình trắng.

### Giải thích các phương án:
- **Next.js tự bọc page.tsx của thư mục đó trong <Suspense> với fallback là component này** (Đúng): Người dùng thấy giao diện chờ ngay trong lúc dữ liệu phía server đang được lấy. loading.tsx là cách khai báo Suspense boundary theo quy ước file.
- **Nó hiển thị trong lúc trình duyệt tải file JavaScript của trang, không liên quan tới dữ liệu** (Sai): Nó gắn với việc chờ render phía server, không phải chờ tải asset.
- **Nó thay thế page.tsx khi việc lấy dữ liệu thất bại** (Sai): Trường hợp lỗi thuộc về error.tsx.
- **Nó chỉ hoạt động khi được import và render thủ công trong page.tsx** (Sai): Quy ước file làm việc này tự động, không cần import.

---
id: quiz-react-su-khac-nhau-co-ban-gia-props-va-state-trong-react-la-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau cơ bản giữa props và state trong React là gì?

## Đáp án trắc nghiệm
- [ ] Props dùng cho dữ liệu tĩnh, state dùng cho dữ liệu lấy từ API
- [ ] State chỉ dùng được trong class component, props chỉ dùng được trong function component
- [ ] Component có thể sửa props trực tiếp, còn state phải sửa qua setter
- [x] Props do cha truyền xuống và read-only; state là dữ liệu nội bộ, sửa được

## Giải thích (VI)
Props là dữ liệu component cha truyền xuống con, read-only — component nhận không được sửa. State là dữ liệu nội bộ do component tự quản lý, thay đổi qua setter và mỗi lần cập nhật sẽ kích hoạt re-render. Ghi nhớ nhanh: props như tham số hàm, state như biến cục bộ của component.

### Giải thích các phương án:
- **Props dùng cho dữ liệu tĩnh, state dùng cho dữ liệu lấy từ API** (Sai): Phân loại theo nguồn dữ liệu là sai — props hoàn toàn có thể chứa dữ liệu động từ API do cha truyền xuống.
- **State chỉ dùng được trong class component, props chỉ dùng được trong function component** (Sai): Cả hai loại component đều có props, và function component có state qua useState — không có sự phân chia này.
- **Component có thể sửa props trực tiếp, còn state phải sửa qua setter** (Sai): Ngược lại: props là read-only với component nhận; chỉ state mới được cập nhật (qua setter) bên trong component.
- **Props do cha truyền xuống và read-only; state là dữ liệu nội bộ, sửa được** (Đúng): State là dữ liệu nội bộ của component, thay đổi được và kích hoạt re-render khi cập nhật. Đúng: props giống tham số hàm (component nhận không được sửa), state giống biến cục bộ mà component tự quản lý và cập nhật qua setter. Cập nhật state kích hoạt re-render, còn component nhận props thì không được sửa chúng.

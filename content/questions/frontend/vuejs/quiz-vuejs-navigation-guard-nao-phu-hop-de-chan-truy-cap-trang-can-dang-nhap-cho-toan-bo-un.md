---
id: quiz-vuejs-navigation-guard-nao-phu-hop-de-chan-truy-cap-trang-can-dang-nhap-cho-toan-bo-un
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Navigation guard nào phù hợp để chặn truy cập trang cần đăng nhập cho toàn bộ ứng dụng?

## Đáp án trắc nghiệm
- [ ] Không cần guard, chỉ cần ẩn link trong menu điều hướng
- [x] router.beforeEach — guard toàn cục chạy trước mỗi lần điều hướng
- [ ] afterEach — vì nó chạy sau nên biết chắc chắn là route đã hợp lệ
- [ ] beforeRouteLeave khai báo trong từng component

## Giải thích (VI)
Dùng router.beforeEach cho kiểm tra tập trung: đọc to.meta.requiresAuth, nếu chưa đăng nhập thì trả về route đăng nhập kèm redirect. Ngoài ra có beforeEnter cho một route cụ thể, và các hook trong component: beforeRouteEnter (chưa có this), beforeRouteUpdate, beforeRouteLeave (cảnh báo khi rời form dở dang). Guard chỉ là lớp trải nghiệm — phân quyền thật vẫn phải ở backend.

### Giải thích các phương án:
- **Không cần guard, chỉ cần ẩn link trong menu điều hướng** (Sai): Người dùng vẫn gõ URL trực tiếp; ẩn link không phải cơ chế kiểm soát.
- **router.beforeEach — guard toàn cục chạy trước mỗi lần điều hướng** (Đúng): Đúng: kiểm tra tập trung, kết hợp meta.requiresAuth để khai báo theo route. Trả về một route khác để chuyển hướng, hoặc false để huỷ điều hướng.
- **afterEach — vì nó chạy sau nên biết chắc chắn là route đã hợp lệ** (Sai): afterEach chạy sau khi điều hướng đã xảy ra nên không chặn được.
- **beforeRouteLeave khai báo trong từng component** (Sai): Hook này để cảnh báo khi rời trang (form dở dang), không phải kiểm soát vào trang.

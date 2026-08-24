---
id: quiz-docker-bind-mount-va-docker-volume-khac-nhau-the-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bind mount và Docker volume khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Bind mount chỉ đọc, còn volume chỉ ghi
- [ ] Cả bind mount và volume đều lưu dữ liệu trong writable layer của container nên mất khi container bị xóa
- [x] Bind mount map path của host; volume do Docker quản lý ở khu vực riêng
- [ ] Volume lưu dữ liệu bên trong image, nên push image lên registry là mang theo cả dữ liệu

## Giải thích (VI)
Bind mount map trực tiếp một path của host vào container — sửa file host thấy ngay trong container, hợp local development nhưng phụ thuộc cấu trúc host. Volume do Docker quản lý trong khu vực lưu trữ riêng, portable hơn và hợp dữ liệu bền vững như database data. Cả hai đều nằm ngoài writable layer nên dữ liệu không mất khi container bị xóa.

### Giải thích các phương án:
- **Bind mount chỉ đọc, còn volume chỉ ghi** (Sai): Cả hai đều đọc-ghi mặc định; chế độ read-only phải tự khai báo, không phải thuộc tính cố hữu của loại mount.
- **Cả bind mount và volume đều lưu dữ liệu trong writable layer của container nên mất khi container bị xóa** (Sai): Sai — cả hai đều tồn tại ngoài writable layer chính vì mục đích là giữ dữ liệu qua vòng đời container.
- **Bind mount map path của host; volume do Docker quản lý ở khu vực riêng** (Đúng): Đúng: khác biệt nằm ở nguồn lưu trữ — bind mount gắn với path host cụ thể (hợp cho local development), volume do Docker tự quản lý và portable hơn (hợp cho dữ liệu bền vững như database).
- **Volume lưu dữ liệu bên trong image, nên push image lên registry là mang theo cả dữ liệu** (Sai): Hiểu nhầm phổ biến: dữ liệu volume nằm ngoài image, không được đóng gói hay push kèm image.

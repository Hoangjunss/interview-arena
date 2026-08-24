---
id: quiz-security-ung-dung-ket-noi-db-bang-user-postgres-superuser-rui-ro
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng kết nối DB bằng user postgres (superuser). Rủi ro?

## Đáp án trắc nghiệm
- [ ] Không thể dùng connection pool khi kết nối bằng user superuser
- [ ] Kết nối chậm hơn vì superuser phải kiểm thêm quyền
- [x] Một lỗ hổng nhỏ thành toàn quyền trên DB
- [ ] Không ghi được log về việc ai đã thay đổi dữ liệu

## Giải thích (VI)
Thiệt hại không còn giới hạn. Một lỗ hổng SQL injection nhỏ khi đó cho phép xoá bảng, đọc mọi dữ liệu, hay thay đổi cấu hình DB. User của ứng dụng chỉ nên có quyền đọc/ghi trên các bảng nó cần.

### Giải thích các phương án:
- **Không thể dùng connection pool khi kết nối bằng user superuser** (Sai): Pool hoạt động bình thường với mọi user.
- **Kết nối chậm hơn vì superuser phải kiểm thêm quyền** (Sai): Không có khác biệt về hiệu năng đáng kể.
- **Một lỗ hổng nhỏ thành toàn quyền trên DB** (Đúng): Quyền tối thiểu giới hạn thiệt hại khi ứng dụng bị khai thác.
- **Không ghi được log về việc ai đã thay đổi dữ liệu** (Sai): Ghi log không phụ thuộc vào việc user có phải superuser.

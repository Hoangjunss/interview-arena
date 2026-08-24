---
id: quiz-cpp-lop-chuoi-cua-thu-vien-chuan-khac-con-tro-ky-tu-kieu-c-o-diem-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lớp chuỗi của thư viện chuẩn khác con trỏ ký tự kiểu C ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Nó lưu ký tự dưới dạng mã hoá nhiều byte tự động
- [x] Nó tự quản lý bộ nhớ và biết độ dài của mình
- [ ] Nó không cho phép truy cập từng ký tự
- [ ] Nó luôn cấp phát bộ nhớ động cho mọi chuỗi

## Giải thích (VI)
Nó tự quản lý bộ nhớ, biết độ dài và tự nối thêm được . Chuỗi kiểu C phải duyệt tới ký tự kết thúc mới biết độ dài, và mọi thao tác nối hay sao chép đều do người viết tự lo bộ đệm.

### Giải thích các phương án:
- **Nó lưu ký tự dưới dạng mã hoá nhiều byte tự động** (Sai): Nó lưu byte thô, việc diễn giải mã hoá là chuyện khác.
- **Nó tự quản lý bộ nhớ và biết độ dài của mình** (Đúng): Chuỗi kiểu C phải duyệt tới ký tự kết thúc mới biết độ dài và người viết phải tự cấp phát.
- **Nó không cho phép truy cập từng ký tự** (Sai): Truy cập theo chỉ số vẫn được.
- **Nó luôn cấp phát bộ nhớ động cho mọi chuỗi** (Sai): Chuỗi ngắn thường được lưu ngay trong chính đối tượng.

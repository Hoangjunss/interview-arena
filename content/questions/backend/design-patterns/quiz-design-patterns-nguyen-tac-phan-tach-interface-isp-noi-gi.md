---
id: quiz-design-patterns-nguyen-tac-phan-tach-interface-isp-noi-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc phân tách interface (ISP) nói gì?

## Đáp án trắc nghiệm
- [ ] Mỗi lớp chỉ được hiện thực đúng một interface
- [x] Không ép lớp phụ thuộc vào phương thức nó không dùng
- [ ] Mọi phương thức public đều phải khai báo trong interface
- [ ] Interface phải luôn được đặt cùng gói với lớp hiện thực

## Giải thích (VI)
Không lớp nào bị ép phụ thuộc vào phương thức nó không dùng. Interface lớn nên tách thành nhiều interface nhỏ theo vai trò, để mỗi bên sử dụng chỉ thấy phần liên quan tới mình.

### Giải thích các phương án:
- **Mỗi lớp chỉ được hiện thực đúng một interface** (Sai): Một lớp hiện thực nhiều interface nhỏ là điều nguyên tắc này khuyến khích.
- **Không ép lớp phụ thuộc vào phương thức nó không dùng** (Đúng): Interface lớn buộc mọi lớp hiện thực phải khai báo cả những phương thức không liên quan, thường bằng cách ném lỗi hoặc để rỗng.
- **Mọi phương thức public đều phải khai báo trong interface** (Sai): Không phải mọi phương thức đều cần lộ ra qua interface.
- **Interface phải luôn được đặt cùng gói với lớp hiện thực** (Sai): Vị trí đặt interface là vấn đề tổ chức mã, không phải nội dung của nguyên tắc.

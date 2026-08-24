---
id: quiz-design-patterns-mot-lop-usermanager-co-40-phuong-thuc-lo-moi-viec-ve-user-van-de-goi-la-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một lớp UserManager có 40 phương thức lo mọi việc về user. Vấn đề gọi là gì?

## Đáp án trắc nghiệm
- [ ] Spaghetti code: luồng thực thi rối và khó lần
- [ ] Premature optimization, tức là tối ưu quá sớm
- [ ] Circular dependency giữa các module trong dự án
- [x] God object: một lớp gánh quá nhiều trách nhiệm

## Giải thích (VI)
God object : một lớp gánh mọi trách nhiệm về một chủ đề. Hậu quả cụ thể: mọi thay đổi đều chạm vào nó (xung đột merge liên tục), nó phụ thuộc vào rất nhiều thứ nên test nào cũng phải dựng cả thế giới.

### Giải thích các phương án:
- **Spaghetti code: luồng thực thi rối và khó lần** (Sai): Mô tả sự rối của luồng, không phải việc dồn trách nhiệm vào một lớp.
- **Premature optimization, tức là tối ưu quá sớm** (Sai): Không liên quan tới việc phân chia trách nhiệm.
- **Circular dependency giữa các module trong dự án** (Sai): Là vấn đề khác, về hướng phụ thuộc giữa các module.
- **God object: một lớp gánh quá nhiều trách nhiệm** (Đúng): Mọi thay đổi liên quan tới user đều phải sửa nó, và nó phụ thuộc vào rất nhiều thứ.

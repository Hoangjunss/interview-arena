---
id: quiz-design-patterns-nguyen-tac-don-nhiem-srp-nen-hieu-the-nao-cho-dung
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên tắc đơn nhiệm (SRP) nên hiểu thế nào cho đúng?

## Đáp án trắc nghiệm
- [ ] Một file thì chỉ nên chứa duy nhất một lớp
- [x] Một module chỉ nên có một lý do để thay đổi
- [ ] Một hàm không nên dài quá 20 dòng code
- [ ] Một lớp chỉ nên có một phương thức công khai

## Giải thích (VI)
Một module nên có một lý do để thay đổi — tức phục vụ một nhóm người dùng hoặc một mối quan tâm. Hiểu thành "chỉ làm một việc" dẫn tới chia vụn thành hàng trăm tệp mà mỗi tệp không nói được gì.

### Giải thích các phương án:
- **Một file thì chỉ nên chứa duy nhất một lớp** (Sai): Là quy ước tổ chức tệp, không liên quan tới trách nhiệm.
- **Một module chỉ nên có một lý do để thay đổi** (Đúng): Cách hiểu "chỉ làm một việc" dẫn tới chia quá vụn thành hàng trăm tệp nhỏ.
- **Một hàm không nên dài quá 20 dòng code** (Sai): Độ dài là hướng dẫn về khả năng đọc, không phải SRP.
- **Một lớp chỉ nên có một phương thức công khai** (Sai): Số phương thức không phải tiêu chí của nguyên tắc này.

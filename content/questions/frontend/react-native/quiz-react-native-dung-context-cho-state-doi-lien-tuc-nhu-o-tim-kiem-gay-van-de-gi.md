---
id: quiz-react-native-dung-context-cho-state-doi-lien-tuc-nhu-o-tim-kiem-gay-van-de-gi
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng Context cho state đổi liên tục như ô tìm kiếm gây vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Context chỉ hoạt động với component cùng cấp
- [ ] Context không dùng được cùng hooks
- [x] Mọi component đọc context đều dựng lại
- [ ] Context không lưu được giá trị kiểu chuỗi

## Giải thích (VI)
Context không có cơ chế chọn phần dữ liệu : đổi giá trị là mọi component đọc nó đều dựng lại, kể cả những component chỉ quan tâm một trường khác. Với state đổi theo từng ký tự, đó là hàng loạt render thừa.

### Giải thích các phương án:
- **Context chỉ hoạt động với component cùng cấp** (Sai): Nó truyền xuống toàn bộ cây con.
- **Context không dùng được cùng hooks** (Sai): useContext là cách dùng chuẩn.
- **Mọi component đọc context đều dựng lại** (Đúng): Context không có cơ chế chọn phần dữ liệu, nên đổi giá trị là mọi người tiêu thụ đều render.
- **Context không lưu được giá trị kiểu chuỗi** (Sai): Nó lưu được mọi kiểu giá trị.

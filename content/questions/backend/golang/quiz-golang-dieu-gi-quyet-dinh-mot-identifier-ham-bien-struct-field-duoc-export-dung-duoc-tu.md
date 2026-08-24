---
id: quiz-golang-dieu-gi-quyet-dinh-mot-identifier-ham-bien-struct-field-duoc-export-dung-duoc-tu
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì quyết định một identifier (hàm, biến, struct, field) được export — dùng được từ package khác — trong Go?

## Đáp án trắc nghiệm
- [ ] Mọi identifier đều dùng được từ package khác, Go không có khái niệm private
- [ ] Identifier phải được liệt kê trong một danh sách export ở file go.mod
- [x] Chữ cái đầu của tên: viết hoa là exported (fmt.Println), viết thường là unexported
- [ ] Từ khóa public / private đặt trước khai báo như Java, C#

## Giải thích (VI)
Chữ cái đầu của tên quyết định: viết HOA là exported — package khác import và dùng được (fmt.Println, http.Get); viết thường là unexported — chỉ dùng trong nội bộ package. Go không có từ khóa public/private. Quy tắc áp dụng cho mọi identifier: hàm, biến, hằng, type, và cả từng field trong struct.

### Giải thích các phương án:
- **Mọi identifier đều dùng được từ package khác, Go không có khái niệm private** (Sai): Go có phân biệt rõ: identifier viết thường bị giới hạn trong package của nó; import package khác rồi gọi tên viết thường sẽ lỗi biên dịch.
- **Identifier phải được liệt kê trong một danh sách export ở file go.mod** (Sai): go.mod chỉ khai báo module path và dependency, không liên quan tới việc export identifier (khác exports trong package.json của Node).
- **Chữ cái đầu của tên: viết hoa là exported (fmt.Println), viết thường là unexported** (Đúng): Chỉ dùng được trong cùng package. Go không có access modifier; khả năng truy cập được mã hóa ngay trong cách đặt tên. Println gọi được từ ngoài, println nội bộ thì không.
- **Từ khóa public / private đặt trước khai báo như Java, C#** (Sai): Go không có các từ khóa access modifier; đây là điểm khác biệt chủ đích so với Java/C# để giảm cú pháp thừa.

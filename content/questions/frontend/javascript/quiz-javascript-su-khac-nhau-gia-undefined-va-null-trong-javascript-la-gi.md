---
id: quiz-javascript-su-khac-nhau-gia-undefined-va-null-trong-javascript-la-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa undefined và null trong JavaScript là gì?

## Đáp án trắc nghiệm
- [ ] Chúng giống hệt nhau, dùng thay thế cho nhau ở mọi chỗ
- [x] undefined là giá trị mặc định khi biến/thuộc tính chưa được gán
- [ ] null nghĩa là biến chưa được khai báo trong chương trình
- [ ] undefined chỉ xuất hiện khi code ném lỗi

## Giải thích (VI)
undefined = "chưa có giá trị" do engine tự sinh: biến khai báo chưa gán, thuộc tính không tồn tại, hàm không return, tham số không truyền. null = "cố ý không có giá trị" do lập trình viên gán chủ động. Chúng khác kiểu (typeof undefined → "undefined", typeof null → "object"), nên null == undefined là true nhưng null === undefined là false.

### Giải thích các phương án:
- **Chúng giống hệt nhau, dùng thay thế cho nhau ở mọi chỗ** (Sai): Chúng là hai giá trị khác nhau, hai kiểu khác nhau: null === undefined là false và typeof trả kết quả khác nhau.
- **undefined là giá trị mặc định khi biến/thuộc tính chưa được gán** (Đúng): null là giá trị được lập trình viên gán chủ động để biểu thị "cố ý không có giá trị". Engine tự sinh undefined (biến chưa gán, thuộc tính không tồn tại, hàm không return); null chỉ xuất hiện khi code gán nó một cách có chủ đích.
- **null nghĩa là biến chưa được khai báo trong chương trình** (Sai): Biến chưa khai báo khi truy cập ném ReferenceError, không phải null; còn biến đã khai báo nhưng chưa gán mang giá trị undefined.
- **undefined chỉ xuất hiện khi code ném lỗi** (Sai): undefined là giá trị bình thường, không liên quan tới lỗi: đọc thuộc tính không tồn tại hay hàm không return đều cho undefined mà không ném gì.

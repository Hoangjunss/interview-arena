---
id: quiz-java-dong-1-va-2-trong-doan-code-sau-dong-nao-hop-le-dong-nao-loi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dòng (1) và (2) trong đoạn code sau — dòng nào hợp lệ, dòng nào lỗi?

## Đáp án trắc nghiệm
- [ ] Cả hai đều hợp lệ — final chỉ mang tính tài liệu, compiler không kiểm tra
- [x] (1) hợp lệ, (2) lỗi — final chỉ khoá reference, không khoá nội dung object
- [ ] Cả hai đều lỗi biên dịch — final làm object trở thành immutable hoàn toàn, mọi thao tác thay đổi đều bị cấm
- [ ] (1) lỗi biên dịch, (2) hợp lệ — final cấm sửa nội dung nhưng cho phép trỏ sang object mới

## Giải thích (VI)
(1) hợp lệ, (2) lỗi biên dịch. final trên biến nghĩa là gán đúng một lần — không trỏ biến sang object khác được nữa. Nhưng final không làm object bất biến: names.add("Ada") vẫn sửa nội dung list bình thường. Muốn danh sách không sửa được thật sự, dùng List.copyOf(...) hoặc List.of(...). Phân biệt "khoá reference" với "khoá object" là điểm chấm của câu này.

### Giải thích các phương án:
- **Cả hai đều hợp lệ — final chỉ mang tính tài liệu, compiler không kiểm tra** (Sai): final được compiler kiểm tra nghiêm ngặt: gán lại biến final là lỗi biên dịch, không phải cảnh báo hay quy ước.
- **(1) hợp lệ, (2) lỗi — final chỉ khoá reference, không khoá nội dung object** (Đúng): Đúng: final trên biến nghĩa là gán đúng một lần; object mà biến tham chiếu tới vẫn mutate được qua method của nó. Muốn bất biến thật phải dùng List.copyOf(...) hoặc List.of(...).
- **Cả hai đều lỗi biên dịch — final làm object trở thành immutable hoàn toàn, mọi thao tác thay đổi đều bị cấm** (Sai): final không lan vào object — add() vẫn hợp lệ; nhầm lẫn final-biến với immutability-object là hiểu nhầm kinh điển của câu này.
- **(1) lỗi biên dịch, (2) hợp lệ — final cấm sửa nội dung nhưng cho phép trỏ sang object mới** (Sai): Ngược hoàn toàn: final khoá đúng phần gán lại reference, còn nội dung object nằm ngoài phạm vi của nó.

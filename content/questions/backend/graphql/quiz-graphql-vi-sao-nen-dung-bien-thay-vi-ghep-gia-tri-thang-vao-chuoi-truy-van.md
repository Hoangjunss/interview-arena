---
id: quiz-graphql-vi-sao-nen-dung-bien-thay-vi-ghep-gia-tri-thang-vao-chuoi-truy-van
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng biến thay vì ghép giá trị thẳng vào chuỗi truy vấn?

## Đáp án trắc nghiệm
- [ ] Biến làm truy vấn chạy nhanh hơn ở phía server
- [ ] Biến cho phép bỏ qua bước kiểm tra kiểu của schema
- [x] Truy vấn giữ nguyên hình dạng cho mọi giá trị
- [ ] Ghép chuỗi không truyền được giá trị dạng số

## Giải thích (VI)
Dùng biến thì tài liệu truy vấn giữ nguyên cho mọi giá trị, nên server phân tích và cache được, còn giá trị được kiểm tra kiểu. Ghép chuỗi tạo ra truy vấn khác nhau mỗi lần và mở đường cho việc chèn nội dung ngoài ý muốn.

### Giải thích các phương án:
- **Biến làm truy vấn chạy nhanh hơn ở phía server** (Sai): Thời gian thực thi phụ thuộc dữ liệu chứ không phải cách truyền giá trị.
- **Biến cho phép bỏ qua bước kiểm tra kiểu của schema** (Sai): Ngược lại, biến được kiểm tra kiểu chặt chẽ hơn.
- **Truy vấn giữ nguyên hình dạng cho mọi giá trị** (Đúng): Cùng một tài liệu truy vấn dùng lại cho mọi giá trị, nên phân tích và cache ở cả hai phía đều hiệu quả.
- **Ghép chuỗi không truyền được giá trị dạng số** (Sai): Về kỹ thuật vẫn ghép được, vấn đề nằm ở an toàn và khả năng đệm.

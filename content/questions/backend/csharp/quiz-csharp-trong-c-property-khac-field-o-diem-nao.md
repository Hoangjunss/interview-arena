---
id: quiz-csharp-trong-c-property-khac-field-o-diem-nao
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong C#, property khác field ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Chỉ field mới dùng được trong class, property chỉ dùng trong interface
- [ ] Property lưu được nhiều giá trị cùng lúc, field chỉ lưu một giá trị
- [x] Field là biến lưu dữ liệu trực tiếp
- [ ] Property và field giống hệt nhau, chỉ khác quy ước đặt tên (PascalCase vs camelCase)

## Giải thích (VI)
Field là biến member lưu dữ liệu trực tiếp; property là cặp accessor get/set bọc quanh việc đọc/ghi. Property cho phép validation, giá trị tính toán, hoặc đổi cài đặt nội bộ mà không phá code gọi. Quy ước .NET: expose state ra ngoài bằng property (thường là auto-property { get; set; }), field để private.

### Giải thích các phương án:
- **Chỉ field mới dùng được trong class, property chỉ dùng trong interface** (Sai): Property dùng bình thường trong class (rất phổ biến qua auto-property); ngược lại interface không khai báo field được.
- **Property lưu được nhiều giá trị cùng lúc, field chỉ lưu một giá trị** (Sai): Property không phải collection; một property đại diện một giá trị như field, chỉ khác ở chỗ đọc/ghi đi qua accessor.
- **Field là biến lưu dữ liệu trực tiếp** (Đúng): Property là cặp accessor get/set kiểm soát việc đọc/ghi, cho phép chèn validation hay tính toán mà không đổi cách gọi bên ngoài. Property là thành viên cú pháp giống biến nhưng thực chất là method get/set — điểm chặn để validate, tính giá trị, hay đổi cài đặt nội bộ về sau.
- **Property và field giống hệt nhau, chỉ khác quy ước đặt tên (PascalCase vs camelCase)** (Sai): Khác biệt là cơ chế, không phải tên gọi: property biên dịch thành method accessor, còn field là vùng nhớ truy cập trực tiếp.

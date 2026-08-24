---
id: quiz-golang-khai-bao-x-10-khac-var-x-10-o-diem-nao
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo x := 10 khác var x = 10 ở điểm nào?

## Đáp án trắc nghiệm
- [x] := chỉ dùng được bên trong function
- [ ] := tạo hằng số không đổi được, còn var tạo biến thường
- [ ] := là phép gán giá trị cho biến đã tồn tại, var mới là khai báo biến mới
- [ ] Biến khai báo bằng := không có kiểu cố định, đổi kiểu được như JavaScript

## Giải thích (VI)
x := 10 (short declaration) vừa khai báo vừa gán, kiểu được suy ra từ vế phải, và CHỈ dùng được bên trong function. var x = 10 làm điều tương tự nhưng dùng được cả ở package level. Trong hàm, := là cách viết phổ biến nhất; var dùng khi khai báo ở cấp package hoặc khi muốn biến nhận zero value (var x int).

### Giải thích các phương án:
- **:= chỉ dùng được bên trong function** (Đúng): var dùng được cả ở package level. Bên trong function, hai cách cho kết quả tương đương. Short variable declaration là statement nên chỉ hợp lệ trong thân hàm; var là declaration nên đặt được ở mọi cấp, kể cả ngoài hàm.
- **:= tạo hằng số không đổi được, còn var tạo biến thường** (Sai): Cả hai đều tạo biến gán lại được; hằng số trong Go khai báo bằng từ khóa const, không liên quan tới :=.
- **:= là phép gán giá trị cho biến đã tồn tại, var mới là khai báo biến mới** (Sai): Ngược lại: := vừa KHAI BÁO vừa gán (biến bên trái phải có ít nhất một biến mới); phép gán cho biến đã tồn tại dùng =.
- **Biến khai báo bằng := không có kiểu cố định, đổi kiểu được như JavaScript** (Sai): Go là ngôn ngữ static typing: := chỉ SUY RA kiểu từ vế phải một lần lúc khai báo; sau đó kiểu cố định, gán chuỗi vào x := 10 sẽ lỗi biên dịch.

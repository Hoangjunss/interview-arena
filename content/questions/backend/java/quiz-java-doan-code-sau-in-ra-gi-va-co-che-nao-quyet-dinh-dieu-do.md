---
id: quiz-java-doan-code-sau-in-ra-gi-va-co-che-nao-quyet-dinh-dieu-do
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra gì, và cơ chế nào quyết định điều đó?

## Đáp án trắc nghiệm
- [x] "Woof" — method được dispatch lúc runtime theo kiểu thực của object
- [ ] "..." — biến khai báo kiểu Animal nên compiler chọn method của Animal ngay lúc biên dịch
- [ ] Lỗi biên dịch — không thể gán object Dog vào biến kiểu Animal
- [ ] In cả "..." lẫn "Woof" — bản của cha chạy trước rồi mới tới bản override của con

## Giải thích (VI)
In ra "Woof". Instance method trong Java được dispatch động lúc runtime: JVM nhìn kiểu thực của object (Dog) chứ không nhìn kiểu khai báo của biến (Animal) để chọn bản method chạy. Đây là runtime polymorphism qua overriding — khác với overloading vốn được compiler quyết định lúc biên dịch theo kiểu tham số.

### Giải thích các phương án:
- **"Woof" — method được dispatch lúc runtime theo kiểu thực của object** (Đúng): Đúng: đây là dynamic dispatch (runtime polymorphism) — JVM nhìn object thực sự đang được trỏ tới để chọn bản override, không theo kiểu khai báo của biến.
- **"..." — biến khai báo kiểu Animal nên compiler chọn method của Animal ngay lúc biên dịch** (Sai): Kiểu khai báo chỉ quyết định method nào ĐƯỢC PHÉP gọi; bản chạy thực tế được chọn lúc runtime theo object thực — ở đây là Dog.
- **Lỗi biên dịch — không thể gán object Dog vào biến kiểu Animal** (Sai): Gán con vào biến kiểu cha là upcasting hợp lệ, nền tảng của polymorphism — không có lỗi biên dịch nào.
- **In cả "..." lẫn "Woof" — bản của cha chạy trước rồi mới tới bản override của con** (Sai): Override thay thế hoàn toàn bản của cha khi dispatch; bản cha chỉ chạy nếu con gọi tường minh super.speak().

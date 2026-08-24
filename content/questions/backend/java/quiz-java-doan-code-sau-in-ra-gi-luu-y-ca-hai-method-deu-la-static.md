---
id: quiz-java-doan-code-sau-in-ra-gi-luu-y-ca-hai-method-deu-la-static
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra gì? Lưu ý cả hai method đều là static.

## Đáp án trắc nghiệm
- [ ] "Child" — object thực là Child nên bản của Child được chọn, giống mọi method khác
- [ ] Lỗi biên dịch — không được khai báo static method trùng signature với class cha
- [x] "Parent" — static method không được override mà bị hide, resolve lúc biên dịch
- [ ] "Parent" rồi "Child" — JVM chạy bản của cha trước rồi bản của con theo thứ tự kế thừa

## Giải thích (VI)
In ra "Parent". Static method không tham gia dynamic dispatch: khai báo static method trùng signature với cha tạo ra method hiding, không phải overriding. Lời gọi p.who() được resolve lúc biên dịch theo kiểu khai báo của reference (Parent). Thực hành đúng: luôn gọi static method qua tên class (Parent.who()), không gọi qua instance.

### Giải thích các phương án:
- **"Child" — object thực là Child nên bản của Child được chọn, giống mọi method khác** (Sai): Dispatch theo object thực chỉ áp dụng cho instance method (overriding); static method thuộc về class và resolve theo kiểu reference.
- **Lỗi biên dịch — không được khai báo static method trùng signature với class cha** (Sai): Khai báo static method trùng signature với cha là hợp lệ — nó tạo method hiding, compiler không báo lỗi (chỉ IDE có thể cảnh báo cách gọi qua instance).
- **"Parent" — static method không được override mà bị hide, resolve lúc biên dịch** (Đúng): Đúng: đây là method hiding — static method dispatch theo kiểu khai báo của reference (compile-time), không có dynamic dispatch như instance method.
- **"Parent" rồi "Child" — JVM chạy bản của cha trước rồi bản của con theo thứ tự kế thừa** (Sai): Chỉ một method được gọi cho một lời gọi — không có cơ chế chạy lần lượt theo chuỗi kế thừa.

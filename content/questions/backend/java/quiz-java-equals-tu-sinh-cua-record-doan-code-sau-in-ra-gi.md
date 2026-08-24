---
id: quiz-java-equals-tu-sinh-cua-record-doan-code-sau-in-ra-gi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
equals tự sinh của record — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] true và lỗi biên dịch ở a.x() — accessor của record có dạng getX() theo chuẩn JavaBean
- [ ] Lỗi biên dịch — record không tự sinh accessor, phải tự viết method getX()
- [x] true và 1 — record tự sinh equals/hashCode theo giá trị, accessor dạng x()
- [ ] false và 1 — record không override equals nên dùng so sánh reference mặc định của Object

## Giải thích (VI)
In true và 1. Record (Java 16+) tự sinh: canonical constructor, accessor trùng tên component (x(), không phải getX()), equals/hashCode so sánh theo giá trị component, và toString. Vì vậy hai Point(1, 2) là equals dù là hai object khác nhau. Field của record ngầm là private final — record là cách gọn nhất để khai báo một value type bất biến.

### Giải thích các phương án:
- **true và lỗi biên dịch ở a.x() — accessor của record có dạng getX() theo chuẩn JavaBean** (Sai): Accessor của record cố ý bỏ tiền tố get — a.x() là cú pháp đúng, a.getX() mới là lỗi biên dịch.
- **Lỗi biên dịch — record không tự sinh accessor, phải tự viết method getX()** (Sai): Record tự sinh accessor cho từng component, tên trùng tên component: x(), y() — không cần và không theo chuẩn getX() của JavaBean.
- **true và 1 — record tự sinh equals/hashCode theo giá trị, accessor dạng x()** (Đúng): Đúng: JEP 395 quy định record tự sinh canonical constructor, accessor trùng tên component (không có tiền tố get), equals/hashCode theo giá trị và toString.
- **false và 1 — record không override equals nên dùng so sánh reference mặc định của Object** (Sai): equals theo giá trị là một trong những thứ record TỰ SINH — hai object khác nhau nhưng cùng component vẫn equals; đây là điểm khác class thường.

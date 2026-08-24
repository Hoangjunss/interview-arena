---
id: mvvm-architecture-trong-flutter-la-gi-va-khac-mvc-nhu-the-nao
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVVM architecture trong Flutter là gì và khác MVC như thế nào?

## Question (EN)
What is MVVM architecture in Flutter and how does it differ from MVC?

## Đáp án chi tiết (VI)
MVC (Model-View-Controller): Controller xử lý input và cập nhật Model, View hiển thị Model. MVVM (Model-View-ViewModel): ViewModel expose data và logic UI cần. UI bind vào ViewModel. ViewModel không biết về UI. MVVM testable hơn MVC vì ViewModel không có dependency vào UI framework. Flutter không bắt buộc MVVM nhưng Provider + ViewModel class đạt được pattern này rất gọn.

## Detailed Answer (EN)
MVC has a Controller handling input and updating Model for the View. MVVM has a ViewModel exposing data and logic without knowing about UI. MVVM is more testable because ViewModel has no UI framework dependencies. Provider combined with ViewModel classes implements MVVM elegantly in Flutter.

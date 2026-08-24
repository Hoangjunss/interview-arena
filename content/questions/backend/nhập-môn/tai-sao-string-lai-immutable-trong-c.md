---
id: tai-sao-string-lai-immutable-trong-c
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao String lại immutable trong C#?

## Question (EN)
Why is String immutable in C#?

## Đáp án chi tiết (VI)
String trong C# là immutable — khi tạo ra thì không bao giờ thay đổi. Các thao tác như `string.Replace()` tạo ra chuỗi mới chứ không sửa chuỗi cũ. Tính immutable đảm bảo thread-safety và cho phép string interning (tối ưu bộ nhớ bằng cách tái dùng chuỗi giống nhau). Tuy nhiên việc ghép chuỗi trong vòng lặp sẽ tốn nhiều bộ nhớ — hãy dùng `StringBuilder` thay thế.

## Detailed Answer (EN)
Strings are immutable — once created, they never change. Operations like `string.Replace()` create new strings rather than modifying existing ones. Immutability ensures thread-safety and enables string interning (memory optimization). However, concatenating strings in loops is expensive — use `StringBuilder` instead.

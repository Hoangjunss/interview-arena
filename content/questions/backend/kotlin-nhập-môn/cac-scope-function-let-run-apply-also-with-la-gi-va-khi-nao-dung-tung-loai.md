---
id: cac-scope-function-let-run-apply-also-with-la-gi-va-khi-nao-dung-tung-loai
position: backend
technology: kotlin-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các scope function (`let`, `run`, `apply`, `also`, `with`) là gì và khi nào dùng từng loại?

## Question (EN)
What are scope functions (let, run, apply, also, with) and when to use each?

## Đáp án chi tiết (VI)
Scope function thực thi một block code trên một object trong một scope tạm thời. `let` chạy code chỉ khi object khác null (trả về kết quả lambda). `run` giống `let` nhưng dùng `this` thay vì tham số. `apply` cấu hình object và trả về chính object đó (dùng khi khởi tạo). `also` giống `apply` nhưng truyền object vào làm tham số. `with` giống `run` nhưng cú pháp khác. Chọn loại dựa vào nhu cầu null-safety, giá trị trả về, hay cách tham chiếu object.

## Detailed Answer (EN)
Scope functions execute code on an object within a temporary scope. `let` executes code only if non-null (returns lambda result). `run` is like `let` but uses `this`. `apply` configures and returns the object (good for initialization). `also` is like `apply` but passes object as parameter. `with` is like `run` but called differently. Choose based on null safety, return value, or object reference needs.

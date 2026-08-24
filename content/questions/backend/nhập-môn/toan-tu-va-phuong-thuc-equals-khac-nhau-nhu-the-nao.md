---
id: toan-tu-va-phuong-thuc-equals-khac-nhau-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử `==` và phương thức `Equals()` khác nhau như thế nào?

## Question (EN)
What is the difference between the == operator and Equals()?

## Đáp án chi tiết (VI)
Toán tử `==` so sánh theo tham chiếu đối với class (trừ khi bị override) nhưng so sánh theo giá trị với struct và kiểu nguyên thủy. `Equals()` mặc định so sánh theo giá trị. Với custom types, nên override cả hai để nhất quán. Để tuân thủ best practice, hãy implement cả `IEquatable\u003cT\u003e` cùng với việc override `GetHashCode()`.

## Detailed Answer (EN)
The `==` operator compares references for classes (unless overloaded) but compares values for structs and primitives. `Equals()` compares values by default. Override both for custom types to keep them consistent. Best practice: also implement `IEquatable\u003cT\u003e` and override `GetHashCode()`.

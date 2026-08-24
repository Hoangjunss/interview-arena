---
id: single-responsibility-principle-srp-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: solid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Single Responsibility Principle (SRP) là gì và tại sao nó quan trọng?

## Question (EN)
What is the Single Responsibility Principle (SRP) and why does it matter?

## Đáp án chi tiết (VI)
SRP quy định mỗi class/module chỉ nên có một lý do để thay đổi, tức là chỉ chịu trách nhiệm cho một chức năng duy nhất.\
\
Ví dụ trong TypeScript:\
```typescript\
// Vi phạm SRP — 1 class làm 3 việc\
class UserService {\
  handleLogin() { /* ... */ }\
  log(msg: string) { /* ... */ }\
  sendEmail() { /* ... */ }\
}\
// Đúng SRP — tách riêng\
class UserService { handleLogin() { /* ... */ } }\
class Logger { log(msg: string) { /* ... */ } }\
class EmailService { sendEmail() { /* ... */ } }\
```\
\
Lợi ích: code dễ test, dễ maintain. Dấu hiệu vi phạm: class có nhiều method không liên quan nhau hoặc file dài hàng nghìn dòng.

## Detailed Answer (EN)
SRP states that each class or module should have only one reason to change — responsible for only a single piece of functionality.\
\
TypeScript example:\
```typescript\
// Violates SRP — 1 class does 3 things\
class UserService {\
  handleLogin() { /* ... */ }\
  log(msg: string) { /* ... */ }\
  sendEmail() { /* ... */ }\
}\
// Correct — split responsibilities\
class UserService { handleLogin() { /* ... */ } }\
class Logger { log(msg: string) { /* ... */ } }\
class EmailService { sendEmail() { /* ... */ } }\
```\
\
Benefits: easier testing, simpler maintenance. Classic violation: a class with many unrelated methods, or a file thousands of lines long.

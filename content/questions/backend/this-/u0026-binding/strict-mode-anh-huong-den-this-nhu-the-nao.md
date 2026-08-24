---
id: strict-mode-anh-huong-den-this-nhu-the-nao
position: backend
technology: this-\u0026-binding
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
strict mode ảnh hưởng đến this như thế nào?

## Question (EN)
How does strict mode affect this?

## Đáp án chi tiết (VI)
Trong strict mode, this ở hàm thông thường là undefined thay vì global object (window/global). Điều này giúp phát hiện lỗi khi vô tình gọi hàm như function thay vì method.\
\
```javascript\
function foo() { console.log(this); }\
foo();                    // non-strict: Window (browser)\
'use strict';\
function bar() { console.log(this); }\
bar();                    // strict: undefined\
```\
\
Kích hoạt bằng 'use strict'; ở đầu file hoặc hàm. ES modules tự động bật strict mode.

## Detailed Answer (EN)
In strict mode, this inside a regular function is undefined instead of the global object (window/global). This helps catch bugs when a function is accidentally called as a function rather than a method.\
\
```javascript\
function foo() { console.log(this); }\
foo();                    // non-strict: Window (browser)\
'use strict';\
function bar() { console.log(this); }\
bar();                    // strict: undefined\
```\
\
Enable with 'use strict'; at the top of a file or function. ES modules automatically enable strict mode.

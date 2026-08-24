---
id: su-khac-biet-giua-function-declaration-va-function-expression-trong-hoisting-la
position: backend
technology: hoisting-\u0026-closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa function declaration và function expression trong hoisting là gì?

## Question (EN)
What is the difference between function declarations and function expressions in terms of hoisting?

## Đáp án chi tiết (VI)
Function declaration được hoisted hoàn toàn (cả tên và thân hàm), có thể gọi trước khi khai báo. Function expression chỉ hoisted phần khai báo biến (với var là undefined), không thể gọi trước khi gán.\
\
```javascript\
// Function declaration — OK\
fn(); // hoạt động\
function fn() { return \\"hoisted\\"; }\
\
// Function expression với var — TypeError\
fnExpr(); // TypeError: fnExpr is not a function\
var fnExpr = function() { return \\"not hoisted\\"; };\
\
// const/let expression — ReferenceError\
arrowFn(); // ReferenceError (TDZ)\
const arrowFn = () =\u003e \\"also not hoisted\\";\
```

## Detailed Answer (EN)
Function declarations are fully hoisted (both name and body), so they can be called before they are declared. Function expressions only hoist the variable declaration (undefined with var), and cannot be called before assignment.\
\
```javascript\
// Function declaration — OK\
fn(); // works fine\
function fn() { return \\"hoisted\\"; }\
\
// Function expression with var — TypeError\
fnExpr(); // TypeError: fnExpr is not a function\
var fnExpr = function() { return \\"not hoisted\\"; };\
\
// const/let expression — ReferenceError\
arrowFn(); // ReferenceError (TDZ)\
const arrowFn = () =\u003e \\"also not hoisted\\";\
```

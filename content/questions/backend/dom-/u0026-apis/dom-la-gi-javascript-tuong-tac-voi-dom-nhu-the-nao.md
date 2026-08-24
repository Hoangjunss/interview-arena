---
id: dom-la-gi-javascript-tuong-tac-voi-dom-nhu-the-nao
position: backend
technology: dom-\u0026-apis
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DOM là gì? JavaScript tương tác với DOM như thế nào?

## Question (EN)
What is the DOM? How does JavaScript interact with it?

## Đáp án chi tiết (VI)
DOM (Document Object Model) là biểu diễn dạng cây của HTML document, mỗi element là một node. JavaScript tương tác qua document API: querySelector, createElement, appendChild, setAttribute... DOM manipulation là synchronous, thay đổi DOM ngay lập tức reflect trên page.\
\
```javascript\
const el = document.querySelector('.title');\
el.textContent = 'Hello';\
\
const btn = document.createElement('button');\
btn.innerHTML = 'Click me';\
document.body.appendChild(btn);\
```

## Detailed Answer (EN)
The DOM (Document Object Model) is a tree representation of an HTML document where each element is a node. JavaScript interacts via the document API: querySelector, createElement, appendChild, setAttribute... DOM manipulation is synchronous; changes are immediately reflected on the page.\
\
```javascript\
const el = document.querySelector('.title');\
el.textContent = 'Hello';\
\
const btn = document.createElement('button');\
btn.innerHTML = 'Click me';\
document.body.appendChild(btn);\
```

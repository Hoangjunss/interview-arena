---
id: su-khac-biet-giua-textcontent-innertext-va-innerhtml-la-gi
position: backend
technology: dom-\u0026-apis
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa textContent, innerText và innerHTML là gì?

## Question (EN)
What is the difference between textContent, innerText, and innerHTML?

## Đáp án chi tiết (VI)
innerHTML: get/set HTML markup (nguy cơ XSS nếu set user input). textContent: get/set text của tất cả nodes kể cả ẩn, không trigger reflow. innerText: chỉ lấy text hiển thị (aware of CSS), trigger reflow để tính style. textContent nhanh nhất và an toàn nhất cho text manipulation.\
\
```javascript\
// XSS risk:\
el.innerHTML = userInput; // NGUY HIỂM nếu userInput không được sanitize\
// An toàn:\
el.textContent = userInput; // luôn render as text, không execute HTML\
```

## Detailed Answer (EN)
innerHTML: gets/sets HTML markup (XSS risk if setting user input). textContent: gets/sets text of all nodes including hidden ones, does not trigger reflow. innerText: only gets visible text (CSS-aware), triggers reflow to compute styles. textContent is the fastest and safest for text manipulation.\
\
```javascript\
// XSS risk:\
el.innerHTML = userInput; // DANGEROUS if userInput is not sanitized\
// Safe:\
el.textContent = userInput; // always renders as text, never executes HTML\
```

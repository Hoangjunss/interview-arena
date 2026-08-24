---
id: template-literals-la-gi-co-nhung-tinh-nang-gi
position: backend
technology: es6+
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template literals là gì? Có những tính năng gì?

## Question (EN)
What are template literals? What features do they have?

## Đáp án chi tiết (VI)
Template literals dùng backtick thay dấu nháy, hỗ trợ: interpolation ${expression}, multi-line strings, tagged templates. Tagged templates là function nhận template strings và expressions làm arguments.\
\
```javascript\
// Interpolation + multi-line:\
const msg = `Hello ${name},\
Welcome!`;\
\
// Tagged template (styled-components pattern):\
function css(strings, ...values) {\
  return strings.reduce((acc, str, i) =\u003e acc + str + (values[i] ?? ''), '');\
}\
const color = 'blue';\
const style = css`color: ${color}; font-size: 16px;`;\
```

## Detailed Answer (EN)
Template literals use backticks instead of quotes, supporting: interpolation ${expression}, multi-line strings, and tagged templates. Tagged templates are functions that receive template strings and expressions as arguments.\
\
```javascript\
// Interpolation + multi-line:\
const msg = `Hello ${name},\
Welcome!`;\
\
// Tagged template (styled-components pattern):\
function css(strings, ...values) {\
  return strings.reduce((acc, str, i) =\u003e acc + str + (values[i] ?? ''), '');\
}\
const color = 'blue';\
const style = css`color: ${color}; font-size: 16px;`;\
```

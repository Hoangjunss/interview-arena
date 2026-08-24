---
id: prototype-pollution-la-gi-va-cach-phong-tranh
position: backend
technology: prototype
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prototype pollution là gì và cách phòng tránh?

## Question (EN)
What is prototype pollution and how do you prevent it?

## Đáp án chi tiết (VI)
Prototype pollution là lỗ hổng khi dữ liệu người dùng ghi vào `Object.prototype` (qua key như `__proto__`, `constructor`, `prototype`). Hậu quả: nhiều object khác trong app bị ảnh hưởng ngoài ý muốn.\
\
```javascript\
// Attack vector (lodash merge vulnerability - CVE-2018-3721):\
const malicious = JSON.parse('{\\"__proto__\\":{\\"isAdmin\\":true}}');\
Object.assign({}, malicious); // pollutes Object.prototype\
console.log({}.isAdmin); // true — bất kỳ object nào cũng bị ảnh hưởng!\
```\
\
Cách phòng tránh: chặn key nguy hiểm, không deep-merge input mù quáng, dùng `Object.create(null)` hoặc `Map`, cập nhật thư viện merge lên bản an toàn.

## Detailed Answer (EN)
Prototype pollution is a vulnerability where user input writes into `Object.prototype` (via keys like `__proto__`, `constructor`, or `prototype`). Impact: many unrelated objects in your app are unexpectedly affected.\
\
```javascript\
// Attack vector (lodash merge vulnerability - CVE-2018-3721):\
const malicious = JSON.parse('{\\"__proto__\\":{\\"isAdmin\\":true}}');\
Object.assign({}, malicious); // pollutes Object.prototype\
console.log({}.isAdmin); // true — any object is now affected!\
```\
\
Prevention: block dangerous keys, avoid blindly deep-merging untrusted input, use `Object.create(null)` or `Map`, keep merge libraries patched.

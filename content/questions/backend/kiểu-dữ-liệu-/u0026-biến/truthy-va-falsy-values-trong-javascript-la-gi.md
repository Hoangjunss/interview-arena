---
id: truthy-va-falsy-values-trong-javascript-la-gi
position: backend
technology: kiểu-dữ-liệu-\u0026-biến
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truthy và falsy values trong JavaScript là gì?

## Question (EN)
What are truthy and falsy values in JavaScript?

## Đáp án chi tiết (VI)
Falsy là giá trị bị coi là `false` khi đưa vào ngữ cảnh boolean. Có **đúng 8 giá trị**, học thuộc là đủ:\
\
```javascript\
false, 0, -0, 0n, '', null, undefined, NaN\
```\
\
Mọi thứ còn lại đều truthy — kể cả những thứ trông như \\"rỗng\\":\
\
```javascript\
Boolean('0')      // true — chuỗi có nội dung\
Boolean('false')  // true\
Boolean([])       // true — mảng rỗng vẫn là object\
Boolean({})       // true\
Boolean(-1)       // true\
Boolean(' ')      // true — khoảng trắng vẫn là ký tự\
```\
\
**Lưu ý — số 0 và chuỗi rỗng là giá trị hợp lệ:**\
\
```javascript\
function render(count) {\
  if (!count) return 'Chưa có'   // count = 0 rơi vào đây, dù 0 là đáp án đúng\
}\
\
// đúng hơn:\
if (count == null) return 'Chưa có'\
```\
\
Cùng lý do đó, `||` để đặt giá trị mặc định là nguy hiểm:\
\
```javascript\
const limit = input || 20    // input = 0 → thành 20, SAI\
const limit = input ?? 20    // chỉ thay khi null/undefined, ĐÚNG\
```\
\
**Chốt:** `??` và `?.` sinh ra chính là để xử lý nhóm bẫy này — nêu được liên hệ đó là điểm cộng.

## Detailed Answer (EN)
$80

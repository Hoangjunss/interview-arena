---
id: tai-sao-array-foreach-async-item-await-save-item-khong-cho-xong-sua-the-nao
position: backend
technology: loops
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `array.forEach(async (item) =\u003e await save(item))` không chờ xong? Sửa thế nào?

## Question (EN)
Why does `array.forEach(async (item) =\u003e await save(item))` not wait? How do you fix it?

## Đáp án chi tiết (VI)
Vì `forEach` **bỏ qua giá trị trả về** của callback. Callback `async` trả về một Promise, `forEach` vứt đi và chạy tiếp phần tử kế — nên vòng lặp kết thúc ngay lập tức trong khi các `save()` vẫn đang chạy.\
\
```js\
async function run(items) {\
  items.forEach(async (item) =\u003e {\
    await save(item)      // Promise bị forEach bỏ qua\
  })\
  console.log('done')     // in ra trước khi save() nào hoàn tất\
}\
```\
\
Hai cách sửa, chọn theo yêu cầu:\
\
```js\
// 1. Tuần tự — cần thứ tự, hoặc sợ quá tải backend\
for (const item of items) {\
  await save(item)\
}\
\
// 2. Song song — độc lập nhau, muốn nhanh\
await Promise.all(items.map((item) =\u003e save(item)))\
```\
\
Hai nhược điểm khác của bản `forEach`: lỗi trong callback không bị `try/catch` bên ngoài bắt (thành unhandled rejection), và không kiểm soát được số request bắn cùng lúc. Cùng lý do này, `map` với callback `async` cho ra **mảng Promise** chứ không phải mảng giá trị — luôn cần `Promise.all` bọc ngoài.

## Detailed Answer (EN)
$82

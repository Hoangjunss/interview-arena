---
id: java-la-pass-by-value-hay-pass-by-reference
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Java là pass-by-value hay pass-by-reference?

## Question (EN)
Is Java pass-by-value or pass-by-reference?

## Đáp án chi tiết (VI)
Java **luôn luôn pass-by-value** — không có pass-by-reference. Điểm gây nhầm: với object, thứ được copy là **giá trị của reference** (địa chỉ trỏ đến object), không phải bản thân object.\
\
```java\
void change(User u) {\
  u.setName(\\"B\\");      // OK: ảnh hưởng caller — u trỏ CÙNG object\
  u = new User(\\"C\\");   // BAD: không ảnh hưởng — chỉ gán lại BẢN COPY của reference\
}\
```\
\
**Hệ quả:**\
- Method **sửa được trạng thái** object của caller (vì 2 reference cùng trỏ 1 object).\
- Method **không đổi được biến của caller trỏ đi đâu** — gán lại tham số chỉ đổi bản copy → viết `swap(a, b)` đổi chỗ 2 object là bất khả thi trong Java.\
- Với **primitive**, copy giá trị thuần → mọi thay đổi trong method đều không ảnh hưởng caller.\
\
**Trả lời gọn:** \\"Java pass-by-value; với object thì value đó là reference — nên mutate được object, nhưng không reassign được biến của caller.\\"

## Detailed Answer (EN)
Java is **always pass-by-value** — there is no pass-by-reference. The confusing part: for objects, what gets copied is the **value of the reference** (the address pointing to the object), not the object itself.\
\
```java\
void change(User u) {\
  u.setName(\\"B\\");      // OK: affects the caller — u points to the SAME object\
  u = new User(\\"C\\");   // BAD: no effect — only reassigns the COPY of the reference\
}\
```\
\
**Consequences:**\
- A method **can mutate the state** of the caller's object (both references point to one object).\
- A method **cannot change where the caller's variable points** — reassigning the parameter only changes the copy → writing `swap(a, b)` that exchanges two objects is impossible in Java.\
- For **primitives**, the plain value is copied → nothing inside the method affects the caller.\
\
**Concise answer:** \\"Java is pass-by-value; for objects the value is the reference — so you can mutate the object, but not reassign the caller's variable.\\"

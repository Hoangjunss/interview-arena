---
id: primitive-type-va-reference-type-trong-javascript-khac-nhau-the-nao
position: backend
technology: js-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Primitive type và reference type trong JavaScript khác nhau thế nào?

## Question (EN)
How do primitive types and reference types differ in JavaScript?

## Đáp án chi tiết (VI)
JavaScript có 7 kiểu **primitive** (`string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`) và kiểu **reference** — object, array, function.\
\
- **Copy**: gán primitive sang biến khác là **sao chép giá trị** — hai biến độc lập. Gán object chỉ **sao chép tham chiếu** — hai biến trỏ **cùng một object**.\
- **So sánh**: primitive so sánh theo **giá trị** (`'a' === 'a'` → `true`); object so sánh theo **danh tính tham chiếu** (`{} === {}` → `false` vì là hai object khác nhau).\
- **Mutation**: primitive **bất biến** — mọi thao tác chuỗi/số tạo giá trị mới. Object sửa qua một tham chiếu thì **mọi tham chiếu khác đều thấy thay đổi** — nguồn bug thường gặp khi truyền object vào hàm rồi hàm sửa lên nó.\
\
Hệ quả thực tế: gán biến không bao giờ tạo bản sao độc lập — muốn tách hẳn phải clone (xem câu shallow vs deep copy).

## Detailed Answer (EN)
JavaScript has 7 **primitive** types (`string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`) and **reference** types — objects, arrays, functions.\
\
- **Copying**: assigning a primitive to another variable **copies the value** — the two variables are independent. Assigning an object only **copies the reference** — both variables point to the **same object**.\
- **Comparison**: primitives compare by **value** (`'a' === 'a'` → `true`); objects compare by **reference identity** (`{} === {}` → `false` since they are two distinct objects).\
- **Mutation**: primitives are **immutable** — every string/number operation produces a new value. Mutating an object through one reference is **visible through every other reference** — a common source of bugs when a function mutates an object passed to it.\
\
Practical consequence: assignment never yields an independent copy — to fully detach you must clone (see the shallow vs deep copy question).

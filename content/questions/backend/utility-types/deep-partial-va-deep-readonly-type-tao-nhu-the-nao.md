---
id: deep-partial-va-deep-readonly-type-tao-nhu-the-nao
position: backend
technology: utility-types
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deep partial và deep readonly type tạo như thế nào?

## Question (EN)
How do you create deep partial and deep readonly types?

## Đáp án chi tiết (VI)
DeepPartial được tạo bằng recursive conditional type: nếu T là object thì áp dụng optional modifier cho mỗi key và đệ quy vào giá trị con, ngược lại trả về T nguyên bản (type `DeepPartial\u003cT\u003e` = T extends object ? { [K in keyof T]?: `DeepPartial\u003cT[K]\u003e` } : T). DeepReadonly cần xử lý riêng trường hợp array bằng cách kiểm tra T extends (infer U)[] trước để chuyển thành `ReadonlyArray\u003cDeepReadonly\u003cU\u003e\u003e`, sau đó mới xử lý object bằng cách thêm readonly modifier cho tất cả keys và đệ quy tiếp. Việc tách riêng logic cho array là bắt buộc vì array có semantics khác với object thông thường, nếu không sẽ mất đi các array methods và tính đúng đắn của kiểu dữ liệu.

## Detailed Answer (EN)
DeepPartial is created using a recursive conditional type: if T is an object, apply the optional modifier to each key and recurse into child values, otherwise return T as-is (`type DeepPartial\u003cT\u003e = T extends object ? { [K in keyof T]?: DeepPartial\u003cT[K]\u003e } : T`). DeepReadonly needs to handle arrays separately by checking `T extends (infer U)[]` first to convert them to `ReadonlyArray\u003cDeepReadonly\u003cU\u003e\u003e`, then handle objects by adding readonly to all keys and recursing. Separating array logic is mandatory because arrays have different semantics from plain objects, otherwise array methods and type correctness would be lost.

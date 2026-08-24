---
id: formarray-dung-khi-nao
position: backend
technology: forms
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FormArray dùng khi nào?

## Question (EN)
When should you use FormArray?

## Đáp án chi tiết (VI)
`FormArray` dùng khi số lượng control động, ví dụ nhiều số điện thoại, danh sách địa chỉ, line items trong invoice hoặc survey questions.\
\
Ví dụ thêm phone control động:\
```typescript\
const phones = new FormArray([\
  new FormControl(\\"\\

## Detailed Answer (EN)
`FormArray` is used when the number of controls is dynamic, such as multiple phone numbers, addresses, invoice line items or survey questions.\
\
Example dynamic phone controls:\
```typescript\
const phones = new FormArray([\
  new FormControl(\\"\\

---
id: trong-fmt-errorf-w-khac-v-ra-sao-khi-nao-nen-boc-loi
position: backend
technology: errors
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong `fmt.Errorf`, `%w` khác `%v` ra sao? Khi nào nên bọc lỗi?

## Question (EN)
In `fmt.Errorf`, how does `%w` differ from `%v`? When should you wrap an error?

## Đáp án chi tiết (VI)
Cả hai đều in ra chuỗi giống nhau, nhưng `%w` **giữ lại lỗi gốc** trong chuỗi unwrap, còn `%v` chỉ ghép chuỗi và **cắt đứt** liên kết.\
\
```go\
var ErrNotFound = errors.New(\\"not found\\")\
\
e1 := fmt.Errorf(\\"load user %d: %w\\

## Detailed Answer (EN)
Both print the same text, but `%w` **keeps the original error** in the unwrap chain while `%v` merely concatenates strings and **breaks** the link.\
\
```go\
var ErrNotFound = errors.New(\\"not found\\")\
\
e1 := fmt.Errorf(\\"load user %d: %w\\

---
id: arrays-aslist-tra-ve-list-loai-gi-vi-sao-goi-add-lai-nem-unsupportedoperationexc
position: backend
technology: list
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Arrays.asList()` trả về List loại gì? Vì sao gọi `add()` lại ném `UnsupportedOperationException`?

## Question (EN)
What kind of List does `Arrays.asList()` return? Why does calling `add()` throw `UnsupportedOperationException`?

## Đáp án chi tiết (VI)
`Arrays.asList()` trả về một **view kích thước cố định** (`java.util.Arrays$ArrayList`, không phải `java.util.ArrayList`) **bọc quanh mảng gốc**. Nó không có chỗ để chứa thêm phần tử nên `add`/`remove`/`clear` ném `UnsupportedOperationException`.\
\
```java\
List\u003cString\u003e view = Arrays.asList(\\"a\\

## Detailed Answer (EN)
`Arrays.asList()` returns a **fixed-size view** (`java.util.Arrays$ArrayList`, not `java.util.ArrayList`) **backed by the original array**. There is nowhere to put extra elements, so `add`/`remove`/`clear` throw `UnsupportedOperationException`.\
\
```java\
List\u003cString\u003e view = Arrays.asList(\\"a\\

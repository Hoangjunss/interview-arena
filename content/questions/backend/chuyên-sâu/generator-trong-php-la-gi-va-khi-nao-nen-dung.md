---
id: generator-trong-php-la-gi-va-khi-nao-nen-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generator trong PHP là gì và khi nào nên dùng?

## Question (EN)
What are generators in PHP and when do you use them?

## Đáp án chi tiết (VI)
Generator là hàm dùng `yield` để trả về nhiều giá trị từng cái một mà không cần tải tất cả vào bộ nhớ. Khai báo: `function numbers() { yield 1; yield 2; yield 3; }` rồi lặp với `foreach(numbers() as $num)`. Tiết kiệm bộ nhớ cho dataset lớn: xử lý file với `yield` đọc từng dòng thay vì tải toàn bộ file. Dùng `yield $key =\u003e $value` cho cặp key-value. Generator chậm hơn cho dataset nhỏ nhưng không thể thiếu khi xử lý file lớn, streams hay chuỗi vô hạn.

## Detailed Answer (EN)
Generators are functions that use `yield` to return multiple values one at a time without loading all into memory. Define with `function numbers() { yield 1; yield 2; yield 3; }` then iterate with `foreach(numbers() as $num)`. Memory-efficient for large datasets: processing a file with `yield` reads one line at a time instead of loading entire file. Use `yield $key =\u003e $value` for key-value pairs. Generators are slower for small datasets but essential for processing large files, streams, or infinite sequences.

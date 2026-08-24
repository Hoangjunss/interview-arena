---
id: quiz-php-use-capture-by-value-doan-code-sau-in-ra-gi
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
use capture by value — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 11 — closure luôn đọc giá trị mới nhất của biến bên ngoài
- [ ] Lỗi vì $count bị gán lại sau khi closure đã capture
- [ ] Warning "undefined variable" vì closure không thấy $count
- [x] 1 — closure chụp giá trị lúc định nghĩa

## Giải thích (VI)
In ra 1 . use ($count) capture by value tại thời điểm định nghĩa closure — bên trong giữ bản sao 0, nên $count = 10 sau đó không ảnh hưởng. Muốn closure thấy giá trị mới nhất (và sửa được biến gốc), dùng use (&$count) — capture by reference.

### Giải thích các phương án:
- **11 — closure luôn đọc giá trị mới nhất của biến bên ngoài** (Sai): Đó là hành vi của JS/Python; PHP với use ($count) chụp giá trị tại thời điểm định nghĩa.
- **Lỗi vì $count bị gán lại sau khi closure đã capture** (Sai): Gán lại biến ngoài là hợp lệ và không ảnh hưởng bản đã capture.
- **Warning "undefined variable" vì closure không thấy $count** (Sai): use ($count) đã đưa biến vào scope của closure một cách tường minh.
- **1 — closure chụp giá trị lúc định nghĩa** (Đúng): use mặc định capture by value: closure giữ bản sao $count = 0, gán $count = 10 sau đó không ảnh hưởng.

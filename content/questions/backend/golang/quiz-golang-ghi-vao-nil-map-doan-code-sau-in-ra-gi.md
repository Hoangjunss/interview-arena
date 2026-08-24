---
id: quiz-golang-ghi-vao-nil-map-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ghi vào nil map — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] map[a:1]
- [ ] panic: index out of range [0] with length 0
- [x] panic: assignment to entry in nil map
- [ ] panic: runtime error: invalid memory address

## Giải thích (VI)
Panic: assignment to entry in nil map. var m map[string]int chỉ tạo map nil; đọc map nil trả zero value an toàn, nhưng GHI thì panic. Phải make(map[string]int) hoặc dùng literal trước khi gán. (FREE)

### Giải thích các phương án:
- **map[a:1]** (Sai): Sai — map chưa được make, việc gán khoá gây panic trước khi tới Println.
- **panic: index out of range [0] with length 0** (Sai): Sai — chương trình panic ở dòng gán, không chạy tới Println.
- **panic: assignment to entry in nil map** (Đúng): var m map[string]int tạo map nil (chưa cấp phát). GHI vào map nil gây panic runtime; phải khởi tạo bằng make hoặc literal trước.
- **panic: runtime error: invalid memory address** (Sai): Sai — ĐỌC từ map nil trả về zero value một cách an toàn, nhưng GHI vào map nil thì panic.

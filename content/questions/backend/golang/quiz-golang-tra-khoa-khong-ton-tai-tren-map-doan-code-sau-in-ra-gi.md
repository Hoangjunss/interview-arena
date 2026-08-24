---
id: quiz-golang-tra-khoa-khong-ton-tai-tren-map-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tra khoá không tồn tại trên map — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 1 false
- [x] 0 false
- [ ] panic: key not found
- [ ] nil false

## Giải thích (VI)
In 0 false. Tra khoá không tồn tại trên map không panic: dạng comma-ok v, ok := m["b"] trả về zero value của kiểu value (int → 0) và ok == false. Nếu bỏ ok, chỉ nhận 0 — không phân biệt được "khoá vắng" với "khoá có giá trị 0". (FREE)

### Giải thích các phương án:
- **1 false** (Sai): Sai — khoá tra là "b" (không tồn tại), nên v nhận zero value 0 chứ không phải giá trị của khoá "a".
- **0 false** (Đúng): Tra khoá không tồn tại KHÔNG panic: v nhận zero value của kiểu value (int → 0), còn ok là false báo khoá vắng mặt. Đây là dạng comma-ok.
- **panic: key not found** (Sai): Sai — Go không panic khi đọc khoá vắng mặt (khác dict của Python vốn ném KeyError); nó trả zero value cùng cờ ok == false.
- **nil false** (Sai): Sai — kiểu value là int nên zero value là 0, không phải nil; nil chỉ dành cho pointer, slice, map, channel, func, interface.

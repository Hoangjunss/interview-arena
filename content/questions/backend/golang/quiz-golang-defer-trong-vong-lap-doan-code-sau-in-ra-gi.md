---
id: quiz-golang-defer-trong-vong-lap-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
defer trong vòng lặp — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] 2 1 0
- [ ] 0 1 2
- [ ] 3 3 3
- [ ] (không in gì)

## Giải thích (VI)
In 2 1 0. defer chạy theo LIFO; đối số i được đánh giá NGAY lúc gặp defer nên ba lời gọi lưu sẵn 0, 1, 2, rồi in ngược khi main return. (FREE)

### Giải thích các phương án:
- **2 1 0** (Đúng): defer xếp theo LIFO; đối số i được ĐÁNH GIÁ NGAY khi gặp defer nên lưu 0,1,2, rồi in ngược thứ tự lúc hàm return.
- **0 1 2** (Sai): Sai — defer chạy theo LIFO (ngăn xếp), không phải FIFO.
- **3 3 3** (Sai): Sai — đối số của defer được chốt theo giá trị tại thời điểm gặp defer, không đọc i sau khi vòng lặp kết thúc.
- **(không in gì)** (Sai): Sai — cả ba defer đều chạy khi main return bình thường.

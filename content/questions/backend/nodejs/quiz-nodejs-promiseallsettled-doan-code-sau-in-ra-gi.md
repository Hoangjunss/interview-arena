---
id: quiz-nodejs-promiseallsettled-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Promise.allSettled — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] Uncaught Error: boom
- [x] fulfilled rejected
- [ ] fulfilled
- [ ] rejected fulfilled

## Giải thích (VI)
In fulfilled rồi rejected. Khác Promise.all (fail-fast), Promise.allSettled chờ mọi promise kết thúc và LUÔN resolve với mảng { status, value | reason } theo đúng thứ tự đầu vào — rejection được gói vào kết quả thay vì làm cả nhóm thất bại. (FREE)

### Giải thích các phương án:
- **Uncaught Error: boom** (Sai): Sai — hiểu nhầm với Promise.all. allSettled không bao giờ reject vì promise con thất bại; nó gói cả rejection vào kết quả { status: "rejected", reason }, và việc truyền promise vào allSettled cũng đã gắn handler nên không có unhandled rejection.
- **fulfilled rejected** (Đúng): allSettled chờ MỌI promise kết thúc (thành công lẫn thất bại) và luôn resolve với mảng kết quả theo đúng thứ tự đầu vào: phần tử đầu fulfilled, phần tử sau rejected.
- **fulfilled** (Sai): Sai — allSettled không loại bỏ promise thất bại khỏi kết quả; mảng trả về luôn đủ phần tử tương ứng từng promise đầu vào.
- **rejected fulfilled** (Sai): Sai — thứ tự phần tử trong mảng kết quả LUÔN theo thứ tự mảng đầu vào, không phụ thuộc promise nào settle trước.

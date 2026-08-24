---
id: quiz-thuat-toan-ctdl-hai-vong-lap-long-nhau-moi-vong-chay-het-mang-n-phan-tu-co-do-phuc-tap-thoi-gian
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai vòng lặp lồng nhau, mỗi vòng chạy hết mảng n phần tử, có độ phức tạp thời gian là gì?

## Đáp án trắc nghiệm
- [x] O(n²)
- [ ] O(n)
- [ ] O(n log n)
- [ ] O(2n)

## Giải thích (VI)
O(n²). Vòng ngoài chạy n lần, mỗi lần vòng trong chạy thêm n lần, nên check được gọi n × n lần. Dấu hiệu nhận biết: vòng lặp lồng mà cả hai đều phụ thuộc n. Nếu vòng trong chạy số lần cố định thì vẫn là O(n).

### Giải thích các phương án:
- **O(n²)** (Đúng): Thân trong chạy n lần cho mỗi trong n lần của vòng ngoài.
- **O(n)** (Sai): O(n) là khi mỗi phần tử được chạm đúng một lần.
- **O(n log n)** (Sai): Dạng này xuất hiện khi có chia đôi, ở đây không có.
- **O(2n)** (Sai): Đó là hai vòng nối tiếp nhau, và hằng số 2 cũng bị bỏ.

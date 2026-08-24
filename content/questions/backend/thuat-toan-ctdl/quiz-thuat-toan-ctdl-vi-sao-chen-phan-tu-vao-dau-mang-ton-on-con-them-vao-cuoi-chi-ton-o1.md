---
id: quiz-thuat-toan-ctdl-vi-sao-chen-phan-tu-vao-dau-mang-ton-on-con-them-vao-cuoi-chi-ton-o1
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao chèn phần tử vào đầu mảng tốn O(n) còn thêm vào cuối chỉ tốn O(1)?

## Đáp án trắc nghiệm
- [ ] Vì thêm vào cuối được cache và ghi sau
- [ ] Vì phần đầu mảng nằm ở vùng nhớ chỉ đọc
- [ ] Vì chèn đầu phải tính lại hàm băm của mảng
- [x] Chèn đầu buộc mọi phần tử sau dịch một ô

## Giải thích (VI)
Mảng lưu các phần tử liền nhau và truy cập bằng công thức địa chỉ = gốc + chỉ số × kích thước. Chèn vào đầu làm chỉ số của mọi phần tử cũ tăng 1, nên phải dịch n phần tử. Thêm vào cuối chỉ ghi một ô còn trống nên là O(1) khấu hao.

### Giải thích các phương án:
- **Vì thêm vào cuối được cache và ghi sau** (Sai): Không có cơ chế ghi đệm ở đây, thêm cuối rẻ vì không phải dịch gì cả.
- **Vì phần đầu mảng nằm ở vùng nhớ chỉ đọc** (Sai): Không có phân vùng nào như vậy; mảng là một khối nhớ liền nhau bình thường.
- **Vì chèn đầu phải tính lại hàm băm của mảng** (Sai): Mảng không dùng hàm băm, truy cập bằng phép tính địa chỉ từ chỉ số.
- **Chèn đầu buộc mọi phần tử sau dịch một ô** (Đúng): Chỉ số của tất cả phần tử cũ đều tăng 1 nên phải ghi lại n ô.

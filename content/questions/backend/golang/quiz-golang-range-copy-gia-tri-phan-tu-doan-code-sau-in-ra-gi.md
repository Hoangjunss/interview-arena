---
id: quiz-golang-range-copy-gia-tri-phan-tu-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
range copy giá trị phần tử — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] [10 20 30] — v tham chiếu trực tiếp tới phần tử trong slice
- [ ] Lỗi biên dịch vì biến v được gán nhưng kết quả không được sử dụng
- [x] [1 2 3] — v là bản copy của từng phần tử, sửa v không ảnh hưởng slice
- [ ] [10 2 3] — chỉ phần tử đầu tiên bị thay đổi

## Giải thích (VI)
In ra [1 2 3]. range copy GIÁ TRỊ của từng phần tử vào biến loop v — sửa v là sửa bản copy, slice gốc không đổi. Muốn thay đổi phần tử thật, gán qua index: for i := range nums { nums[i] *= 10 }. Quy tắc này áp dụng cho cả struct trong slice: sửa field của v cũng vô tác dụng.

### Giải thích các phương án:
- **[10 20 30] — v tham chiếu trực tiếp tới phần tử trong slice** (Sai): Đây là misconception phổ biến nhất về range: biến loop KHÔNG phải reference; Go luôn copy giá trị phần tử vào v.
- **Lỗi biên dịch vì biến v được gán nhưng kết quả không được sử dụng** (Sai): Go chỉ báo lỗi "declared and not used" khi biến hoàn toàn không được đụng tới; v *= 10 vừa đọc vừa ghi v nên được tính là đã sử dụng.
- **[1 2 3] — v là bản copy của từng phần tử, sửa v không ảnh hưởng slice** (Đúng): range copy giá trị phần tử vào biến loop; v *= 10 chỉ nhân bản copy. Muốn sửa phần tử thật phải gán qua index: nums[i] *= 10.
- **[10 2 3] — chỉ phần tử đầu tiên bị thay đổi** (Sai): Không có cơ chế nào chỉ sửa phần tử đầu; mọi vòng lặp đều thao tác trên bản copy nên slice gốc giữ nguyên toàn bộ.

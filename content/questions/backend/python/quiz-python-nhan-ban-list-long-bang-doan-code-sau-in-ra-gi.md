---
id: quiz-python-nhan-ban-list-long-bang-doan-code-sau-in-ra-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhân bản list lồng bằng * — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] [[1, 0, 0], [0, 0, 0]]
- [ ] TypeError
- [ ] [[1, 1, 0], [0, 0, 0]]
- [x] [[1, 0, 0], [1, 0, 0]]

## Giải thích (VI)
In ra [[1, 0, 0], [1, 0, 0]]. Biểu thức [[0] * 3] * 2 KHÔNG tạo hai hàng độc lập — nó nhân bản THAM CHIẾU tới cùng một list con. Cả hai hàng của grid trỏ tới cùng một object, nên gán grid[0][0] = 1 cũng làm hàng thứ hai đổi theo. Đây là bẫy khi tạo ma trận bằng phép nhân list.

### Giải thích các phương án:
- **[[1, 0, 0], [0, 0, 0]]** (Sai): Sai — hai hàng KHÔNG độc lập; * 2 chỉ nhân bản tham chiếu chứ không tạo list con mới.
- **TypeError** (Sai): Không có lỗi — cú pháp nhân list và gán đều hợp lệ.
- **[[1, 1, 0], [0, 0, 0]]** (Sai): Sai — chỉ có phần tử [0][0] được gán bằng 1, không lan sang phần tử khác trong hàng.
- **[[1, 0, 0], [1, 0, 0]]** (Đúng): [x] * 2 sao chép THAM CHIẾU của cùng một list con; hai hàng là cùng một object nên sửa hàng này thì hàng kia đổi theo.

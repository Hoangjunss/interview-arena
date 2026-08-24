---
id: quiz-thuat-toan-ctdl-voi-moi-phan-tu-cua-mang-tim-phan-tu-lon-hon-dau-tien-dung-sau-no-cach-nao-cho-o
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với mỗi phần tử của mảng, tìm phần tử lớn hơn đầu tiên đứng sau nó. Cách nào cho O(n)?

## Đáp án trắc nghiệm
- [ ] Dựng mảng tổng tiền tố rồi so sánh các hiệu liên tiếp
- [x] Duyệt một lượt với stack giữ các chỉ số giảm dần
- [ ] Với mỗi phần tử, quét tiếp phần đuôi cho tới khi gặp số lớn hơn
- [ ] Sắp xếp mảng giảm dần rồi ghép lại theo chỉ số gốc

## Giải thích (VI)
Stack đơn điệu. Duyệt trái sang phải, giữ stack các chỉ số có giá trị giảm dần; khi gặp phần tử lớn hơn đỉnh thì lấy đỉnh ra và ghi nhận phần tử hiện tại là đáp án của nó, lặp tới khi đỉnh lớn hơn. Mỗi chỉ số vào ra một lần nên O(n) .

### Giải thích các phương án:
- **Dựng mảng tổng tiền tố rồi so sánh các hiệu liên tiếp** (Sai): Tổng tiền tố trả lời truy vấn tổng, không trả lời câu hỏi về thứ tự lớn nhỏ.
- **Duyệt một lượt với stack giữ các chỉ số giảm dần** (Đúng): Mỗi chỉ số được đẩy vào và lấy ra tối đa một lần nên tổng là tuyến tính.
- **Với mỗi phần tử, quét tiếp phần đuôi cho tới khi gặp số lớn hơn** (Sai): Cách trực tiếp này đúng nhưng là O(n²) ở trường hợp xấu nhất.
- **Sắp xếp mảng giảm dần rồi ghép lại theo chỉ số gốc** (Sai): Sắp xếp phá vỡ quan hệ vị trí mà đề bài dựa vào.

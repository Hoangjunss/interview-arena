---
id: quiz-thuat-toan-ctdl-cho-mang-so-va-mot-gia-tri-dich-tim-hai-phan-tu-co-tong-bang-dich-cach-nao-chay
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cho mảng số và một giá trị đích, tìm hai phần tử có tổng bằng đích. Cách nào chạy một lượt O(n)?

## Đáp án trắc nghiệm
- [ ] Sắp xếp mảng rồi dùng hai con trỏ từ hai đầu
- [ ] Chia đôi mảng rồi giải đệ quy từng nửa
- [ ] Duyệt mọi cặp chỉ số và kiểm tra tổng của từng cặp
- [x] Duyệt một lượt, tra hash map tìm phần bù của số

## Giải thích (VI)
Duyệt một lượt và dùng hash map làm bộ nhớ: tại mỗi phần tử x, kiểm tra target − x đã nằm trong map chưa; nếu rồi thì trả về cặp, nếu chưa thì lưu x cùng chỉ số của nó. Mỗi phần tử tra và ghi đúng một lần nên tổng là O(n) thời gian, O(n) bộ nhớ .

### Giải thích các phương án:
- **Sắp xếp mảng rồi dùng hai con trỏ từ hai đầu** (Sai): Đây là O(n log n) do phải sắp xếp, và làm mất chỉ số gốc.
- **Chia đôi mảng rồi giải đệ quy từng nửa** (Sai): Cặp cần tìm có thể nằm ở hai nửa khác nhau nên chia đôi không tách được bài toán.
- **Duyệt mọi cặp chỉ số và kiểm tra tổng của từng cặp** (Sai): Cách này đúng nhưng là O(n²), không phải một lượt.
- **Duyệt một lượt, tra hash map tìm phần bù của số** (Đúng): Mỗi phần tử được tra và lưu đúng một lần nên tổng chi phí là O(n).

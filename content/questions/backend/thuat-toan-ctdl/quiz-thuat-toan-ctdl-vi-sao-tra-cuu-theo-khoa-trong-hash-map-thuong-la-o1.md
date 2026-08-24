---
id: quiz-thuat-toan-ctdl-vi-sao-tra-cuu-theo-khoa-trong-hash-map-thuong-la-o1
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao tra cứu theo khoá trong hash map thường là O(1)?

## Đáp án trắc nghiệm
- [ ] Các khoá được giữ sắp xếp nên tìm kiếm nhị phân rất nhanh
- [ ] Vì mỗi ô chỉ chứa đúng một khoá nên không bao giờ phải so sánh
- [ ] Toàn bộ bảng được nạp sẵn vào cache của CPU
- [x] Hàm băm biến khoá thành chỉ số ô để truy cập thẳng

## Giải thích (VI)
Hàm băm biến khoá thành một số, lấy dư theo số ô là ra vị trí cần tìm, nên không phải duyệt phần tử nào. Chi phí gồm tính băm cộng vài phép so sánh trong ô, không phụ thuộc n. Đây là trung bình , không phải bảo đảm cho mọi trường hợp.

### Giải thích các phương án:
- **Các khoá được giữ sắp xếp nên tìm kiếm nhị phân rất nhanh** (Sai): Hash map không giữ thứ tự; tìm kiếm nhị phân là O(log n) và cần dữ liệu đã sắp xếp.
- **Vì mỗi ô chỉ chứa đúng một khoá nên không bao giờ phải so sánh** (Sai): Va chạm vẫn xảy ra và vẫn phải so sánh khoá để xác nhận.
- **Toàn bộ bảng được nạp sẵn vào cache của CPU** (Sai): Bảng lớn không nằm vừa bộ nhớ đệm, và đó cũng không phải lý do về độ phức tạp.
- **Hàm băm biến khoá thành chỉ số ô để truy cập thẳng** (Đúng): Băm cho vị trí trực tiếp nên chi phí không phụ thuộc số phần tử.

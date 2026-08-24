---
id: quiz-elasticsearch-ket-qua-dem-so-gia-tri-khac-nhau-trong-gop-nhom-co-dac-diem-gi
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kết quả đếm số giá trị khác nhau trong gộp nhóm có đặc điểm gì?

## Đáp án trắc nghiệm
- [ ] Luôn chính xác tuyệt đối trên mọi kích thước dữ liệu
- [x] Là số xấp xỉ, có sai số khi lượng giá trị lớn
- [ ] Chỉ tính trên các tài liệu ở trang kết quả hiện tại
- [ ] Chỉ đếm được trên trường kiểu số

## Giải thích (VI)
Đó là số xấp xỉ : thuật toán ước lượng đổi độ chính xác lấy bộ nhớ cố định. Với lượng giá trị nhỏ thì kết quả thường đúng, còn khi lượng giá trị lớn thì có sai số vài phần trăm.

### Giải thích các phương án:
- **Luôn chính xác tuyệt đối trên mọi kích thước dữ liệu** (Sai): Chính xác tuyệt đối sẽ đòi hỏi bộ nhớ tăng theo số giá trị khác nhau.
- **Là số xấp xỉ, có sai số khi lượng giá trị lớn** (Đúng): Nó dùng thuật toán ước lượng để tiết kiệm bộ nhớ thay vì giữ toàn bộ giá trị đã gặp.
- **Chỉ tính trên các tài liệu ở trang kết quả hiện tại** (Sai): Gộp nhóm tính trên toàn bộ tập kết quả khớp điều kiện.
- **Chỉ đếm được trên trường kiểu số** (Sai): Nó áp dụng được cho cả trường chuỗi dạng keyword.

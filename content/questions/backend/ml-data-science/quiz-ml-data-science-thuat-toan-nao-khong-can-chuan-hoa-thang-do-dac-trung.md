---
id: quiz-ml-data-science-thuat-toan-nao-khong-can-chuan-hoa-thang-do-dac-trung
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thuật toán nào KHÔNG cần chuẩn hóa thang đo đặc trưng?

## Đáp án trắc nghiệm
- [ ] Hồi quy tuyến tính huấn luyện bằng gradient descent
- [ ] k láng giềng gần nhất
- [x] Cây quyết định và các mô hình dựa trên cây
- [ ] Máy vector hỗ trợ với nhân RBF

## Giải thích (VI)
Mô hình dựa trên cây (cây quyết định, rừng ngẫu nhiên, gradient boosting): chúng chia dữ liệu theo ngưỡng trên từng cột riêng lẻ nên đơn vị đo không ảnh hưởng. Các thuật toán dựa trên khoảng cách hoặc dùng gradient descent thì bắt buộc phải chuẩn hóa.

### Giải thích các phương án:
- **Hồi quy tuyến tính huấn luyện bằng gradient descent** (Sai): Thang đo lệch làm quá trình hội tụ chậm và không ổn định.
- **k láng giềng gần nhất** (Sai): Dựa hoàn toàn vào khoảng cách nên rất nhạy với thang đo.
- **Cây quyết định và các mô hình dựa trên cây** (Đúng): Cây chia theo ngưỡng trên từng cột nên không so sánh khoảng cách giữa các cột.
- **Máy vector hỗ trợ với nhân RBF** (Sai): Cũng dựa trên khoảng cách giữa các điểm.

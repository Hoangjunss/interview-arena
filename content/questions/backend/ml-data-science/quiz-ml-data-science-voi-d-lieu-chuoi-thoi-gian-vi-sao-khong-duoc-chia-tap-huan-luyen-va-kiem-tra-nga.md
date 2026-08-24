---
id: quiz-ml-data-science-voi-d-lieu-chuoi-thoi-gian-vi-sao-khong-duoc-chia-tap-huan-luyen-va-kiem-tra-nga
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với dữ liệu chuỗi thời gian, vì sao không được chia tập huấn luyện và kiểm tra ngẫu nhiên?

## Đáp án trắc nghiệm
- [x] Vì mô hình sẽ được nhìn thấy tương lai khi huấn luyện
- [ ] Vì chuỗi thời gian luôn có quá ít dữ liệu
- [ ] Vì thuật toán không xử lý được dữ liệu dạng ngày tháng
- [ ] Vì chia ngẫu nhiên làm mất giá trị của các cột khác

## Giải thích (VI)
Vì chia ngẫu nhiên cho mô hình nhìn thấy tương lai : nó học từ dữ liệu tháng 12 rồi được đánh giá trên tháng 6. Điểm đánh giá sẽ cao giả tạo, vì lúc dùng thật mô hình chỉ có dữ liệu quá khứ. Phải chia theo mốc thời gian .

### Giải thích các phương án:
- **Vì mô hình sẽ được nhìn thấy tương lai khi huấn luyện** (Đúng): Chia ngẫu nhiên đưa dữ liệu sau vào tập huấn luyện để dự đoán dữ liệu trước.
- **Vì chuỗi thời gian luôn có quá ít dữ liệu** (Sai): Lượng dữ liệu không phải lý do.
- **Vì thuật toán không xử lý được dữ liệu dạng ngày tháng** (Sai): Ngày tháng chuyển thành đặc trưng số được bình thường.
- **Vì chia ngẫu nhiên làm mất giá trị của các cột khác** (Sai): Các cột khác không bị ảnh hưởng bởi cách chia.

---
id: quiz-ml-data-science-vi-sao-bien-danh-muc-nhu-thanh-pho-thuong-duoc-ma-hoa-one-hot-thay-vi-gan-so-thu
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao biến danh mục như "thành phố" thường được mã hóa one-hot thay vì gán số thứ tự?

## Đáp án trắc nghiệm
- [ ] Vì one-hot làm giảm số chiều của dữ liệu
- [x] Vì gán số tạo ra quan hệ thứ tự không có thật
- [ ] Vì one-hot luôn cho kết quả tốt hơn ở mọi mô hình
- [ ] Vì mô hình không xử lý được dữ liệu dạng số

## Giải thích (VI)
Vì gán số tạo ra quan hệ thứ tự và khoảng cách giả : mô hình tuyến tính sẽ hiểu Hà Nội = 1, Đà Nẵng = 2, TP.HCM = 3 nghĩa là TP.HCM "lớn gấp ba" Hà Nội. One-hot tách thành các cột nhị phân độc lập nên không tạo ra thứ tự nào.

### Giải thích các phương án:
- **Vì one-hot làm giảm số chiều của dữ liệu** (Sai): Ngược lại, one-hot làm tăng số chiều.
- **Vì gán số tạo ra quan hệ thứ tự không có thật** (Đúng): Mô hình sẽ hiểu thành phố 3 lớn hơn thành phố 1, điều vô nghĩa.
- **Vì one-hot luôn cho kết quả tốt hơn ở mọi mô hình** (Sai): Với cây quyết định, mã hóa số đôi khi vẫn dùng được.
- **Vì mô hình không xử lý được dữ liệu dạng số** (Sai): Mô hình chỉ xử lý được dạng số; vấn đề là ý nghĩa của con số.

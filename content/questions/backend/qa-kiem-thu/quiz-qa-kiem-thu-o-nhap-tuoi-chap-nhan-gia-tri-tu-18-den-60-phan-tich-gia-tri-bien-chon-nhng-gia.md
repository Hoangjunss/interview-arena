---
id: quiz-qa-kiem-thu-o-nhap-tuoi-chap-nhan-gia-tri-tu-18-den-60-phan-tich-gia-tri-bien-chon-nhng-gia
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ô nhập tuổi chấp nhận giá trị từ 18 đến 60. Phân tích giá trị biên chọn những giá trị nào?

## Đáp án trắc nghiệm
- [ ] 17, 19, 59, 61
- [ ] 0, 18, 60, 100
- [x] 17, 18, 60, 61
- [ ] 18, 30, 60

## Giải thích (VI)
17, 18, 60, 61 — mỗi biên lấy giá trị ngay trong và ngay ngoài. Lý do: lỗi lập trình hay gặp nhất ở đây là dùng nhầm > với >=, và chỉ những giá trị sát biên mới lộ ra kiểu lỗi đó.

### Giải thích các phương án:
- **17, 19, 59, 61** (Sai): Thiếu chính hai giá trị biên 18 và 60.
- **0, 18, 60, 100** (Sai): 0 và 100 nằm xa biên nên không kiểm được đúng chỗ hay sai.
- **17, 18, 60, 61** (Đúng): Hai biên, mỗi biên lấy giá trị ngay trong và ngay ngoài vùng hợp lệ.
- **18, 30, 60** (Sai): Thiếu giá trị ngoài biên nên không phát hiện được lỗi so sánh sai dấu.

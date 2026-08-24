---
id: quiz-iq-tu-duy-logic-co-hai-qua-trung-giong-nhau-va-toa-nha-100-tang-can-tim-tang-thap-nhat-lam-trung
position: backend
technology: iq-tu-duy-logic
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có hai quả trứng giống nhau và tòa nhà 100 tầng. Cần tìm tầng thấp nhất làm trứng vỡ. Số lần thả tối thiểu trong trường hợp xấu nhất là bao nhiêu?

## Đáp án trắc nghiệm
- [ ] 7 lần
- [ ] 20 lần
- [ ] 10 lần
- [x] 14 lần

## Giải thích (VI)
Đáp án 14 lần . Thả quả đầu ở tầng 14, rồi 27 (14+13), 39 (27+12)... mỗi bước nhảy giảm một tầng. Nếu vỡ thì dùng quả thứ hai dò từng tầng trong khoảng vừa vượt qua, và tổng số lần luôn không quá 14.

### Giải thích các phương án:
- **7 lần** (Sai): Đây là kết quả tìm kiếm nhị phân, nhưng chỉ khả thi khi có nhiều trứng.
- **20 lần** (Sai): Nhiều hơn mức cần thiết của chiến lược tối ưu.
- **10 lần** (Sai): Chiến lược chia 10 tầng một bước cho trường hợp xấu nhất là 19 lần.
- **14 lần** (Đúng): Thả ở các tầng 14, 27, 39... để tổng bước nhảy giảm dần phủ đủ 100 tầng.

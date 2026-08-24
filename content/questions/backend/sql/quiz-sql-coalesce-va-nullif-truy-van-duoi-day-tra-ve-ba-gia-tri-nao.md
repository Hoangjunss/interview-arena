---
id: quiz-sql-coalesce-va-nullif-truy-van-duoi-day-tra-ve-ba-gia-tri-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
COALESCE và NULLIF — truy vấn dưới đây trả về ba giá trị nào?

## Đáp án trắc nghiệm
- [x] a = 'fallback', b = NULL, c = 10
- [ ] a = NULL, b = NULL, c = 10 — COALESCE trả NULL ngay khi gặp tham số đầu tiên là NULL
- [ ] Lỗi cú pháp — COALESCE chỉ nhận đúng hai tham số
- [ ] a = 'fallback', b = 'same', c = NULL — NULLIF trả NULL khi hai tham số khác nhau

## Giải thích (VI)
Kết quả: a = 'fallback', b = NULL, c = 10. COALESCE duyệt tham số trái sang phải, trả giá trị khác NULL đầu tiên — hai NULL đầu bị bỏ qua. NULLIF(x, y) trả NULL nếu x bằng y, ngược lại trả x: 'same' = 'same' nên b là NULL; 10 khác 20 nên c là 10. Hai hàm là cặp ngược nhau: COALESCE thay NULL bằng giá trị, NULLIF biến giá trị thành NULL.

### Giải thích các phương án:
- **a = 'fallback', b = NULL, c = 10** (Đúng): Đúng: COALESCE duyệt trái sang phải tới giá trị khác NULL đầu tiên; NULLIF('same','same') bằng nhau nên NULL, NULLIF(10,20) khác nhau nên trả 10. COALESCE trả tham số khác NULL đầu tiên; NULLIF trả NULL khi hai tham số bằng nhau và trả tham số thứ nhất khi khác.
- **a = NULL, b = NULL, c = 10 — COALESCE trả NULL ngay khi gặp tham số đầu tiên là NULL** (Sai): COALESCE làm điều ngược lại: bỏ qua các tham số NULL và trả giá trị khác NULL đầu tiên tìm thấy — đó chính là mục đích tồn tại của hàm.
- **Lỗi cú pháp — COALESCE chỉ nhận đúng hai tham số** (Sai): COALESCE nhận số lượng tham số tùy ý và duyệt lần lượt — dạng nhiều tầng fallback (COALESCE(a, b, c, ...)) là cách dùng phổ biến.
- **a = 'fallback', b = 'same', c = NULL — NULLIF trả NULL khi hai tham số khác nhau** (Sai): Ngược định nghĩa: NULLIF(x, y) trả NULL khi x bằng y (dùng để "vô hiệu hóa" một giá trị cụ thể), còn khác nhau thì trả x.

---
id: quiz-thuat-toan-ctdl-them-phan-tu-vao-cuoi-mang-dong-duoc-noi-la-o1-khau-hao-dieu-do-nghia-la-gi
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thêm phần tử vào cuối mảng động được nói là "O(1) khấu hao". Điều đó nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Mọi lần thêm đều tốn đúng một số bước cố định
- [x] Một số lần thêm tốn O(n) nhưng trung bình vẫn là O(1)
- [ ] Trình thu gom rác trả lại chi phí cấp phát về sau
- [ ] Chi phí là O(1) khi mảng còn trống và O(n) khi mảng đã đầy

## Giải thích (VI)
Khi hết chỗ, mảng cấp phát vùng nhớ mới gấp đôi rồi sao chép, tốn O(n). Nhưng lần nhân đôi tiếp theo chỉ xảy ra sau n lần thêm rẻ nữa, nên tổng chi phí của n lần thêm là O(n), trung bình O(1) mỗi lần. Bảo đảm này áp dụng cho chuỗi thao tác, không cho từng lần riêng lẻ.

### Giải thích các phương án:
- **Mọi lần thêm đều tốn đúng một số bước cố định** (Sai): Nếu đúng vậy thì đã là O(1) trường hợp xấu nhất, không cần chữ khấu hao.
- **Một số lần thêm tốn O(n) nhưng trung bình vẫn là O(1)** (Đúng): Lần cấp phát lại tốn O(n) được chia đều cho n lần thêm rẻ trước đó.
- **Trình thu gom rác trả lại chi phí cấp phát về sau** (Sai): Khấu hao là lập luận đếm thao tác, không liên quan tới thu gom rác.
- **Chi phí là O(1) khi mảng còn trống và O(n) khi mảng đã đầy** (Sai): Mô tả đúng hai trường hợp nhưng không nói được vì sao trung bình vẫn là hằng số.

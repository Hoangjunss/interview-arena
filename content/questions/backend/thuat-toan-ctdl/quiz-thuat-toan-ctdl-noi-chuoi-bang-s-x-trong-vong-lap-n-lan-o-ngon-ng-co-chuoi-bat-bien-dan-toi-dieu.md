---
id: quiz-thuat-toan-ctdl-noi-chuoi-bang-s-x-trong-vong-lap-n-lan-o-ngon-ng-co-chuoi-bat-bien-dan-toi-dieu
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nối chuỗi bằng s += x trong vòng lặp n lần ở ngôn ngữ có chuỗi bất biến dẫn tới điều gì?

## Đáp án trắc nghiệm
- [ ] Chi phí O(n) vì trình biên dịch luôn gộp các phép nối lại
- [ ] Rò rỉ bộ nhớ vì các chuỗi trung gian không được giải phóng
- [x] Chi phí O(n²) do mỗi lần nối tạo chuỗi mới và sao chép lại
- [ ] Lỗi thời gian chạy khi chuỗi vượt quá dung lượng ban đầu

## Giải thích (VI)
O(n²). Chuỗi bất biến nghĩa là s += x tạo ra một chuỗi mới và sao chép lại toàn bộ nội dung cũ, nên lần thứ i tốn khoảng i bước. Tổng 1 + 2 + … + n là O(n²). Cách đúng là gom các mảnh vào mảng rồi join một lần, hoặc dùng bộ dựng chuỗi của ngôn ngữ.

### Giải thích các phương án:
- **Chi phí O(n) vì trình biên dịch luôn gộp các phép nối lại** (Sai): Một số runtime có tối ưu cục bộ nhưng không có bảo đảm nào cho vòng lặp động.
- **Rò rỉ bộ nhớ vì các chuỗi trung gian không được giải phóng** (Sai): Chuỗi trung gian vẫn được thu gom, vấn đề là thời gian chứ không phải rò rỉ.
- **Chi phí O(n²) do mỗi lần nối tạo chuỗi mới và sao chép lại** (Đúng): Chuỗi bất biến nên mỗi phép nối phải sao chép toàn bộ nội dung cũ.
- **Lỗi thời gian chạy khi chuỗi vượt quá dung lượng ban đầu** (Sai): Không có lỗi, chỉ có chi phí sao chép tăng dần.

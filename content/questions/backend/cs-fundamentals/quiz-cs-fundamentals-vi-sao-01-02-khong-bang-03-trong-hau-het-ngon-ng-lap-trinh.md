---
id: quiz-cs-fundamentals-vi-sao-01-02-khong-bang-03-trong-hau-het-ngon-ng-lap-trinh
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao 0.1 + 0.2 không bằng 0.3 trong hầu hết ngôn ngữ lập trình?

## Đáp án trắc nghiệm
- [ ] Vì mỗi CPU làm tròn theo cách khác nhau nên kết quả không nhất quán giữa máy
- [ ] Vì kiểu double chỉ có 15 chữ số thập phân nên tràn ở chữ số thứ 16
- [x] Vì 0.1 và 0.2 là phân số tuần hoàn vô hạn trong cơ số 2 nên phải làm tròn
- [ ] Vì phép cộng số thực được thực hiện xấp xỉ để chạy nhanh hơn

## Giải thích (VI)
Vì số thực dùng chuẩn IEEE-754 biểu diễn ở cơ số 2. Trong cơ số 2, 0.1 và 0.2 là phân số tuần hoàn vô hạn nên phải cắt và làm tròn khi lưu vào 64 bit. Tổng hai giá trị đã làm tròn ra 0.30000000000000004, khác với giá trị double gần 0.3 nhất.

### Giải thích các phương án:
- **Vì mỗi CPU làm tròn theo cách khác nhau nên kết quả không nhất quán giữa máy** (Sai): IEEE-754 quy định chặt chẽ quy tắc làm tròn, nên mọi CPU tuân chuẩn đều cho cùng một kết quả cho cùng phép toán.
- **Vì kiểu double chỉ có 15 chữ số thập phân nên tràn ở chữ số thứ 16** (Sai): Đây là hệ quả chứ không phải nguyên nhân; kể cả với số chữ số lớn hơn, 0.1 vẫn không biểu diễn chính xác được trong cơ số 2.
- **Vì 0.1 và 0.2 là phân số tuần hoàn vô hạn trong cơ số 2 nên phải làm tròn** (Đúng): Giống 1/3 không viết hết được trong hệ thập phân, 1/10 không viết hết được trong hệ nhị phân; sai số làm tròn của hai toán hạng cộng lại lệch khỏi 0.3.
- **Vì phép cộng số thực được thực hiện xấp xỉ để chạy nhanh hơn** (Sai): Bản thân phép cộng cho kết quả đúng nhất có thể trong khuôn dạng; sai lệch đã nằm sẵn trong cách biểu diễn hai toán hạng.

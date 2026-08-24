---
id: quiz-csharp-nhng-phat-bieu-nao-duoi-day-dung-ve-cac-modifier-ref-out-in-khi-truyen-tham-so-t
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào dưới đây đúng về các modifier ref, out, in khi truyền tham số trong C#? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] Biến truyền vào tham số ref phải được gán giá trị trước khi gọi method
- [ ] Biến truyền vào tham số out phải được khởi tạo trước khi truyền
- [ ] Cả ba modifier đều copy giá trị vào method như truyền tham trị, chỉ khác nhau ở quy ước đặt tên

## Giải thích (VI)
Cả ba đều truyền tham số theo tham chiếu (không copy), khác nhau ở hướng dữ liệu: ref — vào lẫn ra, biến phải gán trước khi gọi; out — chỉ ra, biến không cần gán trước nhưng method bắt buộc gán trước khi return (mẫu Try...); in — chỉ vào, tham chiếu chỉ đọc, method không được gán lại — tối ưu cho struct lớn muốn tránh copy.

### Giải thích các phương án:
- **Biến truyền vào tham số ref phải được gán giá trị trước khi gọi method** (Đúng): Đúng — ref cho phép method đọc lẫn ghi, nên compiler bắt buộc biến phải definitely assigned trước lời gọi.
- **Biến truyền vào tham số out phải được khởi tạo trước khi truyền** (Sai): Sai — khác với ref, biến cho out KHÔNG cần gán trước (int.TryParse(s, out int value) khai báo biến ngay tại chỗ); method chịu trách nhiệm gán.
- **Cả ba modifier đều copy giá trị vào method như truyền tham trị, chỉ khác nhau ở quy ước đặt tên** (Sai): Sai — điểm chung của cả ba là truyền THEO THAM CHIẾU (không copy); chúng khác nhau ở hướng dữ liệu và ràng buộc gán, không phải tên gọi.

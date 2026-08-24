---
id: quiz-golang-khai-bao-cac-bien-sau-ma-khong-gan-gia-tri-chung-chua-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo các biến sau mà không gán giá trị, chúng chứa gì?

## Đáp án trắc nghiệm
- [ ] Cả ba đều là undefined cho tới khi được gán
- [ ] Chúng chứa giá trị rác ngẫu nhiên trong bộ nhớ như C
- [x] s là chuỗi rỗng "", n là 0, p là nil — mỗi kiểu có zero value xác định
- [ ] Chương trình không biên dịch được vì biến bắt buộc phải khởi tạo

## Giải thích (VI)
Mọi biến Go khai báo không khởi tạo đều nhận zero value của kiểu: s = "", n = 0, p = nil. Quy tắc chung: số → 0, string → chuỗi rỗng, bool → false, pointer/slice/map/channel/interface → nil, struct → zero value của từng field. Không có undefined hay giá trị rác như C.

### Giải thích các phương án:
- **Cả ba đều là undefined cho tới khi được gán** (Sai): undefined là khái niệm của JavaScript; Go không có trạng thái "chưa xác định" — biến luôn mang zero value hợp lệ ngay khi khai báo.
- **Chúng chứa giá trị rác ngẫu nhiên trong bộ nhớ như C** (Sai): Khác C, Go luôn khởi tạo bộ nhớ về zero value — không bao giờ có giá trị rác, đây là một lựa chọn thiết kế an toàn của ngôn ngữ.
- **s là chuỗi rỗng "", n là 0, p là nil — mỗi kiểu có zero value xác định** (Đúng): Go đảm bảo mọi biến khai báo không khởi tạo đều nhận zero value của kiểu: string → "", số → 0, bool → false, pointer/slice/map/channel/interface → nil.
- **Chương trình không biên dịch được vì biến bắt buộc phải khởi tạo** (Sai): Khai báo var không kèm giá trị là hợp lệ và rất phổ biến; Go chỉ báo lỗi biên dịch khi biến được khai báo mà KHÔNG được sử dụng.

---
id: quiz-testing-test-mot-api-endpoint-nen-kiem-nhng-gi-ngoai-truong-hop-thanh-cong
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test một API endpoint nên kiểm những gì ngoài trường hợp thành công?

## Đáp án trắc nghiệm
- [ ] Thứ tự các truy vấn SQL mà endpoint thực hiện
- [ ] Hiệu năng của endpoint đó khi có nhiều request đồng thời
- [x] Thiếu quyền, dữ liệu sai định dạng, tài nguyên không tồn tại
- [ ] Cấu trúc chính xác của toàn bộ response trả về

## Giải thích (VI)
Ba nhóm quan trọng nhất: phân quyền (không đăng nhập, đăng nhập nhưng không phải chủ tài nguyên), dữ liệu đầu vào sai (thiếu field, kiểu sai, giá trị ngoài khoảng), và tài nguyên không tồn tại . Đó là nơi lỗ hổng thường nằm.

### Giải thích các phương án:
- **Thứ tự các truy vấn SQL mà endpoint thực hiện** (Sai): Đó là chi tiết cài đặt, test không nên phụ thuộc vào nó.
- **Hiệu năng của endpoint đó khi có nhiều request đồng thời** (Sai): Cần thiết nhưng thuộc load test, không phải test chức năng.
- **Thiếu quyền, dữ liệu sai định dạng, tài nguyên không tồn tại** (Đúng): Đây là các nhánh hay bị bỏ qua nhất và cũng hay có lỗ hổng nhất.
- **Cấu trúc chính xác của toàn bộ response trả về** (Sai): Assert quá chặt vào cấu trúc làm test vỡ mỗi lần thêm field.

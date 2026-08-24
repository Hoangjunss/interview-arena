---
id: quiz-ruby-on-rails-vi-sao-kiem-tra-tinh-duy-nhat-o-tang-model-van-co-the-tao-ra-ban-ghi-trung
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao kiểm tra tính duy nhất ở tầng model vẫn có thể tạo ra bản ghi trùng?

## Đáp án trắc nghiệm
- [ ] Kiểm tra chỉ chạy khi tạo mới, không chạy khi cập nhật
- [ ] Kiểm tra bỏ qua các bản ghi đã bị đánh dấu xoá
- [ ] Kiểm tra không phân biệt chữ hoa và chữ thường
- [x] Hai yêu cầu đồng thời cùng vượt qua bước kiểm tra

## Giải thích (VI)
Vì kiểm tra và ghi là hai bước tách rời : hai yêu cầu đồng thời cùng thấy chưa có bản ghi nào rồi cùng ghi. Muốn chắc chắn phải thêm ràng buộc duy nhất ở cơ sở dữ liệu và bắt lỗi khi vi phạm.

### Giải thích các phương án:
- **Kiểm tra chỉ chạy khi tạo mới, không chạy khi cập nhật** (Sai): Mặc định nó chạy cho cả hai trường hợp.
- **Kiểm tra bỏ qua các bản ghi đã bị đánh dấu xoá** (Sai): Hành vi đó phụ thuộc cách cài đặt xoá mềm chứ không phải nguyên nhân chung.
- **Kiểm tra không phân biệt chữ hoa và chữ thường** (Sai): Đây là chi tiết cấu hình, không phải nguyên nhân của trùng lặp.
- **Hai yêu cầu đồng thời cùng vượt qua bước kiểm tra** (Đúng): Kiểm tra và ghi là hai bước tách rời nên có khe hở giữa chúng.

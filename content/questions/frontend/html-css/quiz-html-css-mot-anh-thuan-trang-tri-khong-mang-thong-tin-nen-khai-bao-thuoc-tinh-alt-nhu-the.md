---
id: quiz-html-css-mot-anh-thuan-trang-tri-khong-mang-thong-tin-nen-khai-bao-thuoc-tinh-alt-nhu-the
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một ảnh thuần trang trí (không mang thông tin) nên khai báo thuộc tính alt như thế nào?

## Đáp án trắc nghiệm
- [x] alt="" (chuỗi rỗng) — để screen reader bỏ qua ảnh hoàn toàn
- [ ] alt="decorative image" để mô tả rõ đây là ảnh trang trí
- [ ] Bỏ hẳn thuộc tính alt
- [ ] Đặt alt bằng tên file, ví dụ alt="banner-01.jpg"

## Giải thích (VI)
Dùng alt="" (chuỗi rỗng, vẫn có thuộc tính). Đây là tín hiệu chuẩn để screen reader bỏ qua ảnh trang trí. Bỏ hẳn alt là sai — screen reader có thể đọc tên file thay thế. Quy tắc 3 trường hợp: ảnh mang thông tin → mô tả ngắn nội dung; ảnh là link → mô tả đích đến; ảnh trang trí → alt="".

### Giải thích các phương án:
- **alt="" (chuỗi rỗng) — để screen reader bỏ qua ảnh hoàn toàn** (Đúng): alt="" là tín hiệu chuẩn báo "ảnh trang trí, không cần đọc"; screen reader sẽ bỏ qua thay vì gây nhiễu.
- **alt="decorative image" để mô tả rõ đây là ảnh trang trí** (Sai): Screen reader sẽ đọc "decorative image" — thông tin vô nghĩa với người nghe; ảnh trang trí cần được bỏ qua, không cần được gọi tên.
- **Bỏ hẳn thuộc tính alt** (Sai): Thiếu alt khiến nhiều screen reader đọc tên file hoặc URL của ảnh — gây nhiễu tệ hơn cả mô tả thừa.
- **Đặt alt bằng tên file, ví dụ alt="banner-01.jpg"** (Sai): Tên file là một trong các lỗi alt phổ biến nhất — không mô tả gì và bị đọc thành chuỗi ký tự khó hiểu.

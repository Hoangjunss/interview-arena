---
id: quiz-frontend-core-mot-man-hinh-lay-d-lieu-tu-api-can-xu-ly-nhng-trang-thai-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một màn hình lấy dữ liệu từ API cần xử lý những trạng thái nào?

## Đáp án trắc nghiệm
- [ ] Gộp rỗng và lỗi làm một vì người dùng đằng nào cũng không thấy dữ liệu
- [ ] Chỉ cần trạng thái đang tải và có dữ liệu; lỗi để trình duyệt tự hiển thị
- [x] Đang tải, có dữ liệu, rỗng và lỗi — mỗi trạng thái một giao diện riêng
- [ ] Không cần trạng thái đang tải nếu API luôn phản hồi dưới 500ms

## Giải thích (VI)
Bốn trạng thái: đang tải (skeleton giữ đúng layout để không nhảy layout), có dữ liệu, rỗng (thành công nhưng danh sách trống — nên có hướng dẫn hoặc nút tạo mới) và lỗi (thông báo hiểu được kèm nút thử lại). Thiếu nhánh rỗng là lỗi hay gặp nhất, khiến người dùng nhìn màn hình trắng mà không hiểu chuyện gì.

### Giải thích các phương án:
- **Gộp rỗng và lỗi làm một vì người dùng đằng nào cũng không thấy dữ liệu** (Sai): Hai tình huống khác nhau: rỗng cần hướng dẫn tạo dữ liệu, lỗi cần nút thử lại.
- **Chỉ cần trạng thái đang tải và có dữ liệu; lỗi để trình duyệt tự hiển thị** (Sai): Lỗi không được xử lý sẽ để lại màn hình trắng hoặc spinner quay mãi.
- **Đang tải, có dữ liệu, rỗng và lỗi — mỗi trạng thái một giao diện riêng** (Đúng): Đúng: bốn trạng thái, và "rỗng" (request thành công nhưng không có bản ghi) khác "lỗi" nên không được gộp — rỗng cần hướng dẫn tạo dữ liệu, lỗi cần nút thử lại.
- **Không cần trạng thái đang tải nếu API luôn phản hồi dưới 500ms** (Sai): Không kiểm soát được mạng của người dùng; luôn phải có trạng thái chờ.

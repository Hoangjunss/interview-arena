---
id: quiz-network-http-khoa-cache-cache-key-o-cdn-quyet-dinh-dieu-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khóa cache (cache key) ở CDN quyết định điều gì?

## Đáp án trắc nghiệm
- [ ] Điểm biên nào của CDN sẽ phục vụ yêu cầu
- [ ] Nội dung có được nén trước khi gửi hay không
- [x] Hai yêu cầu có được coi là giống nhau
- [ ] Thời gian nội dung được giữ trong cache

## Giải thích (VI)
Quyết định hai yêu cầu có được coi là giống nhau hay không. Mặc định thường gồm tên miền, đường dẫn và tham số truy vấn. Thiếu một thành phần quan trọng thì người dùng này nhận nội dung của người kia; thêm thành phần thừa thì tỉ lệ trúng cache tụt.

### Giải thích các phương án:
- **Điểm biên nào của CDN sẽ phục vụ yêu cầu** (Sai): Việc chọn điểm biên do định tuyến mạng quyết định.
- **Nội dung có được nén trước khi gửi hay không** (Sai): Nén do thương lượng header giữa client và máy chủ.
- **Hai yêu cầu có được coi là giống nhau** (Đúng): Khóa quá hẹp gây phục vụ nhầm, quá rộng làm tỉ lệ trúng cache giảm.
- **Thời gian nội dung được giữ trong cache** (Sai): Thời gian do các header cache điều khiển.

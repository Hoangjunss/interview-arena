---
id: quiz-frontend-core-bien-phap-nao-sau-day-khong-thuc-su-giam-rui-ro-xss-o-phia-frontend
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Biện pháp nào sau đây KHÔNG thực sự giảm rủi ro XSS ở phía frontend?

## Đáp án trắc nghiệm
- [ ] Đặt Content-Security-Policy để hạn chế nguồn script được phép chạy
- [ ] Làm sạch bằng thư viện chuyên dụng (ví dụ DOMPurify) trước khi gắn vào DOM
- [x] Chỉ cần validate dữ liệu ở form phía client trước khi gửi lên server
- [ ] Để framework tự escape, tránh innerHTML/dangerouslySetInnerHTML/v-html

## Giải thích (VI)
XSS là việc chèn được script chạy trong ngữ cảnh trang của người dùng. Ba lớp phòng thủ theo thứ tự: để framework escape mặc định và tránh các API render HTML thô; làm sạch bằng DOMPurify khi bắt buộc phải hiển thị HTML người dùng; và đặt CSP để hạn chế script được phép chạy. Validate ở client không phải biện pháp bảo mật vì API vẫn gọi trực tiếp được.

### Giải thích các phương án:
- **Đặt Content-Security-Policy để hạn chế nguồn script được phép chạy** (Sai): Có tác dụng: lớp phòng thủ thứ hai, giảm thiệt hại khi vẫn lọt một lỗ hổng.
- **Làm sạch bằng thư viện chuyên dụng (ví dụ DOMPurify) trước khi gắn vào DOM** (Sai): Có tác dụng, và bắt buộc khi phải render HTML do người dùng nhập — tự viết bộ lọc bằng biểu thức chính quy gần như luôn bỏ sót.
- **Chỉ cần validate dữ liệu ở form phía client trước khi gửi lên server** (Đúng): Đây là chỗ không có tác dụng: người tấn công gọi thẳng API và bỏ qua form; validate phía client chỉ để cải thiện trải nghiệm.
- **Để framework tự escape, tránh innerHTML/dangerouslySetInnerHTML/v-html** (Sai): Có tác dụng: các API bỏ qua escape chính là cửa vào phổ biến nhất, nhất là khi nội dung do người dùng nhập.

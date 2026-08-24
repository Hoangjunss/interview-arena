---
id: quiz-nextjs-dung-nextimage-thay-cho-the-img-mang-lai-loi-ich-chinh-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng next/image thay cho thẻ <img> mang lại lợi ích chính nào?

## Đáp án trắc nghiệm
- [ ] Cho phép dùng ảnh mà không cần biết kích thước, khác với <img>
- [ ] Nén ảnh trong repository để giảm dung lượng khi clone
- [x] Tự đổi định dạng, tạo nhiều kích thước, lazy load, giữ chỗ đúng tỉ lệ
- [ ] Tự tải ảnh lên CDN khi build

## Giải thích (VI)
next/image phục vụ ảnh đã tối ưu: định dạng hiện đại theo trình duyệt, kích thước phù hợp thiết bị, lazy load mặc định, và bắt buộc khai báo kích thước để giữ chỗ trước — trực tiếp cải thiện LCP và CLS trong Core Web Vitals.

### Giải thích các phương án:
- **Cho phép dùng ảnh mà không cần biết kích thước, khác với <img>** (Sai): Ngược lại — next/image YÊU CẦU biết kích thước (hoặc fill) chính là để chống layout shift.
- **Nén ảnh trong repository để giảm dung lượng khi clone** (Sai): Tối ưu diễn ra lúc phục vụ ảnh, không đụng tới file gốc trong repo.
- **Tự đổi định dạng, tạo nhiều kích thước, lazy load, giữ chỗ đúng tỉ lệ** (Đúng): Đây là tập lợi ích chính mà component này cung cấp sẵn. Định dạng hiện đại là WebP/AVIF; việc giữ chỗ tránh layout shift.
- **Tự tải ảnh lên CDN khi build** (Sai): Nó không tự upload; việc tối ưu do server hoặc loader đảm nhiệm.

---
id: quiz-typescript-typescript-la-gi-va-loi-ich-chinh-so-voi-javascript-thuan-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeScript là gì và lợi ích chính so với JavaScript thuần là gì?

## Đáp án trắc nghiệm
- [x] Superset của JavaScript có static typing, compile sang JS — phát hiện lỗi tại compile time và IDE hỗ trợ tốt hơn
- [ ] Một ngôn ngữ hoàn toàn mới thay thế JavaScript, chạy trực tiếp trên browser mà không cần compile
- [ ] Phiên bản JavaScript chạy nhanh hơn vì engine tối ưu được nhờ khai báo kiểu
- [ ] Một thư viện runtime kiểm tra kiểu dữ liệu khi ứng dụng đang chạy để chặn lỗi

## Giải thích (VI)
TypeScript là superset của JavaScript, thêm static typing và compile sang JS. Lợi ích chính: phát hiện lỗi tại compile time thay vì runtime, IDE hỗ trợ tốt hơn (autocomplete, refactoring an toàn), code tự documentation hoá. Hữu ích nhất ở dự án lớn, làm việc theo team và codebase cần maintain lâu dài.

### Giải thích các phương án:
- **Superset của JavaScript có static typing, compile sang JS — phát hiện lỗi tại compile time và IDE hỗ trợ tốt hơn** (Đúng): Đúng ba ý cốt lõi: là superset (mọi code JS hợp lệ đều là TS hợp lệ), thêm hệ thống kiểu tĩnh, và toàn bộ type bị xoá khi compile sang JS.
- **Một ngôn ngữ hoàn toàn mới thay thế JavaScript, chạy trực tiếp trên browser mà không cần compile** (Sai): Browser không hiểu TypeScript — phải compile sang JavaScript. TS cũng không thay thế JS mà mở rộng nó.
- **Phiên bản JavaScript chạy nhanh hơn vì engine tối ưu được nhờ khai báo kiểu** (Sai): Code JS sinh ra từ TS chạy y hệt JS viết tay — kiểu chỉ phục vụ compiler và IDE, không ảnh hưởng hiệu năng runtime.
- **Một thư viện runtime kiểm tra kiểu dữ liệu khi ứng dụng đang chạy để chặn lỗi** (Sai): TypeScript kiểm tra kiểu tại compile time; sau khi compile, mọi thông tin kiểu bị xoá (type erasure) — không có kiểm tra runtime nào.

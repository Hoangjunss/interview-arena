---
id: quiz-ruby-on-rails-them-mot-cot-co-gia-tri-mac-dinh-vao-bang-hang-chuc-trieu-dong-can-chu-y-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thêm một cột có giá trị mặc định vào bảng hàng chục triệu dòng cần chú ý gì?

## Đáp án trắc nghiệm
- [x] Thao tác có thể khoá bảng và làm gián đoạn dịch vụ
- [ ] Dữ liệu cũ bị mất khi thêm cột mới
- [ ] Ứng dụng phải khởi động lại để nhận cột mới
- [ ] Cột mới không được thêm vào tệp lược đồ

## Giải thích (VI)
Trên bảng lớn, thao tác này có thể khoá bảng trong thời gian dài và làm gián đoạn dịch vụ, tuỳ phiên bản cơ sở dữ liệu. Cách an toàn là thêm cột cho phép rỗng trước, ghi dữ liệu theo lô, rồi mới đặt ràng buộc.

### Giải thích các phương án:
- **Thao tác có thể khoá bảng và làm gián đoạn dịch vụ** (Đúng): Trên phiên bản cơ sở dữ liệu cũ, việc ghi giá trị mặc định cho mọi dòng khoá bảng rất lâu.
- **Dữ liệu cũ bị mất khi thêm cột mới** (Sai): Thêm cột không làm mất dữ liệu.
- **Ứng dụng phải khởi động lại để nhận cột mới** (Sai): Đây là chi tiết nhỏ và không phải rủi ro chính.
- **Cột mới không được thêm vào tệp lược đồ** (Sai): Lược đồ vẫn được cập nhật bình thường.

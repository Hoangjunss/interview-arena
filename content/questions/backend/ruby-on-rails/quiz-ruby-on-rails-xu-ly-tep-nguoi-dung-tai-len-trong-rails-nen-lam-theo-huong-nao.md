---
id: quiz-ruby-on-rails-xu-ly-tep-nguoi-dung-tai-len-trong-rails-nen-lam-theo-huong-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý tệp người dùng tải lên trong Rails nên làm theo hướng nào?

## Đáp án trắc nghiệm
- [ ] Xử lý biến đổi ảnh ngay trong thread xử lý yêu cầu
- [ ] Lưu nội dung tệp trong cột nhị phân của cơ sở dữ liệu
- [ ] Lưu trực tiếp vào thư mục của server ứng dụng
- [x] Lưu ở dịch vụ ngoài, biến đổi ở tác vụ nền

## Giải thích (VI)
Lưu ở dịch vụ lưu trữ ngoài và đẩy việc biến đổi như tạo ảnh thu nhỏ sang tác vụ nền . Lưu trên đĩa của server ứng dụng thì tệp mất khi triển khai lại và không dùng chung được giữa nhiều máy.

### Giải thích các phương án:
- **Xử lý biến đổi ảnh ngay trong thread xử lý yêu cầu** (Sai): Người dùng phải chờ lâu và luồng xử lý bị chiếm giữ.
- **Lưu nội dung tệp trong cột nhị phân của cơ sở dữ liệu** (Sai): Làm cơ sở dữ liệu phình to và việc sao lưu trở nên rất nặng.
- **Lưu trực tiếp vào thư mục của server ứng dụng** (Sai): Tệp sẽ mất khi triển khai lại và không dùng chung được giữa nhiều máy chủ.
- **Lưu ở dịch vụ ngoài, biến đổi ở tác vụ nền** (Đúng): Máy chủ ứng dụng không phải nơi giữ tệp, và việc tạo ảnh thu nhỏ quá nặng cho luồng yêu cầu.

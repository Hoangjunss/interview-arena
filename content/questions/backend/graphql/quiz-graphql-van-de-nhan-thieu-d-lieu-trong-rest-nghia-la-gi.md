---
id: quiz-graphql-van-de-nhan-thieu-d-lieu-trong-rest-nghia-la-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vấn đề nhận thiếu dữ liệu trong REST nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Server trả về nhiều trường hơn client cần
- [ ] Client không có quyền truy cập một số trường
- [ ] Phản hồi bị cắt bớt vì vượt giới hạn kích thước
- [x] Một màn hình phải gọi nhiều endpoint rồi ghép lại

## Giải thích (VI)
Nhận thiếu là khi một màn hình phải gọi nhiều endpoint rồi tự ghép dữ liệu, vì mỗi endpoint chỉ trả về một phần. Trên mạng di động, mỗi vòng mạng thêm vào đều làm màn hình chậm rõ rệt.

### Giải thích các phương án:
- **Server trả về nhiều trường hơn client cần** (Sai): Đó là vấn đề nhận thừa, ngược với nhận thiếu.
- **Client không có quyền truy cập một số trường** (Sai): Đó là vấn đề phân quyền.
- **Phản hồi bị cắt bớt vì vượt giới hạn kích thước** (Sai): Đây là chuyện của giới hạn truyền tải, không phải thiết kế API.
- **Một màn hình phải gọi nhiều endpoint rồi ghép lại** (Đúng): Mỗi endpoint chỉ trả về một phần dữ liệu nên client phải đi nhiều vòng mạng.

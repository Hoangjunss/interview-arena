---
id: quiz-system-design-timeout-khi-goi-service-noi-bo-nen-dat-the-nao
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Timeout khi gọi service nội bộ nên đặt thế nào?

## Đáp án trắc nghiệm
- [ ] Càng dài càng tốt để không làm request nào thất bại oan
- [x] Ngắn và tường minh, dựa trên p99 đo được
- [ ] Dùng giá trị mặc định của thư viện HTTP client
- [ ] Bằng đúng timeout của request từ người dùng

## Giải thích (VI)
Đặt tường minh , dựa trên p99 đo được cộng một khoảng dự phòng — không dựa vào mặc định, vì nhiều HTTP client mặc định chờ vô hạn. Không có timeout là nguyên nhân phổ biến nhất của việc lỗi lan từ service này sang service khác.

### Giải thích các phương án:
- **Càng dài càng tốt để không làm request nào thất bại oan** (Sai): Timeout dài giữ tài nguyên bị chiếm và làm lỗi lan sang service gọi.
- **Ngắn và tường minh, dựa trên p99 đo được** (Đúng): Không đặt timeout thì một service chậm sẽ chiếm hết thread của service gọi.
- **Dùng giá trị mặc định của thư viện HTTP client** (Sai): Nhiều client mặc định không có timeout, tức chờ vô hạn.
- **Bằng đúng timeout của request từ người dùng** (Sai): Chuỗi gọi bên trong phải có ngân sách nhỏ hơn tổng ngân sách của request.

---
id: quiz-testing-test-mot-component-nap-d-lieu-bat-dong-bo-cach-cho-dung-la-gi
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test một component nạp dữ liệu bất đồng bộ. Cách chờ đúng là gì?

## Đáp án trắc nghiệm
- [ ] Gọi lại hàm render lần nữa để lấy trạng thái mới
- [x] await waitFor hoặc findBy* tới khi điều kiện thoả
- [ ] Chờ cố định 500ms rồi mới kiểm tra kết quả
- [ ] Đặt phần kiểm tra trong setTimeout để chạy sau một vòng lặp

## Giải thích (VI)
await screen.findByText(...) hoặc await waitFor(() => expect(...)) — chờ tới khi điều kiện thoả , không chờ theo đồng hồ. Nhanh khi máy khoẻ, và không vỡ khi CI chậm hơn máy dev.

### Giải thích các phương án:
- **Gọi lại hàm render lần nữa để lấy trạng thái mới** (Sai): Render lại không làm promise hoàn tất sớm hơn.
- **await waitFor hoặc findBy* tới khi điều kiện thoả** (Đúng): Chờ theo điều kiện nên vừa nhanh khi máy khoẻ vừa không flaky khi máy chậm.
- **Chờ cố định 500ms rồi mới kiểm tra kết quả** (Sai): Chậm khi không cần và vẫn fail trên máy CI chậm hơn.
- **Đặt phần kiểm tra trong setTimeout để chạy sau một vòng lặp** (Sai): Vẫn là chờ theo thời gian, chỉ ngắn hơn nên càng dễ flaky.

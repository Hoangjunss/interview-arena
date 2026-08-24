---
id: quiz-nextjs-nhng-phat-bieu-nao-sau-day-dung-ve-server-component-chon-nhieu-dap-an
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về Server Component? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Server Component dùng được useState và useEffect miễn là component đó async
- [x] Code và thư viện chỉ dùng trong Server Component không đi vào bundle của client

## Giải thích (VI)
Server Component không gửi code xuống client, truy cập được bí mật và database, nhưng không có hook và không xử lý sự kiện. Dữ liệu truyền qua ranh giới sang Client Component phải serialize được — function không qua được, trừ Server Action.

### Giải thích các phương án:
- **Server Component dùng được useState và useEffect miễn là component đó async** (Sai): Hook chỉ tồn tại ở client; async không thay đổi điều đó.
- **Code và thư viện chỉ dùng trong Server Component không đi vào bundle của client** (Đúng): Đây là lợi ích chính về kích thước bundle.

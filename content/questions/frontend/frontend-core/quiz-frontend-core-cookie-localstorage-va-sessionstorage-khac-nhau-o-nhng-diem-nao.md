---
id: quiz-frontend-core-cookie-localstorage-va-sessionstorage-khac-nhau-o-nhng-diem-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cookie, localStorage và sessionStorage khác nhau ở những điểm nào?

## Đáp án trắc nghiệm
- [x] Chỉ cookie tự gửi kèm request; sessionStorage mất khi đóng tab, localStorage thì không
- [ ] Cookie lưu được dữ liệu lớn hơn localStorage nên hợp để cache dữ liệu API
- [ ] localStorage bị xoá khi đóng tab, sessionStorage thì tồn tại vĩnh viễn
- [ ] Cả ba đều tự động gửi kèm mọi request HTTP tới cùng domain nên tương đương nhau về bảo mật

## Giải thích (VI)
Cookie khoảng 4KB, tự gửi kèm request tới cùng domain, đặt được HttpOnly (JavaScript không đọc được), Secure và SameSite. localStorage khoảng 5–10MB, chỉ đọc bằng JavaScript, tồn tại đến khi bị xoá, dùng chung giữa các tab cùng origin. sessionStorage giống localStorage nhưng riêng cho từng tab và mất khi đóng tab.

### Giải thích các phương án:
- **Chỉ cookie tự gửi kèm request; sessionStorage mất khi đóng tab, localStorage thì không** (Đúng): Đúng: khác nhau ở việc có tự gửi kèm request không (chỉ cookie), phạm vi sống (sessionStorage riêng từng tab) và thời gian tồn tại. Cookie còn đặt được HttpOnly nên JavaScript không đọc được, hai storage kia thì luôn đọc được bằng JavaScript.
- **Cookie lưu được dữ liệu lớn hơn localStorage nên hợp để cache dữ liệu API** (Sai): Cookie giới hạn khoảng 4KB và đi kèm mọi request nên càng lớn càng tốn băng thông; localStorage lớn hơn nhiều.
- **localStorage bị xoá khi đóng tab, sessionStorage thì tồn tại vĩnh viễn** (Sai): Đảo ngược: sessionStorage mất khi đóng tab, localStorage tồn tại đến khi bị xoá.
- **Cả ba đều tự động gửi kèm mọi request HTTP tới cùng domain nên tương đương nhau về bảo mật** (Sai): Chỉ cookie được gửi kèm; localStorage/sessionStorage phải tự đọc rồi gắn vào request.

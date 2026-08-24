---
id: quiz-cs-fundamentals-idempotent-trong-thiet-ke-api-nghia-la-gi-va-vi-sao-no-quan-trong
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotent trong thiết kế API nghĩa là gì và vì sao nó quan trọng?

## Đáp án trắc nghiệm
- [x] Gọi nhiều lần cho cùng trạng thái cuối như gọi một lần
- [ ] Request luôn được server xử lý theo đúng thứ tự client gửi đi
- [ ] Request hoàn toàn không làm thay đổi dữ liệu trên server
- [ ] Request luôn trả về cùng một response body cho mọi lần gọi

## Giải thích (VI)
Idempotent nghĩa là thực hiện request N lần cho trạng thái server giống hệt thực hiện 1 lần. GET, PUT, DELETE là idempotent theo chuẩn; POST thì không. Điều này quan trọng vì mạng không tin cậy: khi response bị mất, client chỉ có thể thử lại an toàn nếu thao tác idempotent.

### Giải thích các phương án:
- **Gọi nhiều lần cho cùng trạng thái cuối như gọi một lần** (Đúng): Khi response bị mất, client không biết server đã xử lý hay chưa; thao tác idempotent cho phép thử lại mà không tạo tác dụng phụ trùng lặp.
- **Request luôn được server xử lý theo đúng thứ tự client gửi đi** (Sai): Đó là bảo đảm về thứ tự (ordering), một thuộc tính khác hẳn và không liên quan tới việc lặp lại request có an toàn hay không.
- **Request hoàn toàn không làm thay đổi dữ liệu trên server** (Sai): Đó là định nghĩa của "safe"; idempotent vẫn được phép thay đổi dữ liệu, chỉ cần lần gọi thứ hai không đổi thêm trạng thái nữa.
- **Request luôn trả về cùng một response body cho mọi lần gọi** (Sai): Điều kiện là trạng thái server sau các lần gọi giống nhau, không phải response giống nhau — DELETE lần đầu trả 204 và lần sau trả 404 vẫn là idempotent.

---
id: quiz-spring-boot-trong-spring-security-authentication-va-authorization-khac-nhau-the-nao
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Spring Security, authentication và authorization khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Hai từ chỉ cùng một việc — kiểm tra username/password — chỉ khác cách gọi
- [ ] Authorization xảy ra trước để lọc quyền, sau đó authentication mới xác minh danh tính người dùng
- [ ] Authentication kiểm tra role và scope; authorization kiểm tra mật khẩu và token đăng nhập
- [x] Authentication là "bạn là ai", authorization là "được làm gì"; xác thực trước

## Giải thích (VI)
Authentication ("Bạn là ai?") xác minh danh tính — login mật khẩu, JWT, OAuth. Authorization ("Bạn được phép làm gì?") kiểm tra quyền — role, scope. Authentication luôn xảy ra trước. Trong Spring Security: xác thực dựng Authentication rồi lưu vào SecurityContextHolder; phân quyền đọc từ đó, áp rule theo URL (authorizeHttpRequests) hoặc theo method (@PreAuthorize).

### Giải thích các phương án:
- **Hai từ chỉ cùng một việc — kiểm tra username/password — chỉ khác cách gọi** (Sai): Sai: chúng là hai bước tách biệt; xác thực danh tính khác với quyết định user được phép làm gì.
- **Authorization xảy ra trước để lọc quyền, sau đó authentication mới xác minh danh tính người dùng** (Sai): Sai: không thể kiểm quyền khi chưa biết user là ai; authentication phải đi trước authorization.
- **Authentication kiểm tra role và scope; authorization kiểm tra mật khẩu và token đăng nhập** (Sai): Sai: đảo ngược vai trò — mật khẩu/token thuộc authentication, còn role/scope thuộc authorization.
- **Authentication là "bạn là ai", authorization là "được làm gì"; xác thực trước** (Đúng): Đúng: xác minh danh tính (login, JWT, OAuth) trước, rồi mới kiểm quyền (role, scope) dựa trên danh tính đó.

---
id: quiz-php-tu-php-7-error-va-exception-quan-he-voi-nhau-the-nao
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ PHP 7, Error và Exception quan hệ với nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Exception đã bị thay thế hoàn toàn bằng Error từ PHP 7
- [x] Cả hai cùng implement interface Throwable, catch chung được bằng Throwable
- [ ] Error không thể catch được, chương trình luôn dừng khi gặp
- [ ] Error kế thừa từ Exception nên catch (Exception $e) bắt được cả hai

## Giải thích (VI)
Cả hai là hai nhánh riêng biệt cùng implement interface Throwable. Error đại diện lỗi từ engine (TypeError, ParseError, DivisionByZeroError) — trước PHP 7 là fatal error không bắt được. Exception cho lỗi tầng ứng dụng. catch (Throwable $t) bắt được cả hai; catch (Exception $e) thì không bắt được Error.

### Giải thích các phương án:
- **Exception đã bị thay thế hoàn toàn bằng Error từ PHP 7** (Sai): Exception vẫn là nhánh chuẩn cho lỗi tầng ứng dụng; Error bổ sung chứ không thay thế.
- **Cả hai cùng implement interface Throwable, catch chung được bằng Throwable** (Đúng): Error (lỗi từ engine: TypeError, ParseError...) và Exception (lỗi ứng dụng) là hai nhánh riêng dưới Throwable.
- **Error không thể catch được, chương trình luôn dừng khi gặp** (Sai): Từ PHP 7, Error catch được như exception thường; đó chính là thay đổi lớn so với fatal error cũ.
- **Error kế thừa từ Exception nên catch (Exception $e) bắt được cả hai** (Sai): Hai nhánh tách biệt — catch (Exception $e) không bắt được TypeError hay ValueError.

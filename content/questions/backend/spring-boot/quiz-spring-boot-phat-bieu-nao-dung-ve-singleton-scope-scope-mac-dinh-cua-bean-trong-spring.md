---
id: quiz-spring-boot-phat-bieu-nao-dung-ve-singleton-scope-scope-mac-dinh-cua-bean-trong-spring
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào đúng về singleton scope — scope mặc định của bean trong Spring?

## Đáp án trắc nghiệm
- [x] Đúng một instance dùng chung; nên giữ stateless vì Spring KHÔNG tự lo thread-safe
- [ ] Singleton scope tự động làm bean thread-safe: Spring bọc mỗi method trong khối đồng bộ hoá nên có thể giữ state chung thoải mái
- [ ] Singleton nghĩa là mỗi HTTP request nhận một instance riêng của bean
- [ ] Spring tạo sẵn tất cả bean singleton nhưng mỗi lần inject lại tạo một bản sao mới của instance

## Giải thích (VI)
Singleton là scope mặc định: container tạo đúng một instance và dùng chung ở mọi điểm inject trong ứng dụng. Vì được chia sẻ giữa nhiều thread, bean singleton nên stateless — Spring KHÔNG tự đồng bộ hoá hay làm nó thread-safe. Giữ mutable state trong singleton là nguồn race condition; state theo request thì dùng request scope hoặc biến cục bộ.

### Giải thích các phương án:
- **Đúng một instance dùng chung; nên giữ stateless vì Spring KHÔNG tự lo thread-safe** (Đúng): Đúng: singleton là một instance chung cho toàn ứng dụng, được chia sẻ giữa nhiều thread. An toàn đa luồng là trách nhiệm của bạn, Spring không thêm đồng bộ hoá.
- **Singleton scope tự động làm bean thread-safe: Spring bọc mỗi method trong khối đồng bộ hoá nên có thể giữ state chung thoải mái** (Sai): Sai: Spring không đồng bộ hoá gì cả; giữ mutable state trong singleton dùng bởi nhiều thread là nguồn race condition kinh điển.
- **Singleton nghĩa là mỗi HTTP request nhận một instance riêng của bean** (Sai): Sai: một instance per request là request scope; singleton là một instance duy nhất cho cả app.
- **Spring tạo sẵn tất cả bean singleton nhưng mỗi lần inject lại tạo một bản sao mới của instance** (Sai): Sai: mọi điểm inject nhận cùng một instance chung — đó chính là ý nghĩa của singleton.

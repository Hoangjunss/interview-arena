---
id: quiz-spring-boot-processall-goi-processone-nam-trong-cung-class-moi-processone-co-chay-trong-tran
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
processAll() gọi processOne() nằm trong cùng class. Mỗi processOne() có chạy trong transaction riêng như @Transactional mong đợi không?

## Đáp án trắc nghiệm
- [ ] Lỗi khởi động — không được đặt @Transactional trên method được gọi nội bộ trong cùng class
- [x] Không — gọi this.processOne() không qua AOP proxy nên @Transactional bị bỏ qua
- [ ] Có — @Transactional gắn trực tiếp vào method nên luôn có hiệu lực bất kể được gọi từ đâu
- [ ] Có — Spring viết lại bytecode của method lúc biên dịch để chèn logic transaction, nên self-invocation vẫn được bao

## Giải thích (VI)
Không. Spring thực thi @Transactional qua một AOP proxy bọc bean: chỉ lời gọi đi từ NGOÀI vào proxy mới được begin/commit. Gọi this.processOne() là self-invocation — đi thẳng vào object, bỏ qua proxy — nên @Transactional vô hiệu và processOne chạy không transaction. Cách sửa: tách processOne sang service khác rồi inject, hoặc self-inject proxy.

### Giải thích các phương án:
- **Lỗi khởi động — không được đặt @Transactional trên method được gọi nội bộ trong cùng class** (Sai): Sai: không có lỗi khởi động; annotation hợp lệ, chỉ là vô hiệu lúc runtime với self-invocation — một bug âm thầm.
- **Không — gọi this.processOne() không qua AOP proxy nên @Transactional bị bỏ qua** (Đúng): Đúng: transaction của Spring hoạt động qua proxy; self-invocation trong cùng bean bỏ qua proxy nên advice không được áp dụng và processOne chạy không có transaction.
- **Có — @Transactional gắn trực tiếp vào method nên luôn có hiệu lực bất kể được gọi từ đâu** (Sai): Sai: @Transactional được thực thi bởi proxy bọc bean, không phải bởi bản thân method; gọi nội bộ không đi qua proxy.
- **Có — Spring viết lại bytecode của method lúc biên dịch để chèn logic transaction, nên self-invocation vẫn được bao** (Sai): Sai: Spring AOP dùng proxy lúc runtime, không rewrite bytecode lúc biên dịch; đó là lý do self-invocation lọt lưới.

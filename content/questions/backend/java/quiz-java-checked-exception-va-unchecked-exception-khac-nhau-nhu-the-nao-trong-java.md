---
id: quiz-java-checked-exception-va-unchecked-exception-khac-nhau-nhu-the-nao-trong-java
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Checked exception và unchecked exception khác nhau như thế nào trong Java?

## Đáp án trắc nghiệm
- [x] Checked bị compiler bắt buộc xử lý bằng try-catch hoặc throws; unchecked thì không
- [ ] NullPointerException là checked exception vì nó kế thừa từ Exception
- [ ] Error như OutOfMemoryError thuộc nhóm checked exception nên method nào cũng phải khai báo throws
- [ ] Checked exception được phát hiện lúc biên dịch, còn unchecked exception chỉ có thể xảy ra lúc runtime

## Giải thích (VI)
Checked exception (IOException, SQLException...) là mọi Exception ngoài nhánh RuntimeException — compiler bắt buộc try-catch hoặc khai báo throws, biểu thị tình huống có thể khôi phục. Unchecked (RuntimeException và subclass: NPE, IllegalArgumentException...) không bị ép xử lý, thường là bug lập trình. Error (OutOfMemoryError) là nhánh riêng, unchecked, không nên bắt.

### Giải thích các phương án:
- **Checked bị compiler bắt buộc xử lý bằng try-catch hoặc throws; unchecked thì không** (Đúng): Đúng phân loại: mọi Exception ngoài nhánh RuntimeException là checked (IOException, SQLException...); RuntimeException và subclass như NPE là unchecked, thường biểu thị bug lập trình.
- **NullPointerException là checked exception vì nó kế thừa từ Exception** (Sai): NPE kế thừa RuntimeException — nhánh unchecked; kế thừa từ Exception nói chung chưa đủ, phải xét có thuộc nhánh RuntimeException hay không.
- **Error như OutOfMemoryError thuộc nhóm checked exception nên method nào cũng phải khai báo throws** (Sai): Error là nhánh riêng dưới Throwable, không phải Exception — nó unchecked và biểu thị lỗi JVM, thường không nên bắt.
- **Checked exception được phát hiện lúc biên dịch, còn unchecked exception chỉ có thể xảy ra lúc runtime** (Sai): Cả hai loại đều XẢY RA lúc runtime — khác biệt là compiler có ép khai báo/xử lý hay không, không phải thời điểm exception phát sinh.

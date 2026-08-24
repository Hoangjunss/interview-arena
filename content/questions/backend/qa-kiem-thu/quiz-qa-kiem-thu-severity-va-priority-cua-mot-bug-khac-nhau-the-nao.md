---
id: quiz-qa-kiem-thu-severity-va-priority-cua-mot-bug-khac-nhau-the-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Severity và priority của một bug khác nhau thế nào?

## Đáp án trắc nghiệm
- [x] Severity là tác động kỹ thuật, priority là mức khẩn cấp
- [ ] Severity do tester đặt, priority do developer đặt
- [ ] Hai chỉ số này luôn phải bằng nhau
- [ ] Severity dùng cho production, priority dùng cho môi trường test

## Giải thích (VI)
Severity = mức tác động lên hệ thống (crash, mất dữ liệu, sai số liệu, lệch giao diện). Priority = mức khẩn cấp cần sửa, quyết định theo nghiệp vụ. Hai chỉ số này độc lập và thường lệch nhau.

### Giải thích các phương án:
- **Severity là tác động kỹ thuật, priority là mức khẩn cấp** (Đúng): Một bên đo ảnh hưởng lên hệ thống, một bên đo thứ tự ưu tiên nghiệp vụ.
- **Severity do tester đặt, priority do developer đặt** (Sai): Priority thường do PO hoặc quản lý sản phẩm quyết định, không phải developer.
- **Hai chỉ số này luôn phải bằng nhau** (Sai): Chúng thường xuyên lệch nhau, và chính chỗ lệch mới có giá trị thông tin.
- **Severity dùng cho production, priority dùng cho môi trường test** (Sai): Cả hai đều dùng chung ở mọi môi trường.

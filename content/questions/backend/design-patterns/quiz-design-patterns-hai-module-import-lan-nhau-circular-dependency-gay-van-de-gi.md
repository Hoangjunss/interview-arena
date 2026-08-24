---
id: quiz-design-patterns-hai-module-import-lan-nhau-circular-dependency-gay-van-de-gi
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai module import lẫn nhau (circular dependency) gây vấn đề gì?

## Đáp án trắc nghiệm
- [x] Một bên có thể nhận giá trị chưa khởi tạo
- [ ] Trình biên dịch luôn từ chối biên dịch mã đó
- [ ] Ứng dụng chạy chậm hơn vì phải nạp cùng module hai lần
- [ ] Bundle sẽ chứa hai bản sao của mỗi module

## Giải thích (VI)
Một bên có thể nhận undefined vì module kia chưa nạp xong khi nó đọc tới. Lỗi phụ thuộc thứ tự nạp nên xuất hiện thất thường, và thường lộ ra ở nơi không liên quan tới nguyên nhân.

### Giải thích các phương án:
- **Một bên có thể nhận giá trị chưa khởi tạo** (Đúng): Thứ tự nạp module quyết định, nên lỗi xuất hiện thất thường và khó lần.
- **Trình biên dịch luôn từ chối biên dịch mã đó** (Sai): Thường vẫn biên dịch được, và đó chính là điều làm nó khó phát hiện.
- **Ứng dụng chạy chậm hơn vì phải nạp cùng module hai lần** (Sai): Module vẫn chỉ nạp một lần.
- **Bundle sẽ chứa hai bản sao của mỗi module** (Sai): Bundler không nhân bản module vì lý do này.

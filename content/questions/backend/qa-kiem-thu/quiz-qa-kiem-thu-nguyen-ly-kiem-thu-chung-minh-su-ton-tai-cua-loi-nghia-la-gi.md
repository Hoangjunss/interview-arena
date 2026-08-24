---
id: quiz-qa-kiem-thu-nguyen-ly-kiem-thu-chung-minh-su-ton-tai-cua-loi-nghia-la-gi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên lý "kiểm thử chứng minh sự tồn tại của lỗi" nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Tester phải tìm được lỗi thì mới hoàn thành công việc
- [ ] Mọi phần mềm đều còn ít nhất một lỗi chưa tìm ra
- [ ] Càng nhiều test case thì càng ít lỗi lọt ra production
- [x] Test pass không chứng minh phần mềm không còn lỗi

## Giải thích (VI)
Kiểm thử chỉ có thể chứng minh lỗi đang tồn tại , không chứng minh được là không còn lỗi . Toàn bộ test pass chỉ nói rằng những gì được kiểm chưa lộ lỗi — nó không nói gì về phần chưa kiểm.

### Giải thích các phương án:
- **Tester phải tìm được lỗi thì mới hoàn thành công việc** (Sai): Nguyên lý nói về giới hạn của kiểm thử, không phải chỉ tiêu công việc.
- **Mọi phần mềm đều còn ít nhất một lỗi chưa tìm ra** (Sai): Đây là suy đoán về sản phẩm, không phải nội dung nguyên lý.
- **Càng nhiều test case thì càng ít lỗi lọt ra production** (Sai): Số lượng test case không tỉ lệ thuận với khả năng phát hiện lỗi.
- **Test pass không chứng minh phần mềm không còn lỗi** (Đúng): Kiểm thử chỉ tìm được lỗi đang có, không chứng minh được là không còn lỗi nào.

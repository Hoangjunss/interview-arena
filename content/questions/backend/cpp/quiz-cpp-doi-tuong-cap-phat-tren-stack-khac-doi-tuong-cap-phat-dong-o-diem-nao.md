---
id: quiz-cpp-doi-tuong-cap-phat-tren-stack-khac-doi-tuong-cap-phat-dong-o-diem-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đối tượng cấp phát trên stack khác đối tượng cấp phát động ở điểm nào?

## Đáp án trắc nghiệm
- [x] Stack tự huỷ khi ra khỏi phạm vi
- [ ] Cấp phát động luôn nhanh hơn cấp phát trên stack
- [ ] Cấp phát động tự huỷ khi không còn ai tham chiếu
- [ ] Stack lưu được đối tượng lớn hơn nhiều

## Giải thích (VI)
Đối tượng trên stack có vòng đời gắn với phạm vi và tự huỷ khi ra khỏi phạm vi. Đối tượng cấp phát động sống tới khi được giải phóng, nên quên giải phóng là rò rỉ và giải phóng hai lần là hỏng bộ nhớ.

### Giải thích các phương án:
- **Stack tự huỷ khi ra khỏi phạm vi** (Đúng): Vòng đời gắn với phạm vi nên không cần giải phóng thủ công và không rò rỉ.
- **Cấp phát động luôn nhanh hơn cấp phát trên stack** (Sai): Ngược lại, cấp phát trên ngăn xếp gần như không tốn gì.
- **Cấp phát động tự huỷ khi không còn ai tham chiếu** (Sai): C++ không có thu gom rác, phải tự giải phóng hoặc dùng con trỏ thông minh.
- **Stack lưu được đối tượng lớn hơn nhiều** (Sai): Ngăn xếp có dung lượng giới hạn, đối tượng lớn nên cấp phát động.

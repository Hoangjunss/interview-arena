---
id: quiz-ci-cd-ci-hay-do-vi-mot-e2e-test-flaky-chinh-sach-retry-nen-the-nao
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI hay đỏ vì một e2e test flaky. Chính sách retry nên thế nào?

## Đáp án trắc nghiệm
- [ ] Không retry, để CI đỏ cho tới khi ai đó sửa test
- [x] Retry có giới hạn nhưng phải ghi nhận số lần flaky
- [ ] Retry không giới hạn tới khi test pass
- [ ] Xoá test đó vì nó không đáng tin cậy nữa

## Giải thích (VI)
Retry có giới hạn (1–2 lần) nhưng phải ghi lại test nào cần retry và bao nhiêu lần. Không có số liệu đó thì flaky tích luỹ âm thầm, và tới lúc CI đỏ ai cũng cho là flaky — kể cả khi là lỗi thật.

### Giải thích các phương án:
- **Không retry, để CI đỏ cho tới khi ai đó sửa test** (Sai): Nghiêm nhưng chặn cả nhóm vì một test không ổn định.
- **Retry có giới hạn nhưng phải ghi nhận số lần flaky** (Đúng): Retry im lặng làm mất tín hiệu về chất lượng của bộ test.
- **Retry không giới hạn tới khi test pass** (Sai): Che cả lỗi thật và làm pipeline chạy rất lâu.
- **Xoá test đó vì nó không đáng tin cậy nữa** (Sai): Mất phần bảo vệ mà test đó đang cung cấp.

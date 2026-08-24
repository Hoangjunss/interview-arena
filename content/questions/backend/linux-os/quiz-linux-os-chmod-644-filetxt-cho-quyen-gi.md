---
id: quiz-linux-os-chmod-644-filetxt-cho-quyen-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
chmod 644 file.txt cho quyền gì?

## Đáp án trắc nghiệm
- [x] Chủ đọc ghi, nhóm và người khác đọc
- [ ] Mọi người đều đọc và ghi được tệp đó
- [ ] Chủ và nhóm đọc ghi, người khác không có quyền gì
- [ ] Chủ đọc ghi thực thi, nhóm và người khác chỉ đọc

## Giải thích (VI)
Chủ sở hữu: đọc + ghi (4+2=6). Nhóm: đọc (4). Người khác: đọc (4). Cách nhớ: 4 đọc, 2 ghi, 1 thực thi , cộng lại cho từng nhóm theo thứ tự chủ–nhóm–người khác.

### Giải thích các phương án:
- **Chủ đọc ghi, nhóm và người khác đọc** (Đúng): Mỗi số là tổng của đọc 4, ghi 2, thực thi 1.
- **Mọi người đều đọc và ghi được tệp đó** (Sai): Đó là 666, một cấu hình nên tránh.
- **Chủ và nhóm đọc ghi, người khác không có quyền gì** (Sai): Đó là 660.
- **Chủ đọc ghi thực thi, nhóm và người khác chỉ đọc** (Sai): Đó là 744; số 6 không bao gồm quyền thực thi.

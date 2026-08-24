---
id: quiz-typescript-trong-mot-interface-nickname-string-khac-gi-voi-bio-string-undefined
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong một interface, nickname?: string khác gì với bio: string | undefined?

## Đáp án trắc nghiệm
- [ ] nickname? nghĩa là property chỉ đọc, không gán lại được
- [ ] bio: string | undefined sẽ tự gán giá trị mặc định là chuỗi rỗng
- [x] Dạng có dấu hỏi cho phép bỏ hẳn key; dạng kia bắt buộc key phải có mặt
- [ ] Hai cách viết tương đương hoàn toàn, chỉ khác cú pháp

## Giải thích (VI)
prop?: T cho phép bỏ hẳn key khi tạo object (kiểu khi đọc là T | undefined). prop: T | undefined vẫn bắt buộc key có mặt — chỉ value được phép là undefined. Ngoài ra, readonly prop chặn gán lại sau khởi tạo, nhưng chỉ ở compile time.

### Giải thích các phương án:
- **nickname? nghĩa là property chỉ đọc, không gán lại được** (Sai): Chỉ đọc là modifier readonly; dấu ? chỉ nói về sự có mặt của key.
- **bio: string | undefined sẽ tự gán giá trị mặc định là chuỗi rỗng** (Sai): Type system không gán giá trị mặc định — default value là việc của code runtime.
- **Dạng có dấu hỏi cho phép bỏ hẳn key; dạng kia bắt buộc key phải có mặt** (Đúng): Với bio: string | undefined key vẫn bắt buộc có mặt, chỉ value được phép là undefined. Optional modifier ? cho phép vắng mặt key; union với undefined chỉ nới lỏng value — object literal thiếu key bio sẽ báo lỗi. Với dạng thứ hai, key vẫn phải xuất hiện trong object và chỉ giá trị mới được phép là undefined.
- **Hai cách viết tương đương hoàn toàn, chỉ khác cú pháp** (Sai): Không tương đương: { id: 1 } hợp lệ khi nickname? nhưng thiếu bio là lỗi compile dù value có thể là undefined.

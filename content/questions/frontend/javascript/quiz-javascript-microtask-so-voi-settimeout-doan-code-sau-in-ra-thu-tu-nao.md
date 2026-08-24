---
id: quiz-javascript-microtask-so-voi-settimeout-doan-code-sau-in-ra-thu-tu-nao
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microtask so với setTimeout — đoạn code sau in ra thứ tự nào?

## Đáp án trắc nghiệm
- [ ] A B C D
- [x] A D C B
- [ ] A D B C
- [ ] A C D B

## Giải thích (VI)
In ra A D C B. Hai lệnh log đồng bộ chạy trước (A, D). Sau đó event loop dọn hết microtask (Promise callback → C) rồi mới lấy macrotask (setTimeout → B). Microtask luôn ưu tiên hơn macrotask.

### Giải thích các phương án:
- **A B C D** (Sai): Sai vì console.log đồng bộ chạy trước mọi callback bất đồng bộ; B và C không chạy giữa A và D.
- **A D C B** (Đúng): Code đồng bộ chạy trước (A, D). Microtask (Promise .then → C) chạy hết trước khi tới macrotask (setTimeout → B).
- **A D B C** (Sai): Sai thứ tự B/C: microtask (C) luôn được xử lý trước macrotask (B) ở cuối mỗi lượt của event loop.
- **A C D B** (Sai): Sai: .then là bất đồng bộ nên C không thể chạy trước D (đồng bộ).

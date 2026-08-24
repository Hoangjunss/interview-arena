---
id: quiz-javascript-gia-tri-nao-sau-day-khong-phai-la-falsy-trong-javascript
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giá trị nào sau đây KHÔNG phải là falsy trong JavaScript?

## Đáp án trắc nghiệm
- [x] [] (mảng rỗng)
- [ ] NaN (không phải số)
- [ ] 0 (số không)
- [ ] "" (chuỗi rỗng)

## Giải thích (VI)
[] (mảng rỗng) là truthy — mọi object trong JS đều truthy, kể cả mảng và object rỗng. Chỉ có đúng 8 giá trị falsy: false, 0, -0, 0n, "", null, undefined, NaN. Vì thế if ([]) luôn vào nhánh true, còn [] == false lại là true (do ép kiểu) — hai chuyện khác nhau.

### Giải thích các phương án:
- **[] (mảng rỗng)** (Đúng): Mọi object — kể cả mảng/object rỗng — đều truthy; chỉ khi ép sang chuỗi/số mới ra "" hoặc 0, nhưng bản thân [] là truthy.
- **NaN (không phải số)** (Sai): NaN là một trong các giá trị falsy.
- **0 (số không)** (Sai): Số 0 (và -0) là falsy.
- **"" (chuỗi rỗng)** (Sai): Chuỗi rỗng là falsy.

---
id: quiz-android-kotlin-stateflow-khac-sharedflow-o-diem-nao
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
StateFlow khác SharedFlow ở điểm nào?

## Đáp án trắc nghiệm
- [x] StateFlow luôn có giá trị hiện tại và bỏ giá trị trùng
- [ ] StateFlow chạy trên main thread còn SharedFlow thì không
- [ ] SharedFlow chỉ cho phép một người nghe duy nhất
- [ ] SharedFlow không phát được giá trị mới sau khi tạo

## Giải thích (VI)
StateFlow mô tả trạng thái : luôn có một giá trị hiện tại, người nghe mới nhận ngay giá trị mới nhất, và giá trị trùng với giá trị trước bị bỏ qua. SharedFlow mô tả sự kiện : không có giá trị hiện tại và không bỏ trùng.

### Giải thích các phương án:
- **StateFlow luôn có giá trị hiện tại và bỏ giá trị trùng** (Đúng): Nó mô tả trạng thái nên người nghe mới luôn nhận được giá trị mới nhất ngay khi gắn vào.
- **StateFlow chạy trên main thread còn SharedFlow thì không** (Sai): Luồng do bộ điều phối quyết định ở cả hai.
- **SharedFlow chỉ cho phép một người nghe duy nhất** (Sai): Nó vốn được thiết kế cho nhiều người nghe.
- **SharedFlow không phát được giá trị mới sau khi tạo** (Sai): Nó phát giá trị bình thường.

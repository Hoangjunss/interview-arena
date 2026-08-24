---
id: shallow-copy-vs-deep-copy-khac-nhau-the-nao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shallow copy vs Deep copy — khác nhau thế nào?

## Question (EN)
Shallow copy vs deep copy — what's the difference?

## Đáp án chi tiết (VI)
Shallow copy tạo object mới nhưng elements bên trong vẫn tham chiếu cùng objects gốc — thay đổi mutable elements sẽ ảnh hưởng cả hai bản. Deep copy tạo hoàn toàn độc lập, copy đệ quy toàn bộ. Dùng `copy.copy()` cho shallow và `copy.deepcopy()` cho deep. Lưu ý: `list.copy()`, `list[:]`, `dict.copy()` đều là shallow copy.

## Detailed Answer (EN)
Shallow copy creates a new object but inner elements still reference the same objects — mutating nested elements affects both copies. Deep copy is fully independent, recursively copies everything. Use `copy.copy()` for shallow, `copy.deepcopy()` for deep. Pitfall: `list.copy()`, `list[:]`, `dict.copy()` are all shallow copies.

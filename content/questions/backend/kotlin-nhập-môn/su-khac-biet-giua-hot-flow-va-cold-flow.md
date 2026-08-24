---
id: su-khac-biet-giua-hot-flow-va-cold-flow
position: backend
technology: kotlin-nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa hot flow và cold flow?

## Question (EN)
What is the difference between hot and cold flows?

## Đáp án chi tiết (VI)
Cold flow (như `flow {}` hay `PagingSource`) chỉ phát giá trị khi có collector và bắt đầu lại từ đầu cho mỗi collector. Hot flow (như `StateFlow`, `SharedFlow`) phát giá trị bất kể có collector hay không và chia sẻ cùng một stream. `StateFlow` là hot flow có current value — dùng cho state. `Flow` thông thường là cold — dùng cho luồng event. Hot flow hiệu quả bộ nhớ hơn khi có nhiều collector.

## Detailed Answer (EN)
Cold flows (like `flow {}` or `PagingSource`) only produce values when collected and start from the beginning for each collector. Hot flows (like `StateFlow`, `SharedFlow`) emit values regardless of collectors and share the same stream. `StateFlow` is hot with a current value — use it for state. Regular `Flow` is cold — use for event streams. Hot flows are more memory-efficient for multiple collectors.

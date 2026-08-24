---
id: giai-thich-pattern-bloc-va-tai-sao-interviewer-hay-hoi-ve-no
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích pattern BLoC và tại sao interviewer hay hỏi về nó.

## Question (EN)
Explain the BLoC pattern and why interviewers ask about it.

## Đáp án chi tiết (VI)
BLoC (Business Logic Component) tách logic nghiệp vụ khỏi UI thông qua kiến trúc event-in/state-out. Bạn dispatch `Event` vào BLoC, BLoC xử lý và emit ra `State` mới. BLoC có thể test được, đảm bảo kiến trúc nhất quán, và scale tốt trong team lớn. BLoC cần boilerplate nhiều hơn Provider nhưng cung cấp cấu trúc và khả năng truy vết tốt hơn cho app phức tạp.

## Detailed Answer (EN)
BLoC (Business Logic Component) separates business logic from UI via an event-in/state-out architecture. You dispatch `Event`s into a BLoC, which processes them and emits new `State`s. BLoCs are testable, enforce consistent architecture, and scale well on large teams.

---
id: giai-thich-su-khac-nhau-giua-singleton-va-factory-pattern-trong-flutter
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích sự khác nhau giữa singleton và factory pattern trong Flutter.

## Question (EN)
Explain the difference between singleton and factory patterns in Flutter.

## Đáp án chi tiết (VI)
Singleton tạo một instance cho toàn bộ app: `getIt.registerSingleton\u003cRepository\u003e(Repository())`. Dùng cho tài nguyên chia sẻ (database, API client, repository). Factory tạo instance mới mỗi lần: `getIt.registerFactory\u003cUserBloc\u003e(() =\u003e UserBloc(repo))`. Dùng cho BLoC (mỗi màn hình cần state độc lập). Dùng sai gây state leak (chia sẻ state có thể thay đổi) hoặc lãng phí bộ nhớ.

## Detailed Answer (EN)
Singleton creates one instance for the entire app — use for shared resources like databases and API clients. Factory creates a new instance each time — use for BLoCs where each screen needs independent state. Misuse causes state leaks or unnecessary memory consumption.

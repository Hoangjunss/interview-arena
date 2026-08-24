---
id: su-khac-nhau-giua-entity-va-model-trong-flutter-architecture-la-gi
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa entity và model trong Flutter architecture là gì?

## Question (EN)
What is the difference between entity and model in Flutter architecture?

## Đáp án chi tiết (VI)
Entity đại diện cho khái niệm domain (đối tượng nghiệp vụ cốt lõi): `User(id, name, email)`. Entity là class Dart thuần, không phụ thuộc framework và dễ test, nằm ở domain layer. Model là biểu diễn API/database với serialization: `UserModel.toJson()`. Model nằm ở data layer. Dùng entity trong business logic, model trong API/DB, và mapper function để chuyển đổi giữa chúng.

## Detailed Answer (EN)
Entity represents a domain concept — a pure Dart class in the domain layer, framework-agnostic and testable. Model is an API/database representation with serialization in the data layer. Use entities in business logic, models in API/DB, and mapper functions to convert between them.

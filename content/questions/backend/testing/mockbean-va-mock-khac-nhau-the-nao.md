---
id: mockbean-va-mock-khac-nhau-the-nao
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@MockBean và @Mock khác nhau thế nào?

## Question (EN)
How do @MockBean and @Mock differ?

## Đáp án chi tiết (VI)
| | **`@Mock` (Mockito)** | **`@MockBean` (Spring Boot)** |\
|---|---|---|\
| Spring context | Không cần | Cần (thay bean trong context) |\
| Dùng với | Unit test thuần | Slice test / `@SpringBootTest` |\
| Tốc độ | Nhanh | Chậm hơn (invalidate context cache) |\
\
**`@Mock`** — Mockito thuần: chạy với `@ExtendWith(MockitoExtension.class)`, kết hợp `@InjectMocks` để đưa mock vào object đang test. Không có Spring context → nhanh, dùng cho test service/logic.\
\
**`@MockBean`** — thay bean thật trong Spring context bằng mock: dùng trong slice test (`@WebMvcTest` mock service layer) hoặc `@SpringBootTest` khi test phụ thuộc Spring wiring.\
\
**Quy tắc:** không cần Spring context → `@Mock`; cần thay bean trong context → `@MockBean`.\
\
**Lưu ý version:** Spring Boot 3.4+ deprecate `@MockBean` → thay bằng **`@MockitoBean`** (package `spring-test`), ngữ nghĩa tương đương.

## Detailed Answer (EN)
| | **`@Mock` (Mockito)** | **`@MockBean` (Spring Boot)** |\
|---|---|---|\
| Spring context | Not needed | Required (replaces bean in context) |\
| Use with | Pure unit tests | Slice tests / `@SpringBootTest` |\
| Speed | Fast | Slower (invalidates context cache) |\
\
**`@Mock`** — plain Mockito: run with `@ExtendWith(MockitoExtension.class)`, combined with `@InjectMocks` to place mocks into the object under test. No Spring context → fast, for service/logic tests.\
\
**`@MockBean`** — replaces a real bean in the Spring context with a mock: used in slice tests (`@WebMvcTest` mocking the service layer) or `@SpringBootTest` when the test depends on Spring wiring.\
\
**Rule:** no Spring context needed → `@Mock`; need to swap a bean inside the context → `@MockBean`.\
\
**Version note:** Spring Boot 3.4+ deprecates `@MockBean` → replaced by **`@MockitoBean`** (from `spring-test`), equivalent semantics.

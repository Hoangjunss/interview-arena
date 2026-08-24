---
id: springboottest-la-gi-khac-gi-voi-unit-test-thong-thuong
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@SpringBootTest là gì? Khác gì với unit test thông thường?

## Question (EN)
What is @SpringBootTest? How does it differ from a plain unit test?

## Đáp án chi tiết (VI)
`@SpringBootTest` khởi động **full ApplicationContext** — load toàn bộ bean, auto-config, DB... như production; thường kèm `@AutoConfigureMockMvc` để gọi endpoint qua `MockMvc` không cần server thật.\
\
| | **Unit test** | **@SpringBootTest** |\
|---|---|---|\
| Context | Không có Spring | Full ApplicationContext |\
| Tốc độ | **Nhanh** (~ms) | **Chậm** (~5-30s startup) |\
| DB | Mock/in-memory | Real hoặc Testcontainers |\
\
**Modes:** `webEnvironment = MOCK` (default — MockMvc, không mở port) · `RANDOM_PORT` (server thật, test bằng `TestRestTemplate`).\
\
**Best practice:** dùng ít thôi (chậm, context cache dễ vỡ) — dành cho integration test full-flow; còn lại ưu tiên **slice tests** (`@WebMvcTest`, `@DataJpaTest`) load đúng layer cần test.

## Detailed Answer (EN)
`@SpringBootTest` boots the **full ApplicationContext** — all beans, auto-configs, DB like production; usually paired with `@AutoConfigureMockMvc` to hit endpoints via `MockMvc` without a real server.\
\
| | **Unit test** | **@SpringBootTest** |\
|---|---|---|\
| Context | No Spring | Full ApplicationContext |\
| Speed | **Fast** (~ms) | **Slow** (~5-30s startup) |\
| DB | Mock/in-memory | Real or Testcontainers |\
\
**Modes:** `webEnvironment = MOCK` (default — MockMvc, no port opened) · `RANDOM_PORT` (real server, test with `TestRestTemplate`).\
\
**Best practice:** use sparingly (slow, easily invalidated context cache) — reserve for full-flow integration tests; otherwise prefer **slice tests** (`@WebMvcTest`, `@DataJpaTest`) that load exactly the layer under test.

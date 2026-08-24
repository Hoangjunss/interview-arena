---
id: circular-dependency-trong-spring-la-gi-cach-phat-hien-va-fix
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circular dependency trong Spring là gì? Cách phát hiện và fix?

## Question (EN)
What is a circular dependency in Spring? How do you detect and fix it?

## Đáp án chi tiết (VI)
**Circular dependency:** A cần B và B cần A → Spring không biết tạo cái nào trước. Spring Boot 2.6+ **throw ngay lúc startup**: `The dependencies of some of the beans form a cycle: a → b → a`.\
\
**Fix (ưu tiên theo thứ tự):**\
1. **Tái cấu trúc** — trích logic chung ra class C, A và B đều phụ thuộc C. **Giải pháp đúng về kiến trúc** — cycle thường là dấu hiệu chia trách nhiệm sai.\
2. **`@Lazy`** tại điểm inject (`A(@Lazy B b)`) — Spring inject proxy trước, tạo bean thật khi dùng lần đầu.\
3. **Setter injection** thay constructor — Spring init bean trước, inject sau.\
\
**Không nên:** `spring.main.allow-circular-references=true` — giấu lỗi nhưng giữ nguyên vấn đề kiến trúc.

## Detailed Answer (EN)
**Circular dependency:** A needs B and B needs A → Spring cannot decide which to create first. Spring Boot 2.6+ **throws at startup**: `The dependencies of some of the beans form a cycle: a → b → a`.\
\
**Fixes (prefer in order):**\
1. **Refactor** — extract shared logic into class C; A and B both depend on C. **The architecturally correct fix** — a cycle usually signals misplaced responsibilities.\
2. **`@Lazy`** at the injection point (`A(@Lazy B b)`) — Spring injects a proxy first, creating the real bean on first use.\
3. **Setter injection** instead of constructor — Spring creates the bean first, injects later.\
\
**Avoid:** `spring.main.allow-circular-references=true` — hides the error but keeps the architectural problem.

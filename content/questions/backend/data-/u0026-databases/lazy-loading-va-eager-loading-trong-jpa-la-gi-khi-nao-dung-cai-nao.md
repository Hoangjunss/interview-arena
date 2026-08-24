---
id: lazy-loading-va-eager-loading-trong-jpa-la-gi-khi-nao-dung-cai-nao
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy loading và eager loading trong JPA là gì? Khi nào dùng cái nào?

## Question (EN)
What are lazy and eager loading in JPA? When do you use each?

## Đáp án chi tiết (VI)
| | **Lazy** | **Eager** |\
|---|---|---|\
| Load khi | Lần đầu **truy cập field** | **Luôn** load cùng entity chính |\
| Default | `@OneToMany`, `@ManyToMany` | `@ManyToOne`, `@OneToOne` |\
\
Đổi qua attribute `fetch`: `@ManyToOne(fetch = FetchType.LAZY)`.\
\
**Vấn đề Eager:** luôn load association dù không cần → query thừa, chậm.\
\
**Vấn đề Lazy:** `LazyInitializationException` khi truy cập field ngoài transaction (session đã đóng).\
\
**Fix Lazy:** `@Transactional` trên method service (giữ session mở); `JOIN FETCH` trong JPQL để load kèm trong 1 query; DTO projection chỉ lấy field cần (code cụ thể xem câu N+1).\
\
**Best practice:** mặc định Lazy — kể cả cân nhắc chỉnh `@ManyToOne` (vốn Eager) về Lazy; chỉ Eager/JOIN FETCH khi chắc chắn mọi use case đều cần data đó.

## Detailed Answer (EN)
| | **Lazy** | **Eager** |\
|---|---|---|\
| Loads when | First **field access** | **Always** with the parent entity |\
| Default | `@OneToMany`, `@ManyToMany` | `@ManyToOne`, `@OneToOne` |\
\
Change via the `fetch` attribute: `@ManyToOne(fetch = FetchType.LAZY)`.\
\
**Eager problem:** always loads associations even when unused → wasted queries, slower.\
\
**Lazy problem:** `LazyInitializationException` when the field is accessed outside a transaction (session closed).\
\
**Lazy fixes:** `@Transactional` on the service method (keeps the session open); `JOIN FETCH` in JPQL to load in one query; DTO projection fetching only needed fields (see the N+1 item for code).\
\
**Best practice:** default to Lazy — even consider switching `@ManyToOne` (Eager by default) to Lazy; use Eager/JOIN FETCH only when every use case needs that data.

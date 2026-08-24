---
id: dto-va-entity-khac-nhau-the-nao-vi-sao-khong-tra-entity-thang-ra-api
position: backend
technology: spring-web-mvc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DTO và Entity khác nhau thế nào? Vì sao không trả entity thẳng ra API?

## Question (EN)
How do DTOs and Entities differ? Why not return entities directly from the API?

## Đáp án chi tiết (VI)
**Entity** = object map với bảng DB, do JPA quản lý. **DTO (Data Transfer Object)** = object thuần chở data qua boundary (API response/request), không dính persistence.\
\
**Vì sao không trả entity thẳng ra controller:**\
1. **Lộ cấu trúc DB** — đổi schema là vỡ API contract; field nhạy cảm (`passwordHash`, cột nội bộ) dễ lộ ra JSON.\
2. **`LazyInitializationException` / N+1** — Jackson serialize chạm vào lazy field khi transaction đã đóng.\
3. **Vòng lặp quan hệ** — quan hệ 2 chiều (`Order` ↔ `Customer`) làm JSON đệ quy vô hạn (phải vá bằng `@JsonIgnore` — dấu hiệu sai tầng).\
4. **Over-posting khi nhận request** — bind body thẳng vào entity cho phép client set cả field không được phép (`role`, `id`).\
\
**Mapping:** thủ công qua record + factory method (`UserDto.from(user)`) cho case đơn giản; **MapStruct** (sinh code lúc compile, type-safe — khuyến nghị) khi nhiều; interface projection của Spring Data cho read-only. ModelMapper dùng reflection, chậm — hạn chế.

## Detailed Answer (EN)
$89

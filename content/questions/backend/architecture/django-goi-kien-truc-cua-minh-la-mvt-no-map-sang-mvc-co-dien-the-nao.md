---
id: django-goi-kien-truc-cua-minh-la-mvt-no-map-sang-mvc-co-dien-the-nao
position: backend
technology: architecture
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Django gọi kiến trúc của mình là MVT — nó map sang MVC cổ điển thế nào?

## Question (EN)
Django calls its architecture MVT — how does it map to classic MVC?

## Đáp án chi tiết (VI)
Django gọi mô hình của mình là **MTV/MVT (Model–Template–View)** — cùng bản chất MVC nhưng đổi tên cho khớp vai trò thực tế:\
\
| Django | MVC cổ điển | Vai trò |\
|---|---|---|\
| Model | Model | dữ liệu + business logic |\
| Template | View | lớp hiển thị (render HTML) |\
| View | Controller | nhận request, điều phối, chọn Template |\
\
Bản thân framework đóng vai controller định tuyến qua **URLconf**. Điểm hay gây nhầm: **\\"View\\" của Django là Controller**, không phải lớp hiển thị — render HTML là việc của **Template**.

## Detailed Answer (EN)
Django calls its pattern **MTV/MVT (Model–Template–View)** — the same core as MVC, renamed to match the real roles:\
\
| Django | Classic MVC | Role |\
|---|---|---|\
| Model | Model | data + business logic |\
| Template | View | presentation layer (renders HTML) |\
| View | Controller | takes the request, orchestrates, picks a Template |\
\
The framework itself acts as the controller that routes via **URLconf**. The common confusion: **Django's \\"View\\" is the Controller**, not the presentation layer — rendering HTML is the **Template**'s job.

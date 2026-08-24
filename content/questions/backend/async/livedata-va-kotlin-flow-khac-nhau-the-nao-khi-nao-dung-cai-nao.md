---
id: livedata-va-kotlin-flow-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
LiveData và Kotlin Flow khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do LiveData and Kotlin Flow differ, and when do you use each?

## Đáp án chi tiết (VI)
Cả hai đều là luồng dữ liệu quan sát được, nhưng khác về khả năng và độ nhận biết vòng đời.\
\
- **LiveData**: đơn giản, **nhận biết lifecycle sẵn** — chỉ phát dữ liệu khi observer ở trạng thái active, tự gỡ khi destroy → an toàn cho UI. Nhưng ít toán tử biến đổi, gắn với Android (khó test thuần).\
- **Flow**: mạnh hơn — nhiều operator (`map`, `filter`, `combine`), chạy trên coroutine/threading linh hoạt (`flowOn`), thuần Kotlin nên **dễ test** và dùng được ở tầng data. `StateFlow`/`SharedFlow` là biến thể hot giữ giá trị hiện tại.\
\
Thực hành hiện nay: dùng **Flow ở tầng data/domain**, thu thập an toàn ở UI bằng `repeatOnLifecycle`/`collectAsStateWithLifecycle`; `StateFlow` dần thay LiveData trong ViewModel.

## Detailed Answer (EN)
Both are observable data streams, but they differ in capability and lifecycle awareness.\
\
- **LiveData**: simple, **lifecycle-aware out of the box** — only emits to active observers and auto-removes on destroy → safe for UI. But few transformation operators and Android-bound (hard to unit-test).\
- **Flow**: more powerful — many operators (`map`, `filter`, `combine`), flexible coroutine/threading (`flowOn`), pure Kotlin so **easy to test** and usable in the data layer. `StateFlow`/`SharedFlow` are hot variants that hold the current value.\
\
Current practice: use **Flow in the data/domain layer**, collect safely in the UI with `repeatOnLifecycle`/`collectAsStateWithLifecycle`; `StateFlow` increasingly replaces LiveData in ViewModels.

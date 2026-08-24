---
id: bloc-pattern-la-gi-luong-du-lieu-chay-ra-sao
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BLoC pattern là gì? Luồng dữ liệu chạy ra sao?

## Question (EN)
What is the BLoC pattern and how does its data flow work?

## Đáp án chi tiết (VI)
BLoC (Business Logic Component) tách **logic khỏi UI** bằng luồng dữ liệu một chiều dựa trên Stream.\
\
- UI phát ra **Event** (ví dụ `LoadUsers`).\
- BLoC nhận event, xử lý (gọi API/DB), rồi **emit State** mới (`Loading` → `Loaded`/`Error`).\
- UI lắng nghe stream state qua `BlocBuilder`/`BlocListener` và dựng lại theo state.\
\
Ưu điểm: logic thuần Dart nên **dễ test**, tách bạch rõ ràng, hợp app lớn nhiều người. **Cubit** là biến thể gọn hơn: bỏ event, gọi thẳng method để emit state.\
\
Đánh đổi: nhiều boilerplate hơn setState/Provider; với màn hình đơn giản có thể là thừa.

## Detailed Answer (EN)
BLoC (Business Logic Component) separates **logic from UI** with a one-way, Stream-based data flow.\
\
- The UI emits an **Event** (e.g. `LoadUsers`).\
- The BLoC receives the event, processes it (calls an API/DB), then **emits a new State** (`Loading` → `Loaded`/`Error`).\
- The UI listens to the state stream via `BlocBuilder`/`BlocListener` and rebuilds from the state.\
\
Upsides: logic is plain Dart so it is **easy to test**, cleanly separated, and fits large multi-developer apps. **Cubit** is a lighter variant: it drops events and calls methods directly to emit state.\
\
Trade-off: more boilerplate than setState/Provider; for simple screens it can be overkill.

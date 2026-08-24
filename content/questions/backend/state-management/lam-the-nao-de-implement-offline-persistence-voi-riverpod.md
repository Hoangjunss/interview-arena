---
id: lam-the-nao-de-implement-offline-persistence-voi-riverpod
position: backend
technology: state-management
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để implement offline persistence với Riverpod?

## Question (EN)
How do you implement offline persistence with Riverpod?

## Đáp án chi tiết (VI)
Kết hợp `AsyncNotifier` với local storage (Hive, Isar, hoặc SharedPreferences). Pattern: khi `build()` chạy, đọc cache local trước rồi fetch API—nếu fetch thành công thì cập nhật cache. Dùng `ref.invalidate()` hoặc `ref.refresh()` để force refresh. \
\
**Ví dụ:** `@riverpod class PostsNotifier extends AsyncNotifier\u003cList\u003cPost\u003e\u003e { Future\u003cList\u003cPost\u003e\u003e build() async { final cached = await db.getPosts(); state = AsyncValue.data(cached); final fresh = await api.getPosts(); await db.savePosts(fresh); return fresh; } }`. Kết quả: app show dữ liệu cũ ngay lập tức, cập nhật khi có mạng.

## Detailed Answer (EN)
Combine `AsyncNotifier` with local storage (Hive, Isar, SharedPreferences). Pattern: in `build()`, read local cache first then fetch the API — on success, update the cache. \
\
**Example:** return cached data immediately via `AsyncValue.data(cached)`, then update state with fresh API data. This gives instant data display with background sync when network is available.

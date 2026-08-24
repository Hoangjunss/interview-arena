---
id: context-trong-android-la-gi-phan-biet-application-context-va-activity-context-li
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Context` trong Android là gì? Phân biệt Application context và Activity context (liên quan memory leak).

## Question (EN)
What is `Context` in Android? Contrast Application context vs Activity context (memory-leak angle).

## Đáp án chi tiết (VI)
`Context` là cầu nối tới tài nguyên và dịch vụ hệ thống: truy cập resources, khởi động Activity/Service, lấy `getSystemService()`, mở database... Về vòng đời có hai loại chính:\
\
- **Activity context**: gắn với vòng đời một Activity, biết về theme/UI. Dùng khi cần theme đúng: inflate layout, tạo Dialog, hiển thị View.\
- **Application context**: sống suốt vòng đời tiến trình, độc lập với UI. Dùng cho việc \\"sống lâu hơn màn hình\\": singleton, thư viện, `WorkManager`.\
\
**Memory leak** xảy ra khi một object sống lâu (singleton, static, thread) giữ tham chiếu tới **Activity context**. GC không thu hồi được Activity đã `finish()` vì vẫn còn ai đó tham chiếu, kéo theo cả cây View. Quy tắc: cái gì sống lâu hơn màn hình thì truyền `applicationContext`; chỉ dùng Activity context cho việc liên quan UI của chính màn hình đó.

## Detailed Answer (EN)
`Context` is the bridge to system resources and services: accessing resources, starting Activities/Services, `getSystemService()`, opening databases, etc. Two main flavors differ by lifecycle:\
\
- **Activity context**: tied to one Activity's lifecycle and aware of theme/UI. Use it when correct theming matters: inflating layouts, creating Dialogs, showing Views.\
- **Application context**: lives for the whole process, independent of UI. Use it for things that outlive any screen: singletons, libraries, `WorkManager`.\
\
**Memory leaks** happen when a long-lived object (singleton, static field, thread) holds a reference to an **Activity context**. The GC cannot reclaim a `finish()`-ed Activity while something still references it, dragging the entire View tree along. Rule of thumb: anything that outlives a screen gets `applicationContext`; reserve the Activity context for UI work belonging to that screen.

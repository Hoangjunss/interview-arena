---
id: runtime-permission-tren-android-hoat-dong-the-nao
position: backend
technology: permissions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Runtime permission trên Android hoạt động thế nào?

## Question (EN)
How do runtime permissions work on Android?

## Đáp án chi tiết (VI)
Từ Android 6.0 (API 23), quyền **nguy hiểm** (vị trí, camera, mic, danh bạ) phải **xin lúc chạy**, không chỉ khai trong manifest.\
\
Luồng chuẩn:\
1. **Khai báo** quyền trong `AndroidManifest.xml`.\
2. **Kiểm tra** đã có chưa (`checkSelfPermission`).\
3. Nếu chưa, cân nhắc **hiện lý do** (`shouldShowRequestPermissionRationale`) khi ngữ cảnh cần.\
4. **Xin quyền** bằng `ActivityResultContracts.RequestPermission` (khuyến nghị) và xử lý kết quả cho phép/từ chối.\
\
Nguyên tắc UX:\
- Xin quyền **đúng ngữ cảnh** (ngay trước khi dùng), giải thích lợi ích, xử lý mượt khi bị từ chối.\
- Có quyền cấp **một lần** (Android 11+) và hệ thống **tự thu hồi** quyền của app lâu không dùng (Android 13+).\
\
Hay hỏi: khác biệt normal vs dangerous permission, và xử lý khi người dùng chọn \\"Không hỏi lại\\".

## Detailed Answer (EN)
Since Android 6.0 (API 23), **dangerous** permissions (location, camera, mic, contacts) must be **requested at runtime**, not just declared in the manifest.\
\
Standard flow:\
1. **Declare** the permission in `AndroidManifest.xml`.\
2. **Check** if it is already granted (`checkSelfPermission`).\
3. If not, consider **showing a rationale** (`shouldShowRequestPermissionRationale`) when context calls for it.\
4. **Request** it via `ActivityResultContracts.RequestPermission` (recommended) and handle the granted/denied result.\
\
UX principles:\
- Request **in context** (right before use), explain the benefit, degrade gracefully on denial.\
- There are **one-time** grants (Android 11+) and the system **auto-revokes** permissions for unused apps (Android 13+).\
\
Common ask: normal vs dangerous permissions, and handling \\"Don't ask again\\".

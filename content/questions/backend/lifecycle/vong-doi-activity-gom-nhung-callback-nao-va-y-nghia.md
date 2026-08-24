---
id: vong-doi-activity-gom-nhung-callback-nao-va-y-nghia
position: backend
technology: lifecycle
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời Activity gồm những callback nào và ý nghĩa?

## Question (EN)
What are the Activity lifecycle callbacks and what do they mean?

## Đáp án chi tiết (VI)
Các callback chính theo thứ tự:\
\
- **onCreate()**: khởi tạo một lần — inflate layout, bind view, khôi phục state.\
- **onStart()**: Activity trở nên hiển thị.\
- **onResume()**: Activity ở **foreground**, nhận tương tác. Bắt đầu camera/animation/sensor ở đây.\
- **onPause()**: mất foreground một phần (có dialog che, chuyển app) — dừng việc tiêu tài nguyên, lưu nhanh dữ liệu nhẹ.\
- **onStop()**: không còn hiển thị — giải phóng tài nguyên nặng.\
- **onDestroy()**: bị hủy (người dùng thoát hoặc hệ thống thu hồi).\
\
Hay hỏi: khi **xoay màn hình**, Activity bị hủy và tạo lại → dùng `onSaveInstanceState`/`ViewModel` để giữ state. Cặp create↔destroy, start↔stop, resume↔pause đối xứng nhau.

## Detailed Answer (EN)
The main callbacks in order:\
\
- **onCreate()**: one-time init — inflate layout, bind views, restore state.\
- **onStart()**: the Activity becomes visible.\
- **onResume()**: the Activity is in the **foreground**, receiving input. Start camera/animation/sensors here.\
- **onPause()**: partial loss of foreground (a dialog covers it, app switch) — stop resource-heavy work, quickly persist small data.\
- **onStop()**: no longer visible — release heavy resources.\
- **onDestroy()**: destroyed (user exits or system reclaims).\
\
Common ask: on **rotation** the Activity is destroyed and recreated → use `onSaveInstanceState`/`ViewModel` to retain state. The create↔destroy, start↔stop, resume↔pause pairs are symmetric.

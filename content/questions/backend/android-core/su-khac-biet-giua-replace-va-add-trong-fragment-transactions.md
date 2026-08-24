---
id: su-khac-biet-giua-replace-va-add-trong-fragment-transactions
position: backend
technology: android-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `replace()` và `add()` trong Fragment transactions?

## Question (EN)
What is the difference between `replace()` and `add()` in Fragment transactions?

## Đáp án chi tiết (VI)
`replace()` xóa Fragment hiện tại và thêm Fragment mới vào chỗ đó — khi back thì Fragment bị replace sẽ được tạo lại. `add()` giữ Fragment hiện có và chồng Fragment mới lên trên — khi back thì quay về Fragment cũ. Dùng `replace()` để điều hướng giữa các màn hình, còn `add()` cho overlay như dialog hay bottom sheet.

## Detailed Answer (EN)
`replace()` removes the current Fragment and adds a new one in its place — on back press the replaced fragment is recreated. `add()` keeps the existing Fragment and adds a new one on top — on back press returns to the existing fragment. Use `replace()` for navigation between screens and `add()` for overlays like dialogs or bottom sheets.

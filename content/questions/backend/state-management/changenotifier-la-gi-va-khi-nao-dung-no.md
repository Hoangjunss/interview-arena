---
id: changenotifier-la-gi-va-khi-nao-dung-no
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ChangeNotifier` là gì và khi nào dùng nó?

## Question (EN)
What is `ChangeNotifier` and when do you use it?

## Đáp án chi tiết (VI)
`ChangeNotifier` là class đơn giản thông báo listener khi state thay đổi thông qua `notifyListeners()`. `extend ChangeNotifier` để tạo đối tượng observable. Provider theo dõi `ChangeNotifier` và rebuild khi `notifyListeners()` được gọi. Nó nhẹ nhưng cần quản lý thông báo thủ công. Cho state đơn giản (theme, auth, user data), `ChangeNotifier` thường đủ dùng.

## Detailed Answer (EN)
`ChangeNotifier` notifies listeners when state changes via `notifyListeners()`. Extend it to create observable objects that Provider can watch and rebuild widgets accordingly. It's lightweight but requires manual notification management.

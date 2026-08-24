---
id: shellroute-trong-gorouter-la-gi-va-khi-nao-dung
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ShellRoute` trong GoRouter là gì và khi nào dùng?

## Question (EN)
What is `ShellRoute` in GoRouter and when do you use it?

## Đáp án chi tiết (VI)
`ShellRoute` bọc nhiều route với một parent chia sẻ (như bottom navigation bar). Route bên trong `ShellRoute` build trong context của parent đó, duy trì navigation stack độc lập cho mỗi tab. Đây là cách đúng để triển khai bottom tab navigation: mỗi tab có lịch sử điều hướng riêng, nhấn tab hiển thị lịch sử của nó thay vì bắt đầu mới. Không có `ShellRoute`, chuyển tab sẽ làm nút back hoạt động sai.

## Detailed Answer (EN)
`ShellRoute` wraps multiple routes with a shared parent like a bottom navigation bar. Routes inside maintain independent navigation stacks for each tab. This is the correct way to implement bottom tab navigation — without `ShellRoute`, switching tabs breaks the back button behavior.

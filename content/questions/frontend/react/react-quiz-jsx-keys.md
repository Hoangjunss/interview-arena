---
id: react-quiz-jsx-keys
position: frontend
technology: react
level: junior
tags: [jsx, lists]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao React yêu cầu prop `key` khi render danh sách phần tử?

## Question (EN)
Why does React require a `key` prop when rendering a list of elements?

## Đáp án trắc nghiệm
- [ ] Để tăng tốc độ CSS rendering
- [x] Để React xác định phần tử nào thay đổi/thêm/xóa giữa các lần render
- [ ] Để bắt buộc thứ tự DOM cố định
- [ ] `key` chỉ là quy ước, không ảnh hưởng gì

## Giải thích (VI)
`key` giúp thuật toán reconciliation của React so khớp phần tử cũ và mới hiệu quả, tránh re-render/re-mount không cần thiết và tránh bug state bị lẫn giữa các item khi danh sách thay đổi thứ tự.

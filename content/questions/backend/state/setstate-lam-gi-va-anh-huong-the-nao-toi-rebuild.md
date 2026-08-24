---
id: setstate-lam-gi-va-anh-huong-the-nao-toi-rebuild
position: backend
technology: state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
setState() làm gì và ảnh hưởng thế nào tới rebuild?

## Question (EN)
What does setState() do and how does it affect rebuilds?

## Đáp án chi tiết (VI)
`setState()` báo cho framework rằng state nội bộ của `State` đã đổi → **đánh dấu element là dirty** và lên lịch dựng lại (`build()`) widget đó ở frame kế tiếp.\
\
Điểm cần nhớ:\
- Cập nhật biến state **bên trong** callback của `setState`, không phải sau đó.\
- `setState` chỉ dựng lại **subtree từ widget hiện tại** — nên đặt nó càng gần nơi thực sự đổi càng tốt để tránh dựng lại thừa (đẩy state xuống widget lá).\
- Không gọi `setState` trong `build()` (vòng lặp vô hạn) hay sau khi widget đã dispose.\
- Với state chia sẻ giữa nhiều màn hình, `setState` không đủ → dùng Provider/Riverpod/BLoC.

## Detailed Answer (EN)
`setState()` tells the framework the `State`'s internal data changed → it **marks the element dirty** and schedules a rebuild (`build()`) of that widget on the next frame.\
\
What to remember:\
- Mutate the state variable **inside** the `setState` callback, not after it.\
- `setState` rebuilds only the **subtree from the current widget** — place it as close as possible to what actually changed to avoid needless rebuilds (push state down to leaf widgets).\
- Never call `setState` inside `build()` (infinite loop) or after the widget is disposed.\
- For state shared across screens, `setState` is not enough → use Provider/Riverpod/BLoC.

---
id: arraylist-va-linkedlist-khac-nhau-the-nao
position: backend
technology: collections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ArrayList và LinkedList khác nhau thế nào?

## Question (EN)
What is the difference between ArrayList and LinkedList?

## Đáp án chi tiết (VI)
| Thao tác | **ArrayList** (mảng động) | **LinkedList** (doubly-linked) |\
|---|---|---|\
| `get(i)` | **O(1)** | **O(n)** — phải duyệt |\
| `add(0, e)` đầu | O(n) — dịch hết | **O(1)** |\
| `add(e)` cuối | O(1) amortized | O(1) |\
| Memory mỗi element | ~4-8 byte (reference) | ~24 byte (node + 2 pointer) |\
| Cache locality | **Tốt** (liên tục) | Tệ (rải rác heap) |\
\
**Khi dùng:**\
- **`ArrayList`:** default cho mọi `List` use case. Cache-friendly nên thực tế thường nhanh hơn `LinkedList`.\
- **`LinkedList`:** *hiếm khi cần*. Muốn FIFO queue/deque → dùng **`ArrayDeque`** (nhanh hơn `LinkedList` mọi op).\
\
**Sự thật khó tin:** ngay cả `add(0, e)` trên `ArrayList` 10K element vẫn nhanh hơn `LinkedList` nhờ memcpy CPU hiện đại.\
\
**Tip:** biết trước size → `new ArrayList\u003c\u003e(expectedSize)` để tránh resize.\
\
Đừng chọn `LinkedList` chỉ vì \\"thêm/xoá đầu nhanh\\" — `ArrayDeque` luôn tốt hơn cho use case đó.

## Detailed Answer (EN)
| Operation | **ArrayList** (dynamic array) | **LinkedList** (doubly-linked) |\
|---|---|---|\
| `get(i)` | **O(1)** | **O(n)** — must traverse |\
| `add(0, e)` to head | O(n) — shift all | **O(1)** |\
| `add(e)` to end | O(1) amortized | O(1) |\
| Memory per element | ~4-8 bytes (reference) | ~24 bytes (node + 2 pointers) |\
| Cache locality | **Good** (contiguous) | Poor (scattered on heap) |\
\
**Which to use:**\
- **`ArrayList`:** default for any `List`. Cache-friendly — usually faster than `LinkedList` in practice.\
- **`LinkedList`:** *rarely needed*. For a FIFO queue/deque, use **`ArrayDeque`** (faster than `LinkedList` on every op).\
\
**Counter-intuitive truth:** even `add(0, e)` on an `ArrayList` with 10K elements beats `LinkedList` thanks to memcpy on modern CPUs.\
\
**Tip:** know the size upfront → `new ArrayList\u003c\u003e(expectedSize)` to avoid resizing.\
\
Do not pick `LinkedList` just for \\"fast head insert/delete\\" — `ArrayDeque` is always better.

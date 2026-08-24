---
id: arraylist-tu-tang-dung-luong-grow-resize-noi-bo-the-nao
position: backend
technology: collections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ArrayList tự tăng dung lượng (grow/resize) nội bộ thế nào?

## Question (EN)
How does ArrayList grow/resize its capacity internally?

## Đáp án chi tiết (VI)
`ArrayList` bọc một **mảng `Object[]`**. Khi `add` mà mảng đã đầy, nó **cấp mảng mới lớn hơn rồi copy** toàn bộ phần tử sang.\
\
- Khởi tạo mặc định là **rỗng**; lần `add` đầu tiên cấp dung lượng **10**.\
- Khi đầy, dung lượng mới ≈ **cũ × 1.5** (`oldCapacity + (oldCapacity \u003e\u003e 1)`), rồi `Arrays.copyOf`.\
\
```\
10 → 15 → 22 → 33 → 49 → ...\
```\
\
Vì sao 1.5 chứ không phải ×2: cân bằng giữa số lần copy và bộ nhớ phí. Nhờ nhân theo hệ số, `add` có chi phí **amortized O(1)** dù mỗi lần grow là O(n).\
\
**Tối ưu:** biết trước số phần tử → `new ArrayList\u003c\u003e(expectedSize)` để tránh nhiều lần resize + copy. `remove` ở giữa phải dịch trái các phần tử sau nó (O(n)) — đó là lý do `LinkedList` nhỉnh hơn ở chèn/xoá giữa, nhưng thua ở truy cập ngẫu nhiên.

## Detailed Answer (EN)
`ArrayList` wraps an **`Object[]` array**. When you `add` and the array is full, it **allocates a larger array and copies** all elements over.\
\
- The default is initialised **empty**; the first `add` allocates capacity **10**.\
- When full, the new capacity is ≈ **old × 1.5** (`oldCapacity + (oldCapacity \u003e\u003e 1)`), then `Arrays.copyOf`.\
\
```\
10 → 15 → 22 → 33 → 49 → ...\
```\
\
Why 1.5 and not ×2: it balances the number of copies against wasted memory. Because it grows by a factor, `add` costs **amortized O(1)** even though each grow is O(n).\
\
**Optimisation:** if you know the size in advance, use `new ArrayList\u003c\u003e(expectedSize)` to avoid repeated resize + copy. A middle `remove` shifts the trailing elements left (O(n)) — which is why `LinkedList` edges ahead for middle insert/delete, but loses on random access.

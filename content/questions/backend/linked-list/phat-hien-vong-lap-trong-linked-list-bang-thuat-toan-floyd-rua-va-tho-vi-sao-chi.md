---
id: phat-hien-vong-lap-trong-linked-list-bang-thuat-toan-floyd-rua-va-tho-vi-sao-chi
position: backend
technology: linked-list
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát hiện vòng lặp trong linked list bằng thuật toán Floyd (rùa và thỏ) — vì sao chỉ cần O(1) bộ nhớ?

## Question (EN)
Detect a cycle in a linked list using Floyd's tortoise-and-hare — why is O(1) space enough?

## Đáp án chi tiết (VI)
**Ý tưởng:** Dùng 2 con trỏ chạy khác tốc độ — `slow` đi 1 bước, `fast` đi 2 bước mỗi vòng. Nếu có vòng lặp, `fast` sẽ \\"đuổi kịp\\" và gặp `slow`; nếu không có thì `fast` chạm null.\
\
**Hình dung:** hai người chạy trên đường đua tròn, người nhanh gấp đôi sẽ bắt kịp người chậm trong tối đa 1 vòng — khoảng cách thu hẹp 1 đơn vị mỗi bước nên chắc chắn gặp.\
\
```ts\
function hasCycle(head: ListNode | null): boolean {\
  let slow = head, fast = head\
  while (fast \u0026\u0026 fast.next) {\
    slow = slow!.next\
    fast = fast.next.next\
    if (slow === fast) return true\
  }\
  return false\
}\
```\
\
**Độ phức tạp:** thời gian O(n), bộ nhớ **O(1)** — không cần Set lưu node đã thăm (cách Set là O(n) bộ nhớ).\
\
**Mở rộng:** muốn tìm node bắt đầu vòng lặp, sau khi gặp nhau cho 1 con trỏ về head rồi cho cả hai đi 1 bước/lần; điểm gặp lại là đầu vòng.

## Detailed Answer (EN)
**Idea:** Two pointers at different speeds — `slow` moves 1 step, `fast` moves 2 per iteration. With a cycle, `fast` catches up to `slow`; without one, `fast` hits null.\
\
**Picture it:** two runners on a circular track, the one twice as fast catches the slower within one loop — the gap shrinks by 1 each step so a meeting is guaranteed.\
\
```ts\
function hasCycle(head: ListNode | null): boolean {\
  let slow = head, fast = head\
  while (fast \u0026\u0026 fast.next) {\
    slow = slow!.next\
    fast = fast.next.next\
    if (slow === fast) return true\
  }\
  return false\
}\
```\
\
**Complexity:** time O(n), space **O(1)** — no visited-Set needed (the Set approach is O(n) space).\
\
**Extension:** to find the cycle's start, after they meet send one pointer back to head, then advance both 1 step at a time; their next meeting point is the cycle entrance.

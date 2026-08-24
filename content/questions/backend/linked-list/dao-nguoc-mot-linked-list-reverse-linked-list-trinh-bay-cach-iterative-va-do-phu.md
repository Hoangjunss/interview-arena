---
id: dao-nguoc-mot-linked-list-reverse-linked-list-trinh-bay-cach-iterative-va-do-phu
position: backend
technology: linked-list
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đảo ngược một linked list (Reverse Linked List) — trình bày cách iterative và độ phức tạp?

## Question (EN)
Reverse a linked list — describe the iterative approach and its complexity?

## Đáp án chi tiết (VI)
**Ý tưởng:** Duyệt một lần, lật từng con trỏ `next` để trỏ ngược lại. Cần 3 biến: `prev`, `curr`, và lưu tạm `next` trước khi ghi đè.\
\
**Các bước:** giữ `next = curr.next` (kẻo mất phần đuôi) → `curr.next = prev` → dời `prev = curr`, `curr = next`. Khi `curr` null thì `prev` chính là head mới.\
\
**Hình dung:** như đảo chiều một dãy mũi tên domino — phải nhớ ô kế tiếp trước khi xoay ô hiện tại.\
\
```ts\
class ListNode { val: number; next: ListNode | null = null; constructor(v: number){ this.val = v } }\
\
function reverseList(head: ListNode | null): ListNode | null {\
  let prev: ListNode | null = null\
  let curr = head\
  while (curr) {\
    const next = curr.next\
    curr.next = prev\
    prev = curr\
    curr = next\
  }\
  return prev\
}\
```\
\
**Độ phức tạp:** thời gian O(n), bộ nhớ O(1).\
\
**Lưu ý:** Bản đệ quy cũng O(n) nhưng tốn O(n) stack — phỏng vấn thường ưu tiên iterative cho an toàn stack overflow.

## Detailed Answer (EN)
**Idea:** Single pass, flip each `next` pointer backwards. Keep 3 variables: `prev`, `curr`, and a temp `next` saved before overwriting.\
\
**Steps:** save `next = curr.next` (else you lose the tail) → `curr.next = prev` → advance `prev = curr`, `curr = next`. When `curr` is null, `prev` is the new head.\
\
**Picture it:** reversing a row of domino arrows — you must remember the next node before rotating the current one.\
\
```ts\
class ListNode { val: number; next: ListNode | null = null; constructor(v: number){ this.val = v } }\
\
function reverseList(head: ListNode | null): ListNode | null {\
  let prev: ListNode | null = null\
  let curr = head\
  while (curr) {\
    const next = curr.next\
    curr.next = prev\
    prev = curr\
    curr = next\
  }\
  return prev\
}\
```\
\
**Complexity:** time O(n), space O(1).\
\
**Note:** The recursive version is also O(n) but uses O(n) stack — interviews usually prefer iterative to avoid stack overflow.

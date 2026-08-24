---
id: tron-hai-linked-list-da-sap-xep-merge-two-sorted-lists-cach-dung-dummy-node-de-g
position: backend
technology: linked-list
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trộn hai linked list đã sắp xếp (Merge Two Sorted Lists) — cách dùng dummy node để gọn code?

## Question (EN)
Merge two sorted linked lists — how does a dummy node simplify the code?

## Đáp án chi tiết (VI)
**Ý tưởng:** Duyệt song song hai list, mỗi bước chọn node nhỏ hơn nối vào đuôi kết quả. Dùng một **dummy node** đứng đầu để khỏi xử lý riêng trường hợp head — code sạch hơn hẳn.\
\
**Hình dung:** như trộn hai cọc bài đã xếp tăng dần — lật lá nhỏ hơn ở hai cọc bỏ xuống chồng mới.\
\
```ts\
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {\
  const dummy = new ListNode(0)\
  let tail = dummy\
  while (l1 \u0026\u0026 l2) {\
    if (l1.val \u003c= l2.val) { tail.next = l1; l1 = l1.next }\
    else { tail.next = l2; l2 = l2.next }\
    tail = tail.next\
  }\
  tail.next = l1 ?? l2 // nối phần còn dư\
  return dummy.next\
}\
```\
\
**Độ phức tạp:** thời gian O(n+m), bộ nhớ O(1) (chỉ nối lại node có sẵn, không tạo node mới).\
\
**Lưu ý:** Dòng `tail.next = l1 ?? l2` xử lý phần đuôi còn lại của list dài hơn — quên dòng này là lỗi thường gặp.

## Detailed Answer (EN)
**Idea:** Walk both lists in parallel, each step pick the smaller node and append it to the result tail. Use a **dummy node** at the front so you don't special-case the head — much cleaner code.\
\
**Picture it:** merging two ascending card piles — flip the smaller top card from either pile onto a new stack.\
\
```ts\
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {\
  const dummy = new ListNode(0)\
  let tail = dummy\
  while (l1 \u0026\u0026 l2) {\
    if (l1.val \u003c= l2.val) { tail.next = l1; l1 = l1.next }\
    else { tail.next = l2; l2 = l2.next }\
    tail = tail.next\
  }\
  tail.next = l1 ?? l2 // attach the remainder\
  return dummy.next\
}\
```\
\
**Complexity:** time O(n+m), space O(1) (we relink existing nodes, no new ones).\
\
**Note:** The `tail.next = l1 ?? l2` line attaches the leftover tail of the longer list — forgetting it is a classic bug.

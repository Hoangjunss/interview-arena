---
id: duyet-cay-nhi-phan-theo-tang-level-order-traversal-vi-sao-dung-bfs-voi-queue-va
position: backend
technology: tree---bfs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Duyệt cây nhị phân theo tầng (Level-Order Traversal) — vì sao dùng BFS với queue và làm sao tách từng tầng?

## Question (EN)
Binary tree level-order traversal — why BFS with a queue, and how to separate each level?

## Đáp án chi tiết (VI)
**Ý tưởng:** Duyệt theo chiều rộng (BFS) bằng **queue**. Mẹo tách tầng: trước mỗi vòng lặp, chụp lại `queue.length` — đó chính là số node của tầng hiện tại, xử đúng bấy nhiêu node rồi mới sang tầng sau.\
\
**Hình dung:** quét đèn pin từ gốc cây xuống, soi hết một hàng ngang rồi mới hạ xuống hàng dưới.\
\
```ts\
function levelOrder(root: TreeNode | null): number[][] {\
  const res: number[][] = []\
  if (!root) return res\
  const queue: TreeNode[] = [root]\
  while (queue.length) {\
    const size = queue.length // chốt số node của tầng này\
    const level: number[] = []\
    for (let i = 0; i \u003c size; i++) {\
      const node = queue.shift()!\
      level.push(node.val)\
      if (node.left) queue.push(node.left)\
      if (node.right) queue.push(node.right)\
    }\
    res.push(level)\
  }\
  return res\
}\
```\
\
**Độ phức tạp:** thời gian O(n), bộ nhớ O(n) (tầng rộng nhất có thể tới n/2 node).\
\
**Lưu ý:** `queue.shift()` của array JS là O(n); với input lớn nên dùng con trỏ `head` thay cho `shift` để giữ O(n) tổng thể.

## Detailed Answer (EN)
$83

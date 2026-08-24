---
id: phan-biet-3-cach-duyet-cay-nhi-phan-preorder-inorder-postorder
position: backend
technology: tree
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt 3 cách duyệt cây nhị phân: preorder, inorder, postorder?

## Question (EN)
Difference between preorder, inorder, postorder tree traversal?

## Đáp án chi tiết (VI)
Cùng DFS, chỉ khác **thứ tự thăm node** vs **đệ quy con**.\
\
**Preorder (NLR):** Node → Left → Right\
```ts\
function preorder(node) {\
  if (!node) return\
  visit(node)              // 1. Thăm node trước\
  preorder(node.left)      // 2. Rồi đi trái\
  preorder(node.right)     // 3. Cuối đi phải\
}\
```\
→ Dùng để **clone cây** hoặc serialize.\
\
**Inorder (LNR):** Left → Node → Right\
```ts\
function inorder(node) {\
  if (!node) return\
  inorder(node.left)\
  visit(node)\
  inorder(node.right)\
}\
```\
→ Trên BST cho ra **sorted order**.\
\
**Postorder (LRN):** Left → Right → Node\
```ts\
function postorder(node) {\
  if (!node) return\
  postorder(node.left)\
  postorder(node.right)\
  visit(node)\
}\
```\
→ Dùng để **delete cây** hoặc tính giá trị bottom-up (height, sum).

## Detailed Answer (EN)
All are DFS. Preorder (N,L,R) — clone/serialize. Inorder (L,N,R) — sorted order on BST. Postorder (L,R,N) — delete tree / bottom-up calculations.

---
id: virtual-dom-la-gi-va-reconciliation-hoat-dong-ra-sao
position: backend
technology: react
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual DOM là gì và reconciliation hoạt động ra sao?

## Question (EN)
What is the Virtual DOM and how does reconciliation work?

## Đáp án chi tiết (VI)
**Virtual DOM (VDOM)**: bản mô tả UI bằng object JS nhẹ, phản chiếu cây DOM thật. Thao tác trên object rẻ hơn nhiều so với thao tác trực tiếp trên DOM thật.\
\
Khi state/props đổi, React:\
1. Tạo cây VDOM mới cho lần render.\
2. **Reconciliation / diffing**: so cây mới với cây cũ để tìm khác biệt.\
3. **Commit**: chỉ áp **những thay đổi tối thiểu** vào DOM thật theo lô (batch).\
\
React dùng vài **heuristic** để diff nhanh (O(n) thay vì O(n³)):\
- Element **khác loại** (`\u003cdiv\u003e` → `\u003cspan\u003e`) → **thay cả cây con**, không cố khớp.\
- Cùng loại → giữ node, chỉ cập nhật attribute/con đổi.\
- Danh sách con → dựa vào **`key`** để nhận diện phần tử qua các lần render (vì sao `key` quan trọng).\
\
Mục đích không phải \\"nhanh hơn DOM\\" tuyệt đối, mà là **mô hình khai báo**: bạn mô tả UI mong muốn, React lo cách cập nhật hiệu quả.

## Detailed Answer (EN)
**Virtual DOM (VDOM)**: a lightweight JS-object description of the UI mirroring the real DOM tree. Operating on objects is far cheaper than touching the real DOM.\
\
When state/props change, React:\
1. Builds a new VDOM tree for the render.\
2. **Reconciliation / diffing**: compares the new tree with the old to find differences.\
3. **Commit**: applies only the **minimal changes** to the real DOM, in a batch.\
\
React uses a few **heuristics** to diff fast (O(n) instead of O(n³)):\
- Elements of a **different type** (`\u003cdiv\u003e` → `\u003cspan\u003e`) → **replace the whole subtree**, no attempt to match.\
- Same type → keep the node, update only changed attributes/children.\
- Child lists → rely on **`key`** to identify elements across renders (why `key` matters).\
\
The point is not being \\"faster than the DOM\\" absolutely, but a **declarative model**: you describe the desired UI, React handles updating it efficiently.

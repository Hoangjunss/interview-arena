---
id: khi-nao-dung-bfs-khi-nao-dfs
position: backend
technology: bfs-vs-dfs
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng BFS, khi nào DFS?

## Question (EN)
When to use BFS vs DFS?

## Đáp án chi tiết (VI)
**BFS (Breadth-First Search) — duyệt theo tầng:**\
- Cần **đường ngắn nhất** trong đồ thị không trọng số\
- Cần biết level/depth\
- Memory worst-case O(b^d) — width of level\
- Dùng **queue**\
\
**DFS (Depth-First Search) — đi sâu trước:**\
- Cần khám phá toàn bộ một nhánh\
- Phát hiện cycle, topo sort, connected components\
- Memory O(h) — chỉ stack depth\
- Dùng **recursion** hoặc explicit **stack**\
\
**Trực giác:**\
- BFS giống \\"rải tin nhắn ra toàn dân làng, mỗi vòng thêm 1 lớp\\"\
- DFS giống \\"đi mê cung — chui sâu vào 1 ngõ đến đụng tường mới quay lại\\"\
\
**Ví dụ cụ thể:**\
- Tìm shortest path Knight's moves → BFS\
- Detect cycle trong directed graph → DFS\
- Number of islands → cả 2 OK, DFS tự nhiên hơn

## Detailed Answer (EN)
BFS for shortest-path in unweighted graphs and level-order needs (uses queue). DFS for exploring full branches, cycle detection, topo sort (uses stack/recursion). Memory: BFS worst O(b^d), DFS O(h).

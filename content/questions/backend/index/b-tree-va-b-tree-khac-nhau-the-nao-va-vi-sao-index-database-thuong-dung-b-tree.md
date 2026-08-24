---
id: b-tree-va-b-tree-khac-nhau-the-nao-va-vi-sao-index-database-thuong-dung-b-tree
position: backend
technology: index
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
B-tree và B+ tree khác nhau thế nào, và vì sao index database thường dùng B+ tree?

## Question (EN)
How do a B-tree and a B+ tree differ, and why do database indexes usually use a B+ tree?

## Đáp án chi tiết (VI)
Cả hai là cây cân bằng, nhiều nhánh, giữ dữ liệu luôn sắp xếp và cho tra cứu ở độ sâu O(log n). Khác nhau ở chỗ lưu dữ liệu:\
\
- **B-tree**: khóa và con trỏ dữ liệu nằm ở **mọi node**, kể cả node trong.\
- **B+ tree**: node trong chỉ chứa **khóa để định tuyến**, còn **toàn bộ dữ liệu nằm ở node lá**, và **các lá được nối thành danh sách liên kết**.\
\
Vì sao index thích B+ tree:\
- Node trong không chứa data nên **chứa được nhiều khóa hơn mỗi trang** → cây thấp hơn → ít lần đọc đĩa hơn.\
- Lá nối chuỗi giúp **quét theo dải và ORDER BY** rất nhanh: tìm điểm đầu rồi đi dọc theo lá, không cần quay lại node trên.\
- Mọi tra cứu đều đi hết tới lá nên chi phí ổn định, dễ dự đoán.\
\
Trên thực tế, index mặc định của PostgreSQL, MySQL... là biến thể B+ tree đúng vì các lợi thế cho quét dải và số lần truy cập đĩa.

## Detailed Answer (EN)
Both are balanced, high-fanout trees that keep data sorted and allow O(log n) lookups. They differ in where data lives:\
\
- **B-tree**: keys and data pointers sit in **every node**, including internal nodes.\
- **B+ tree**: internal nodes hold only **routing keys**, **all data lives in the leaf nodes**, and **the leaves are linked together as a linked list**.\
\
Why indexes favor B+ trees:\
- Internal nodes carry no data, so they **fit more keys per page** → a shallower tree → fewer disk reads.\
- The linked leaves make **range scans and ORDER BY** very fast: find the start point, then walk along the leaves without returning to upper nodes.\
- Every lookup goes all the way to a leaf, so cost is uniform and predictable.\
\
In practice the default index in PostgreSQL, MySQL, etc. is a B+ tree variant precisely for these range-scan and disk-access advantages.

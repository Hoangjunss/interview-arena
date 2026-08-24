---
id: chuan-hoa-normalization-la-gi-giai-thich-1nf-2nf-3nf
position: backend
technology: normalization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chuẩn hóa (normalization) là gì? Giải thích 1NF, 2NF, 3NF.

## Question (EN)
What is normalization? Explain 1NF, 2NF and 3NF.

## Đáp án chi tiết (VI)
Chuẩn hóa là việc tổ chức bảng để **giảm dư thừa** và tránh **bất thường khi thêm/sửa/xóa** (update anomaly).\
\
- **1NF**: mỗi ô chứa **một giá trị atomic**, không có nhóm lặp hay mảng trong cột; mỗi hàng là duy nhất.\
- **2NF**: đạt 1NF **và** mọi cột non-key phụ thuộc vào **toàn bộ** khóa chính (loại phụ thuộc riêng vào một phần của composite key).\
- **3NF**: đạt 2NF **và** không có **phụ thuộc bắc cầu** (cột non-key phụ thuộc vào cột non-key khác) → mọi cột chỉ phụ thuộc trực tiếp vào khóa.\
\
Hình dung 3NF: \\"mỗi thuộc tính phụ thuộc vào khóa, toàn bộ khóa, và chỉ khóa\\". Cao hơn có **BCNF** — bản chặt hơn 3NF: với mọi phụ thuộc hàm X → Y thì X phải là super key; phỏng vấn thường dừng ở 3NF.

## Detailed Answer (EN)
Normalization structures tables to **reduce redundancy** and avoid **insert/update/delete anomalies**.\
\
- **1NF**: each cell holds a **single atomic value** — no repeating groups or arrays in a column; each row is unique.\
- **2NF**: in 1NF **and** every non-key column depends on the **whole** primary key (removes partial dependency on part of a composite key).\
- **3NF**: in 2NF **and** no **transitive dependency** (a non-key column depending on another non-key column) → every column depends directly on the key.\
\
Mnemonic for 3NF: \\"every attribute depends on the key, the whole key, and nothing but the key.\\" Higher forms exist — **BCNF** is a stricter 3NF: for every functional dependency X → Y, X must be a super key — but interviews usually stop at 3NF.

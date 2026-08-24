---
id: self-join-la-gi-va-khi-nao-dung
position: backend
technology: joins
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Self join là gì và khi nào dùng?

## Question (EN)
What is a self join and when do you use it?

## Đáp án chi tiết (VI)
Self join là **ghép một bảng với chính nó** — dùng hai bí danh (alias) khác nhau cho cùng bảng như thể là hai bảng riêng. Dùng khi các hàng trong **cùng một bảng** có quan hệ với nhau.\
\
Ví dụ kinh điển — quan hệ nhân viên–quản lý (cả hai đều là hàng của `employees`, quản lý được trỏ bằng `manager_id`):\
\
```sql\
SELECT e.name AS employee, m.name AS manager\
FROM employees e\
LEFT JOIN employees m ON e.manager_id = m.id;\
```\
\
(Dùng `LEFT JOIN` để giữ cả người **không có** quản lý — vd CEO.)\
\
Các tình huống hay dùng:\
- Cấu trúc **phân cấp** trong một bảng: nhân viên–sếp, danh mục cha–con.\
- Tìm **cặp** hàng liên quan: hai sản phẩm cùng giá, hai người cùng thành phố (`a.id \u003c b.id` để tránh trùng cặp và tự-ghép).\
\
Bản chất chỉ là JOIN bình thường; điểm khác duy nhất là **bắt buộc dùng alias** để phân biệt hai \\"bản sao\\" của bảng. Quan hệ phân cấp sâu/không giới hạn cấp thì cần recursive CTE thay vì self join một tầng.

## Detailed Answer (EN)
A self join **joins a table to itself** — using two different aliases for the same table as if they were two separate tables. Use it when rows within the **same table** relate to each other.\
\
Classic example — an employee-manager relationship (both are rows of `employees`, the manager referenced by `manager_id`):\
\
```sql\
SELECT e.name AS employee, m.name AS manager\
FROM employees e\
LEFT JOIN employees m ON e.manager_id = m.id;\
```\
\
(Use `LEFT JOIN` to keep people with **no** manager — e.g. the CEO.)\
\
Common situations:\
- **Hierarchies** within one table: employee-boss, parent-child categories.\
- Finding related **pairs**: two products at the same price, two people in the same city (`a.id \u003c b.id` to avoid duplicate pairs and self-pairing).\
\
Underneath it is just an ordinary JOIN; the only twist is that **aliases are required** to distinguish the two \\"copies\\" of the table. Deep/unbounded hierarchies need a recursive CTE rather than a single-level self join.

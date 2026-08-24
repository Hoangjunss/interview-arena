---
id: thu-tu-thuc-thi-logic-cua-mot-cau-select-la-gi-vi-sao-no-khac-thu-tu-ban-viet
position: backend
technology: query-semantics
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thứ tự thực thi logic của một câu SELECT là gì? Vì sao nó khác thứ tự bạn viết?

## Question (EN)
What is the logical execution order of a SELECT statement, and why does it differ from the written order?

## Đáp án chi tiết (VI)
Câu SELECT được **viết** theo thứ tự `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`, nhưng được **hiểu theo logic** gần như ngược lại:\
\
1. `FROM` + `JOIN` — dựng tập dòng nguồn.\
2. `WHERE` — lọc từng dòng thô.\
3. `GROUP BY` — gom dòng thành nhóm.\
4. `HAVING` — lọc trên nhóm (được dùng hàm tổng hợp).\
5. `SELECT` — tính biểu thức, đặt alias.\
6. `DISTINCT`.\
7. `ORDER BY` — sắp xếp kết quả.\
8. `LIMIT` / `OFFSET` — cắt lấy phần cần.\
\
Đây là **mô hình ngữ nghĩa**, không phải kế hoạch thực thi vật lý: optimizer được phép đảo thứ tự, đẩy filter xuống dưới join, miễn kết quả không đổi.\
\
Hai hệ quả hay bị hỏi tiếp:\
- Alias đặt ở `SELECT` **chưa tồn tại** khi `WHERE` chạy, nhưng đã có khi `ORDER BY` chạy.\
- `WHERE` không dùng được `SUM()`/`COUNT()` vì lúc đó nhóm chưa hình thành — phải dùng `HAVING`.

## Detailed Answer (EN)
A SELECT is **written** as `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`, but is **logically evaluated** in nearly the reverse order:\
\
1. `FROM` + `JOIN` — build the source row set.\
2. `WHERE` — filter individual raw rows.\
3. `GROUP BY` — collapse rows into groups.\
4. `HAVING` — filter groups (aggregates allowed here).\
5. `SELECT` — evaluate expressions, assign aliases.\
6. `DISTINCT`.\
7. `ORDER BY` — sort the result.\
8. `LIMIT` / `OFFSET` — slice it.\
\
This is a **semantic model**, not the physical plan: the optimizer may reorder steps or push filters below joins as long as the result is unchanged.\
\
Two consequences interviewers follow up on:\
- An alias defined in `SELECT` does **not exist** yet when `WHERE` runs, but does exist by the time `ORDER BY` runs.\
- `WHERE` cannot reference `SUM()`/`COUNT()` because no groups exist at that point — use `HAVING`.

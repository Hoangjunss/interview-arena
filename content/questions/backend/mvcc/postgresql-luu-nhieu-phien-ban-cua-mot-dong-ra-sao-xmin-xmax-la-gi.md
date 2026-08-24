---
id: postgresql-luu-nhieu-phien-ban-cua-mot-dong-ra-sao-xmin-xmax-la-gi
position: backend
technology: mvcc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PostgreSQL lưu nhiều phiên bản của một dòng ra sao? `xmin`/`xmax` là gì?

## Question (EN)
How does PostgreSQL store multiple versions of a row? What are `xmin` and `xmax`?

## Đáp án chi tiết (VI)
PostgreSQL không sửa dòng tại chỗ. Mỗi `UPDATE` **ghi một phiên bản mới** của dòng (tuple mới) và đánh dấu phiên bản cũ là hết hiệu lực. `DELETE` chỉ đánh dấu, không xoá byte ngay.\
\
Mỗi tuple mang hai cột hệ thống:\
\
- **`xmin`** — id transaction đã tạo ra phiên bản này.\
- **`xmax`** — id transaction đã xoá/thay thế nó (0 nếu còn sống).\
\
```sql\
select xmin, xmax, id, status from orders where id = 7;\
```\
\
Khi một transaction đọc bảng, nó có một **snapshot** (tập transaction đang chạy tại thời điểm bắt đầu câu lệnh hoặc transaction). Một tuple được coi là **nhìn thấy được** nếu `xmin` đã commit và nằm trong tầm nhìn của snapshot, còn `xmax` thì chưa commit hoặc nằm ngoài tầm nhìn.\
\
Hệ quả thực tế:\
- **Đọc không chặn ghi và ghi không chặn đọc** — reader nhìn phiên bản cũ thay vì chờ lock.\
- Bảng bị `UPDATE` nhiều sẽ tích luỹ phiên bản chết → cần `VACUUM` dọn.\
- `count(*)` phải quét để xác định tuple nào còn nhìn thấy được, nên không có kết quả tức thời như một số DB khác.

## Detailed Answer (EN)
$86

---
id: clustered-index-va-non-clustered-index-khac-nhau-the-nao
position: backend
technology: indexing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Clustered index và non-clustered index khác nhau thế nào?

## Question (EN)
What is the difference between a clustered and a non-clustered index?

## Đáp án chi tiết (VI)
- **Clustered index**: quyết định **thứ tự vật lý lưu hàng** trên đĩa — dữ liệu bảng *chính là* leaf của index. Vì hàng chỉ có một cách sắp xếp vật lý nên **mỗi bảng chỉ một clustered index**. Tra cứu theo khóa clustered rất nhanh (dữ liệu nằm ngay đó), range query trên khóa này cũng nhanh.\
- **Non-clustered (secondary) index**: cấu trúc **tách rời**, chứa khóa index + **con trỏ** tới hàng thật; một bảng có **nhiều** index loại này. Tra cứu phải qua thêm một bước \\"nhảy\\" tới hàng (trừ khi là covering index).\
\
Khác biệt theo hệ:\
- **SQL Server / MySQL InnoDB**: bảng lưu **clustered theo primary key**; index khác là non-clustered trỏ về PK.\
- **PostgreSQL**: bảng là **heap không sắp xếp**; mọi index đều là dạng secondary trỏ tới vị trí hàng (không có clustered index thường trực — lệnh `CLUSTER` chỉ sắp xếp một lần, không tự duy trì).\
\
Ý nghĩa thiết kế: chọn PK/clustered key hợp lý (đơn điệu tăng để tránh phân mảnh) vì nó ảnh hưởng cả cách lưu vật lý.

## Detailed Answer (EN)
$86

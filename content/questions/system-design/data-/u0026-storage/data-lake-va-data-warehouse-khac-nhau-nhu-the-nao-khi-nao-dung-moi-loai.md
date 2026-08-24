---
id: data-lake-va-data-warehouse-khac-nhau-nhu-the-nao-khi-nao-dung-moi-loai
position: system-design
technology: data-\u0026-storage
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Data Lake và Data Warehouse khác nhau như thế nào? Khi nào dùng mỗi loại?

## Question (EN)
How do Data Lake and Data Warehouse differ? When should you use each?

## Đáp án chi tiết (VI)
Data Warehouse là repository lưu structured, processed data được tổ chức theo schema cụ thể (star/snowflake schema) cho business intelligence và SQL analytics – data được ETL (Extract, Transform, Load) trước khi load vào. \
\
**Ví dụ:** Amazon Redshift, Google BigQuery, Snowflake. Data Lake là repository lưu raw data ở bất kỳ format nào (structured, semi-structured, unstructured) ở quy mô massive – schema được áp dụng khi đọc (schema-on-read) thay vì khi ghi. \
\
**Ví dụ:** AWS S3 + Glue + Athena, Azure Data Lake, Hadoop HDFS. Data Warehouse dùng khi: BI dashboards, regular business reports, data analysts cần SQL queries dễ dàng, data quality quan trọng. Data Lake dùng khi: data science và ML cần raw data, lưu trữ tất cả data để phân tích sau (không biết trước cần gì), log files, clickstream data. Data Lakehouse là trend mới (Databricks Delta Lake, Apache Iceberg) kết hợp cả hai: lưu raw data trong object storage nhưng có ACID transactions, schema enforcement, và query performance tốt như warehouse.

## Detailed Answer (EN)
$83

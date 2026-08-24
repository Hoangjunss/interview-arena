---
id: schema-trong-graphql-la-gi-va-vi-sao-no-quan-trong
position: backend
technology: schema
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Schema trong GraphQL là gì và vì sao nó quan trọng?

## Question (EN)
What is a GraphQL schema and why does it matter?

## Đáp án chi tiết (VI)
Schema là **contract** mô tả mọi kiểu, field và tham số mà client truy vấn được. Cả hai phía dựa vào nó, nên truy vấn sai tên field hay sai kiểu bị từ chối trước khi thực thi, và mọi công cụ codegen, autocomplete trong editor, docs tự sinh đều lấy từ đây.\
\
Điểm cần tách bạch: schema mô tả **API** chứ không phản chiếu cấu trúc lưu trữ. Sao chép nguyên bảng database thành kiểu GraphQL là sai lầm phổ biến vì nó rò rỉ chi tiết lưu trữ và khiến việc đổi bảng breaking change với client.\
\
Một kiểu trong schema có thể gộp dữ liệu từ nhiều bảng hoặc từ dịch vụ bên ngoài. Thực hành nên có là đưa schema vào CI và chặn các breaking change trước khi hợp nhất.

## Detailed Answer (EN)
The schema is a **contract** describing every type, field and argument a client can query. Both sides rely on it, so wrong field names or types are rejected before execution, and code generators, editor autocomplete and generated documentation all derive from it.\
\
An important separation: the schema describes the **API**, not the storage layout. Copying database tables into GraphQL types is a common mistake because it leaks storage details and makes table changes break the client contract.\
\
One schema type can combine data from several tables or external services. A practice worth having is putting the schema in CI and blocking breaking changes before merge.

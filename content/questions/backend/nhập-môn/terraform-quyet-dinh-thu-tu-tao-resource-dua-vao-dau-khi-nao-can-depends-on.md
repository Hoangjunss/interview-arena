---
id: terraform-quyet-dinh-thu-tu-tao-resource-dua-vao-dau-khi-nao-can-depends-on
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Terraform quyết định thứ tự tạo resource dựa vào đâu? Khi nào cần `depends_on`?

## Question (EN)
How does Terraform decide creation order, and when do you need `depends_on`?

## Đáp án chi tiết (VI)
Dựa vào **dependency graph** suy ra từ tham chiếu giữa các resource, **không phải thứ tự viết trong file**. Resource không phụ thuộc nhau được tạo song song.\
\
```hcl\
resource \\"aws_subnet\\" \\"app\\" {\
  vpc_id = aws_vpc.main.id      # implicit dependency, đủ rồi\
}\
```\
\
`depends_on` chỉ cần khi có phụ thuộc **ẩn** mà Terraform không thấy qua tham chiếu:\
\
```hcl\
resource \\"aws_instance\\" \\"app\\" {\
  depends_on = [aws_iam_role_policy.s3_access]  # app đọc S3 lúc boot\
}\
```\
\
Lạm dụng `depends_on` làm graph tuần tự hoá không cần thiết nên apply chậm hẳn. Ưu tiên tham chiếu attribute thật, chỉ dùng `depends_on` khi đã xác định được đúng một phụ thuộc ẩn.\
\
Hệ quả của mô hình declarative: thao tác kiểu quy trình (chạy migration, gọi lệnh trong máy) không hợp, chúng thuộc về pipeline hoặc image dựng sẵn.

## Detailed Answer (EN)
From the **dependency graph** derived from references between resources, **not file order**. Independent resources are created in parallel.\
\
```hcl\
resource \\"aws_subnet\\" \\"app\\" {\
  vpc_id = aws_vpc.main.id      # implicit dependency, enough on its own\
}\
```\
\
`depends_on` is only for **hidden** dependencies Terraform cannot see through references:\
\
```hcl\
resource \\"aws_instance\\" \\"app\\" {\
  depends_on = [aws_iam_role_policy.s3_access]  # the app reads S3 at boot\
}\
```\
\
Overusing `depends_on` serialises the graph unnecessarily and slows applies. Prefer real attribute references; reach for `depends_on` only once you have identified a genuine hidden dependency.\
\
A consequence of the declarative model: procedural steps (running migrations, executing commands in a machine) fit poorly — they belong to the pipeline or a prebuilt image.

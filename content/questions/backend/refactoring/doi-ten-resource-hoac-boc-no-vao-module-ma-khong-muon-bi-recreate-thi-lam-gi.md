---
id: doi-ten-resource-hoac-boc-no-vao-module-ma-khong-muon-bi-recreate-thi-lam-gi
position: backend
technology: refactoring
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đổi tên resource hoặc bọc nó vào module mà không muốn bị recreate thì làm gì?

## Question (EN)
How do you rename a resource or wrap it in a module without recreating it?

## Đáp án chi tiết (VI)
Khai báo `moved` block. Terraform nhận diện resource theo **địa chỉ trong config**, nên đổi tên mà không khai báo bị hiểu là destroy cái cũ + create cái mới.\
\
```hcl\
moved {\
  from = aws_instance.api\
  to   = module.api_service.aws_instance.this\
}\
```\
\
Cách cũ là chạy lệnh trên state:\
\
```bash\
terraform state mv aws_instance.api module.api_service.aws_instance.this\
```\
\
`moved` block tốt hơn vì nó được review trong PR, chạy tự động trong CI, và ai đọc lịch sử cũng thấy việc di chuyển đã xảy ra. `state mv` chạy trên laptop một người thì không ai biết.\
\
Quy trình refactor an toàn: viết cấu trúc mới, thêm `moved`, chạy plan và kiểm tra output **không có create/destroy nào**, rồi mới apply.\
\
Refactor từng phần nhỏ và apply ngay, đừng gom một đợt lớn tạo ra plan dài mấy trăm dòng mà không ai đọc hết.

## Detailed Answer (EN)
Declare a `moved` block. Terraform identifies resources by their **address in the configuration**, so an undeclared rename reads as destroy plus create.\
\
```hcl\
moved {\
  from = aws_instance.api\
  to   = module.api_service.aws_instance.this\
}\
```\
\
The older way operates on state directly:\
\
```bash\
terraform state mv aws_instance.api module.api_service.aws_instance.this\
```\
\
The `moved` block is better because it is reviewed in a PR, runs automatically in CI, and anyone reading history sees the move happened. A `state mv` on one laptop leaves no trace.\
\
A safe refactoring procedure: write the new structure, add `moved`, run a plan and verify the output contains **no creates or destroys**, then apply.\
\
Refactor in small pieces and apply each one, rather than batching a change into a several-hundred-line plan nobody reads fully.

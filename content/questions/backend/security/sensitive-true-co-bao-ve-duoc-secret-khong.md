---
id: sensitive-true-co-bao-ve-duoc-secret-khong
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`sensitive = true` có bảo vệ được secret không?

## Question (EN)
Does `sensitive = true` protect a secret?

## Đáp án chi tiết (VI)
Không. Nó chỉ **che giá trị trong output và log**, hiện ra `(sensitive value)`. **State vẫn lưu plaintext.**\
\
```hcl\
variable \\"db_password\\" { type = string, sensitive = true }\
output \\"endpoint\\" { value = aws_db_instance.main.address }\
# terraform output -json van in ra duoc gia tri that\
```\
\
Đây là hiểu nhầm rất phổ biến và là nguyên nhân nhiều vụ leak: team tưởng đánh dấu là đủ rồi để state bucket cho cả công ty đọc.\
\
Cách xử lý secret tốt hơn, theo thứ tự ưu tiên:\
1. **Cho dịch vụ tự sinh** — `manage_master_user_password = true` để AWS giữ trong Secrets Manager, Terraform chỉ giữ ARN.\
2. **Đọc động lúc apply** bằng `data \\"aws_secretsmanager_secret_version\\"`.\
3. Tạo resource bằng Terraform nhưng set giá trị secret bằng tool khác.\
\
Chỗ leak hay gặp nhất là log CI: bật `TF_LOG=DEBUG` để debug sẽ in ra thứ mà output bình thường đã che, và log CI thường được giữ rất lâu.

## Detailed Answer (EN)
No. It only **masks the value in output and logs**, showing `(sensitive value)`. **State still stores it in plaintext.**\
\
```hcl\
variable \\"db_password\\" { type = string, sensitive = true }\
output \\"endpoint\\" { value = aws_db_instance.main.address }\
# terraform output -json can still print the real value\
```\
\
This is a very common misunderstanding behind many leaks: the team assumes the marking is enough and leaves the state bucket readable company-wide.\
\
Better secret handling, in order of preference:\
1. **Let the service generate it** — `manage_master_user_password = true` keeps it in Secrets Manager and Terraform holds only the ARN.\
2. **Read it at apply time** through `data \\"aws_secretsmanager_secret_version\\"`.\
3. Create the resource with Terraform but set the secret value with another tool.\
\
The most frequent leak path is CI logs: enabling `TF_LOG=DEBUG` prints what normal output masks, and CI logs are usually retained for a long time.

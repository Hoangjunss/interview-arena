---
id: terraform-testing-terratest-checkov
position: devops
technology: terraform-iac
level: mid
tags: [terraform, testing, checkov, terratest]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những loại kiểm thử nào cho Terraform code? Phân biệt vai trò của `terraform validate`, Checkov, và Terratest.

## Question (EN)
What kinds of testing exist for Terraform code? Distinguish the roles of `terraform validate`, Checkov, and Terratest.

## Đáp án chi tiết (VI)
Terraform code cũng cần test như application code, nhưng vì bản chất là "apply thật lên hạ tầng", các lớp test thường tăng dần chi phí/thời gian chạy:

**1. `terraform validate` — kiểm tra cú pháp/tham chiếu (nhanh nhất, không cần cloud credentials):**
```bash
terraform validate
```
Chỉ bắt lỗi cú pháp HCL, tham chiếu biến sai, thiếu argument bắt buộc — **không** biết gì về policy bảo mật hay best practice cloud.

**2. `terraform fmt -check` — kiểm tra format đồng nhất trong CI:**
```bash
terraform fmt -check -recursive
```

**3. Static analysis / policy scanning (Checkov, tfsec, Trivy) — bắt lỗi bảo mật/best-practice mà không cần apply:**
```bash
checkov -d . --framework terraform
```
Output ví dụ:
```
Check: CKV_AWS_21: "Ensure the S3 bucket has versioning enabled"
    FAILED for resource: aws_s3_bucket.data
    File: /main.tf:10-13
```
Checkov quét code tĩnh, so khớp với **hàng trăm rule** có sẵn (mã hóa at-rest, public access, IAM quá rộng...) — chạy trong vài giây, phù hợp làm **gate bắt buộc** trong mọi PR trước khi merge.

**4. Terratest — integration test thật sự apply hạ tầng lên môi trường thử nghiệm rồi kiểm tra kết quả, sau đó destroy:**
```go
func TestTerraformVpcModule(t *testing.T) {
  terraformOptions := &terraform.Options{
    TerraformDir: "../modules/vpc",
    Vars: map[string]interface{}{
      "cidr_block": "10.0.0.0/16",
    },
  }
  defer terraform.Destroy(t, terraformOptions)
  terraform.InitAndApply(t, terraformOptions)

  vpcId := terraform.Output(t, terraformOptions, "vpc_id")
  assert.NotEmpty(t, vpcId)
  // có thể gọi thêm AWS SDK để verify VPC thật sự tồn tại đúng cấu hình
}
```
Terratest (viết bằng Go) thực sự chạy `apply` lên một tài khoản/môi trường test thật, kiểm tra output và cả gọi cloud SDK để xác minh resource thật tồn tại đúng, rồi tự động `destroy` để dọn dẹp — **chi phí cao hơn nhiều** (thời gian, tiền cloud) nên thường chỉ chạy khi merge vào main hoặc theo lịch, không chạy trên mọi commit.

**Bảng so sánh:**
| Công cụ | Tốc độ | Cần cloud credentials | Bắt được gì |
|---|---|---|---|
| `terraform validate` | Rất nhanh (giây) | Không | Lỗi cú pháp, tham chiếu |
| Checkov/tfsec | Nhanh (giây) | Không | Lỗi bảo mật/compliance theo rule tĩnh |
| Terratest | Chậm (phút) | Có | Lỗi logic thực tế, resource có hoạt động đúng không |

**Chiến lược test thực tế theo mô hình test pyramid:**
- Mọi PR: chạy `validate` + `fmt` + Checkov (nhanh, rẻ, bắt được phần lớn lỗi phổ biến).
- Merge vào main hoặc nightly: chạy Terratest cho các module quan trọng trên môi trường sandbox riêng.
- Trước khi apply production: `plan` được review bởi người, kèm theo policy-as-code (Sentinel/OPA) chặn tự động các thay đổi vi phạm rule nghiêm trọng (ví dụ xóa resource có tag `critical=true`).

**Gotcha:** Terratest tạo resource thật nên nếu test bị crash giữa chừng (trước khi tới dòng `defer terraform.Destroy`), resource **có thể bị bỏ quên** và tiếp tục tính phí — cần có job dọn dẹp định kỳ (ví dụ theo tag `test=true` + TTL) để tránh rò rỉ chi phí cloud từ môi trường test.

## Detailed Answer (EN)
Terraform code needs testing just like application code, but since it's fundamentally "apply for real against infrastructure," test layers typically increase in cost/runtime:

**1. `terraform validate` — syntax/reference checking (fastest, no cloud credentials needed):**
```bash
terraform validate
```
Only catches HCL syntax errors, bad variable references, missing required arguments — **doesn't** know anything about security policy or cloud best practices.

**2. `terraform fmt -check` — enforcing consistent formatting in CI:**
```bash
terraform fmt -check -recursive
```

**3. Static analysis / policy scanning (Checkov, tfsec, Trivy) — catching security/best-practice issues without applying:**
```bash
checkov -d . --framework terraform
```
Example output:
```
Check: CKV_AWS_21: "Ensure the S3 bucket has versioning enabled"
    FAILED for resource: aws_s3_bucket.data
    File: /main.tf:10-13
```
Checkov statically scans code against **hundreds of built-in rules** (encryption at rest, public access, overly broad IAM, etc.) — runs in seconds, making it well-suited as a **mandatory gate** on every PR before merging.

**4. Terratest — a real integration test that actually applies infrastructure to a test environment, verifies it, then destroys it:**
```go
func TestTerraformVpcModule(t *testing.T) {
  terraformOptions := &terraform.Options{
    TerraformDir: "../modules/vpc",
    Vars: map[string]interface{}{
      "cidr_block": "10.0.0.0/16",
    },
  }
  defer terraform.Destroy(t, terraformOptions)
  terraform.InitAndApply(t, terraformOptions)

  vpcId := terraform.Output(t, terraformOptions, "vpc_id")
  assert.NotEmpty(t, vpcId)
  // can also call the cloud SDK to verify the real VPC exists with the correct config
}
```
Terratest (written in Go) actually runs `apply` against a real test account/environment, checks outputs, and can call the cloud SDK to verify real resources exist correctly, then auto-`destroy`s to clean up — **much more expensive** (time, cloud spend), so it's usually run only on merge to main or on a schedule, not on every commit.

**Comparison:**
| Tool | Speed | Needs cloud credentials | Catches |
|---|---|---|---|
| `terraform validate` | Very fast (seconds) | No | Syntax, reference errors |
| Checkov/tfsec | Fast (seconds) | No | Security/compliance issues against static rules |
| Terratest | Slow (minutes) | Yes | Real logic bugs, whether resources actually behave correctly |

**A practical test-pyramid strategy:**
- Every PR: run `validate` + `fmt` + Checkov (fast, cheap, catches most common issues).
- Merge to main or nightly: run Terratest for critical modules against a dedicated sandbox environment.
- Before applying to production: a human-reviewed `plan`, plus policy-as-code (Sentinel/OPA) automatically blocking changes that violate critical rules (e.g., a policy blocking any destroy of a resource tagged `critical=true`).

**Gotcha:** Terratest creates real resources, so if a test crashes midway (before reaching the `defer terraform.Destroy` line), resources **can be left behind** and keep incurring cost — you need a periodic cleanup job (e.g., by a `test=true` tag + TTL) to avoid cloud cost leaks from test environments.

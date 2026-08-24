---
id: pulumi-vs-terraform-overview
position: devops
technology: terraform-iac
level: junior
tags: [pulumi, terraform, comparison]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pulumi khác Terraform ở điểm nào? Vì sao một số team chọn Pulumi thay vì Terraform?

## Question (EN)
How does Pulumi differ from Terraform? Why do some teams choose Pulumi over Terraform?

## Đáp án chi tiết (VI)
Cả Terraform và Pulumi đều là công cụ IaC theo mô hình **declarative với desired-state + diff engine**, nhưng khác nhau chủ yếu ở **ngôn ngữ cấu hình**.

**Terraform**: dùng **HCL** — một ngôn ngữ khai báo chuyên biệt (domain-specific language), không phải ngôn ngữ lập trình đầy đủ.
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}
```

**Pulumi**: dùng **ngôn ngữ lập trình thật** (TypeScript, Python, Go, C#, Java) — có thể dùng vòng lặp, hàm, class, import thư viện như code ứng dụng bình thường.
```typescript
import * as aws from "@pulumi/aws";

const web = new aws.ec2.Instance("web", {
  ami: "ami-0c55b159cbfafe1f0",
  instanceType: "t3.micro",
});
```

**So sánh chi tiết:**
| Tiêu chí | Terraform | Pulumi |
|---|---|---|
| Ngôn ngữ | HCL (DSL riêng) | Ngôn ngữ lập trình thật (TS, Python, Go...) |
| Logic phức tạp (loop, condition) | Hạn chế, dùng `for_each`/`count`/`dynamic` | Tự nhiên như viết code (for, if, function) |
| Testing | Terratest, checkov (bên ngoài) | Unit test bằng framework test của chính ngôn ngữ đó (Jest, pytest) |
| State | State file riêng (local/remote backend) | Pulumi Service (SaaS mặc định) hoặc self-hosted backend (S3, local) |
| Hệ sinh thái/tài liệu | Rất lớn, lâu đời, nhiều ví dụ có sẵn | Nhỏ hơn nhưng đang tăng nhanh |
| Đường cong học tập cho dev | Phải học HCL riêng | Tận dụng luôn kiến thức ngôn ngữ dev đã biết |

**Vì sao chọn Pulumi:**
- Team có nền tảng dev mạnh, muốn tái sử dụng logic phức tạp (vòng lặp lồng nhau, gọi hàm ngoài, xử lý exception) mà viết bằng HCL sẽ rất cồng kềnh.
- Muốn viết unit test cho infrastructure code bằng framework test quen thuộc thay vì công cụ riêng biệt.
- Muốn chia sẻ code/type giữa phần application và phần infrastructure (ví dụ cùng định nghĩa TypeScript interface).

**Vì sao vẫn chọn Terraform:**
- Hệ sinh thái provider và module lớn hơn, tài liệu/cộng đồng phong phú hơn, dễ tuyển người biết sẵn.
- Với hạ tầng chủ yếu là khai báo đơn giản (không cần logic phức tạp), HCL đủ dùng và **dễ đọc với người không phải dev thuần** (SRE, DevOps không code hàng ngày).
- Terraform Cloud/Enterprise có hệ sinh thái policy-as-code (Sentinel), cost estimation tích hợp sẵn từ lâu.

**Điểm chung dễ bị hỏi bẫy:** dù ngôn ngữ khác nhau, cả hai đều **không phải imperative thuần** — cả hai vẫn tính toán diff giữa desired state và current state trước khi thực thi, chỉ khác cách bạn *mô tả* desired state đó (bằng HCL tĩnh hay bằng code động).

## Detailed Answer (EN)
Both Terraform and Pulumi are IaC tools following a **declarative desired-state + diff engine** model, but they differ mainly in **configuration language**.

**Terraform**: uses **HCL** — a specialized declarative domain-specific language, not a full programming language.
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}
```

**Pulumi**: uses **a real programming language** (TypeScript, Python, Go, C#, Java) — you can use loops, functions, classes, and import libraries just like in application code.
```typescript
import * as aws from "@pulumi/aws";

const web = new aws.ec2.Instance("web", {
  ami: "ami-0c55b159cbfafe1f0",
  instanceType: "t3.micro",
});
```

**Detailed comparison:**
| Criteria | Terraform | Pulumi |
|---|---|---|
| Language | HCL (dedicated DSL) | Real programming language (TS, Python, Go...) |
| Complex logic (loops, conditionals) | Limited, via `for_each`/`count`/`dynamic` | Natural — write for/if/functions like normal code |
| Testing | Terratest, Checkov (external) | Unit tests using the language's own test framework (Jest, pytest) |
| State | Its own state file (local/remote backend) | Pulumi Service (default SaaS) or a self-hosted backend (S3, local) |
| Ecosystem/docs | Very large, mature, many ready-made examples | Smaller but growing fast |
| Learning curve for devs | Must learn HCL separately | Reuses the language knowledge devs already have |

**Why choose Pulumi:**
- The team has strong dev skills and wants to reuse complex logic (nested loops, external function calls, exception handling) that would be unwieldy in HCL.
- Wants to write unit tests for infrastructure code using a familiar test framework instead of a separate tool.
- Wants to share code/types between the application layer and the infrastructure layer (e.g., a shared TypeScript interface).

**Why teams still choose Terraform:**
- A larger provider/module ecosystem, richer docs and community, easier to hire people who already know it.
- For infrastructure that's mostly simple declarations (no complex logic needed), HCL is sufficient and **more readable for non-developers** (SREs/DevOps who don't code daily).
- Terraform Cloud/Enterprise has a mature policy-as-code ecosystem (Sentinel) and built-in cost estimation.

**A commonly-missed trick point:** despite the language difference, neither tool is purely imperative — both still compute a diff between desired and current state before executing; they only differ in *how* you describe that desired state (static HCL vs. dynamic code).

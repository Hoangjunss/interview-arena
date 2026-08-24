---
id: what-is-infrastructure-as-code
position: devops
technology: terraform-iac
level: junior
tags: [iac, fundamentals, terraform]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Infrastructure as Code (IaC) là gì? Vì sao các đội DevOps lại dùng IaC thay vì tạo hạ tầng thủ công qua console?

## Question (EN)
What is Infrastructure as Code (IaC)? Why do DevOps teams use IaC instead of manually provisioning infrastructure through a cloud console?

## Đáp án chi tiết (VI)
**Infrastructure as Code (IaC)** là cách quản lý và cấp phát hạ tầng (server, network, database, load balancer...) bằng file cấu hình/code thay vì thao tác tay qua giao diện web (console) hoặc CLI từng lệnh một.

**Vì sao dùng IaC:**
- **Tái lập được (reproducibility)**: Cùng một file code có thể tạo ra môi trường dev/staging/prod giống hệt nhau, tránh tình trạng "nó chạy trên máy tôi" ở cấp hạ tầng.
- **Version control**: Code hạ tầng được lưu trong Git, có lịch sử thay đổi, code review, rollback dễ dàng.
- **Tốc độ & tự động hóa**: Tạo hàng trăm resource trong vài phút, tích hợp vào CI/CD pipeline.
- **Giảm lỗi con người**: Không còn việc quên một setting nhỏ khi click qua console, hoặc mỗi kỹ sư config một kiểu.
- **Tài liệu sống (living documentation)**: Code chính là tài liệu mô tả hạ tầng đang chạy, luôn cập nhật vì nó chính là nguồn tạo ra hạ tầng đó.

**Hai trường phái chính:**
| Loại | Đại diện | Đặc điểm |
|---|---|---|
| Declarative (khai báo) | Terraform, Pulumi (phần lớn), CloudFormation | Mô tả *trạng thái mong muốn*, công cụ tự tính cách đạt được |
| Imperative (mệnh lệnh) | Ansible (một phần), shell script | Mô tả *từng bước* cần thực hiện theo thứ tự |

**Ví dụ nhanh với Terraform** (declarative — chỉ cần khai báo "tôi muốn 1 EC2 instance"):
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = {
    Name = "web-server"
  }
}
```
Chạy `terraform apply`, Terraform tự so sánh trạng thái hiện tại với trạng thái mong muốn và quyết định cần tạo/sửa/xóa gì.

**Điểm cần lưu ý (pitfall thường gặp của người mới):** IaC không tự động nghĩa là an toàn — nếu file `.tf` hoặc playbook chứa lỗi logic (ví dụ xóa nhầm resource do đổi tên), lệnh `apply` sẽ thực thi lỗi đó trên *toàn bộ* môi trường rất nhanh, nên luôn cần review kỹ `plan`/`diff` trước khi apply, đặc biệt với production.

**Một pitfall khác dễ bị bỏ qua:** nếu ai đó vẫn "tiện tay" sửa hạ tầng qua console (ví dụ đổi security group rule bằng tay để fix gấp sự cố) mà không cập nhật lại code, hạ tầng thực tế sẽ **trôi (drift)** khỏi những gì IaC mô tả. Lần `apply` tiếp theo, Terraform có thể âm thầm revert thay đổi tay đó, gây ra sự cố tái diễn. Vì vậy nguyên tắc bắt buộc khi dùng IaC là "mọi thay đổi hạ tầng đều phải đi qua code + pull request", console chỉ dùng để **xem**, không dùng để **sửa**.

## Detailed Answer (EN)
**Infrastructure as Code (IaC)** is the practice of managing and provisioning infrastructure (servers, networking, databases, load balancers, etc.) through configuration files/code instead of manual clicks in a web console or one-off CLI commands.

**Why teams use IaC:**
- **Reproducibility**: The same code can spin up identical dev/staging/prod environments, eliminating "it works on my machine" at the infrastructure level.
- **Version control**: Infrastructure code lives in Git — full history, code review, easy rollback.
- **Speed & automation**: Hundreds of resources can be created in minutes, and IaC integrates naturally into CI/CD pipelines.
- **Fewer human errors**: No more forgetting a small setting while clicking through a console, or every engineer configuring things differently.
- **Living documentation**: The code itself describes the running infrastructure and stays accurate because it's the actual source that created it.

**Two main paradigms:**
| Type | Examples | Characteristics |
|---|---|---|
| Declarative | Terraform, Pulumi (mostly), CloudFormation | You describe the *desired state*; the tool figures out how to get there |
| Imperative | Ansible (partly), shell scripts | You describe the *exact steps* to execute, in order |

**Quick Terraform example** (declarative — you just declare "I want 1 EC2 instance"):
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = {
    Name = "web-server"
  }
}
```
Running `terraform apply` makes Terraform diff the current state against the desired state and decide what to create/modify/destroy.

**A common gotcha for beginners:** IaC being automated doesn't mean it's automatically safe — a logic bug in a `.tf` file or playbook (e.g., accidentally deleting a resource due to a rename) will get executed against the *entire* environment very quickly. Always carefully review `plan`/diff output before applying, especially in production.

**Another easily-missed pitfall:** if someone "quickly" fixes infrastructure through the console (e.g., tweaking a security group rule by hand during an incident) without updating the code, the real infrastructure **drifts** away from what the IaC describes. On the next `apply`, Terraform may silently revert that manual change, reintroducing the incident. The hard rule with IaC is therefore "every infrastructure change goes through code + pull request" — the console is for **viewing**, never for **editing**.

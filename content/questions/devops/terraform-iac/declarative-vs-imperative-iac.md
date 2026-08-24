---
id: declarative-vs-imperative-iac
position: devops
technology: terraform-iac
level: junior
tags: [iac, terraform, ansible, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt cách tiếp cận declarative (khai báo) và imperative (mệnh lệnh) trong IaC. Terraform và Ansible thuộc trường phái nào?

## Question (EN)
Distinguish between the declarative and imperative approaches in IaC. Which paradigm do Terraform and Ansible belong to?

## Đáp án chi tiết (VI)
**Declarative (khai báo):** Bạn mô tả **trạng thái mong muốn cuối cùng** (desired state), không quan tâm phải làm những bước nào để đạt được nó — công cụ tự tính toán.

**Imperative (mệnh lệnh):** Bạn viết **từng bước cụ thể** cần thực hiện theo đúng thứ tự, giống viết một script.

**Ví dụ minh họa cùng một mục tiêu "đảm bảo có 3 web server":**

Declarative (Terraform):
```hcl
resource "aws_instance" "web" {
  count         = 3
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}
```
Chạy lại bao nhiêu lần cũng ra kết quả giống nhau (idempotent) — nếu đã có 3 instance, Terraform không làm gì thêm; nếu có 5, nó sẽ destroy bớt 2.

Imperative (shell script kiểu cũ):
```bash
for i in 1 2 3; do
  aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --count 1
done
```
Nếu chạy lại script này, nó sẽ **tạo thêm 3 instance nữa** (không idempotent) trừ khi bạn tự viết logic kiểm tra.

**Terraform và Pulumi**: chủ yếu **declarative** — Terraform dùng HCL để khai báo state; Pulumi dùng ngôn ngữ lập trình thật (TypeScript, Python, Go) nhưng vẫn theo mô hình khai báo "desired state + diff engine".

**Ansible**: là một dạng **lai (hybrid)**, thiên về declarative ở cấp độ module nhưng thực thi theo kiểu imperative — playbook chạy **tuần tự từng task theo thứ tự viết trong file YAML**, và mỗi module (ví dụ `apt`, `service`, `file`) được thiết kế idempotent (tự kiểm tra trạng thái trước khi hành động). Vì vậy Ansible thường được gọi là "declarative modules, imperative execution order".

**So sánh nhanh:**
| Tiêu chí | Declarative (Terraform) | Imperative (script/Ansible tasks) |
|---|---|---|
| Bạn khai báo | Kết quả mong muốn | Từng bước thực hiện |
| Idempotency | Có sẵn (built-in) | Phải tự đảm bảo (hoặc dùng module idempotent) |
| Thứ tự thực thi | Tự suy ra qua dependency graph | Theo đúng thứ tự bạn viết |
| Dễ đọc trạng thái hiện tại | Dễ (nhìn code = biết state mong muốn) | Khó hơn (phải chạy để biết) |

**Khi nào chọn cái nào:** Declarative phù hợp để **provisioning** hạ tầng (tạo VM, network, DB) vì cần tính idempotent và khả năng "diff" rõ ràng. Imperative (Ansible, shell) phù hợp hơn cho **configuration management** — cài đặt phần mềm, chỉnh config file bên trong OS, chạy các bước có thứ tự phức tạp (rolling restart, blue-green switch).

**Gotcha thực tế với Ansible:** dù các module chuẩn (`apt`, `copy`, `template`, `service`...) đều idempotent, module `command` và `shell` thì **không** — chạy `shell: "echo abc >> file.txt"` nhiều lần sẽ append nhiều lần. Đây là lỗi phổ biến của người mới viết playbook: lạm dụng `shell`/`command` thay vì module chuyên dụng, khiến toàn bộ playbook mất tính idempotent dù bản chất Ansible được thiết kế để idempotent. Cách khắc phục: dùng `creates`/`removes` argument, hoặc `changed_when`/`when` để tự kiểm soát điều kiện chạy.

## Detailed Answer (EN)
**Declarative:** You describe the **desired end state**, without caring about the steps needed to reach it — the tool figures that out.

**Imperative:** You write **specific steps** to execute in a particular order, like a script.

**Example — same goal "ensure 3 web servers exist":**

Declarative (Terraform):
```hcl
resource "aws_instance" "web" {
  count         = 3
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
}
```
Running this any number of times produces the same result (idempotent) — if 3 instances already exist, Terraform does nothing further; if there are 5, it destroys 2.

Imperative (old-style shell script):
```bash
for i in 1 2 3; do
  aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --count 1
done
```
Re-running this script **creates 3 more instances** (not idempotent) unless you write your own check logic.

**Terraform and Pulumi**: mainly **declarative** — Terraform uses HCL to declare state; Pulumi uses a real programming language (TypeScript, Python, Go) but still follows a "desired state + diff engine" model.

**Ansible**: a **hybrid** — declarative at the module level but executed imperatively — a playbook runs **tasks sequentially in the order written in the YAML file**, and each module (e.g., `apt`, `service`, `file`) is designed to be idempotent (checks current state before acting). Hence Ansible is often described as "declarative modules, imperative execution order."

**Quick comparison:**
| Criteria | Declarative (Terraform) | Imperative (scripts/Ansible tasks) |
|---|---|---|
| You declare | The desired result | The steps to take |
| Idempotency | Built-in | Must be ensured yourself (or via idempotent modules) |
| Execution order | Inferred via dependency graph | Exactly as you wrote it |
| Reading current state | Easy (code = desired state) | Harder (must run to know) |

**When to choose which:** Declarative fits **provisioning** infrastructure (VMs, networks, DBs) because it needs idempotency and a clear "diff" capability. Imperative (Ansible, shell) fits better for **configuration management** — installing software, editing config files inside the OS, or running complex ordered steps (rolling restarts, blue-green switchovers).

**Real-world Ansible gotcha:** even though standard modules (`apt`, `copy`, `template`, `service`, etc.) are idempotent, the `command` and `shell` modules are **not** — running `shell: "echo abc >> file.txt"` repeatedly keeps appending. This is a very common beginner mistake: overusing `shell`/`command` instead of a purpose-built module, which quietly breaks idempotency for the whole playbook even though Ansible as a whole is designed to be idempotent. Fix it with the `creates`/`removes` arguments, or guard the task with `changed_when`/`when`.

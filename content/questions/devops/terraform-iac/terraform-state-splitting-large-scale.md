---
id: terraform-state-splitting-large-scale
position: devops
technology: terraform-iac
level: senior
tags: [terraform, state, scaling, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi hạ tầng quản lý bởi Terraform phát triển tới hàng nghìn resource trong một state, những vấn đề gì sẽ xuất hiện? Thiết kế lại kiến trúc state như thế nào để hệ thống vẫn scale được?

## Question (EN)
As infrastructure managed by Terraform grows to thousands of resources in one state, what problems emerge? How would you redesign the state architecture so it keeps scaling?

## Đáp án chi tiết (VI)
**Triệu chứng của một "state khổng lồ" (monolithic state):**
- **`plan`/`apply` chậm dần theo cấp số nhân**: mỗi lần `plan`, Terraform mặc định refresh **toàn bộ** resource trong state để kiểm tra drift — với vài nghìn resource, một `plan` đơn giản có thể mất 10-20 phút chỉ để refresh, trước cả khi tính diff.
- **Blast radius cực lớn**: một lỗi cú pháp nhỏ hoặc một thay đổi sai trong module dùng chung có thể khiến `plan` đề xuất thay đổi/xóa hàng trăm resource không liên quan cùng lúc.
- **Lock contention**: với 1 state chung cho cả team/nhiều team, locking khiến mọi người phải **xếp hàng** chờ apply — pipeline CI/CD của nhiều đội bị nghẽn lẫn nhau dù thay đổi hoàn toàn độc lập về logic.
- **Blast của lỗi con người tăng theo quy mô**: một `terraform destroy` chạy nhầm ảnh hưởng tới toàn bộ hệ thống thay vì một phần nhỏ.

**Chiến lược tách state (state splitting) theo kinh nghiệm thực tế ở quy mô lớn:**

1. **Tách theo layer/domain** (phổ biến nhất): network, security (IAM), database, compute, mỗi layer một state riêng, dùng `terraform_remote_state` data source để layer trên đọc output của layer dưới.
```
states/
  01-network/       (VPC, subnet, route table)
  02-security/       (IAM roles, security groups)
  03-data/           (RDS, S3, ElastiCache)
  04-compute/        (EKS, EC2, ASG)
```
Trade-off: thêm độ phức tạp khi cần thay đổi xuyên layer (phải apply tuần tự từng state theo đúng thứ tự phụ thuộc).

2. **Tách theo team/service ownership**: mỗi team sở hữu state riêng cho service của mình — giảm lock contention giữa các team, alignment tốt với mô hình "you build it, you run it".

3. **Tách theo môi trường VÀ theo region** khi hệ thống multi-region: `prod-ap-southeast-1`, `prod-us-east-1` mỗi cái một state, tránh một sự cố ở region này ảnh hưởng khả năng apply ở region khác.

4. **Terragrunt (hoặc Terraform Stacks trong HCP Terraform)** để quản lý việc orchestrate nhiều state nhỏ mà không phải viết lại `terraform_remote_state` thủ công ở mọi nơi — Terragrunt sinh backend config tự động theo cấu trúc thư mục và hỗ trợ `dependency` block giữa các state một cách gọn hơn.

**Đánh đổi cần cân nhắc khi tách state quá nhỏ:**
- Quá nhiều state nhỏ → khó nhìn tổng quan (phải cross-reference nhiều nơi để hiểu toàn bộ kiến trúc).
- Thay đổi cần xuyên nhiều state (ví dụ đổi CIDR VPC ảnh hưởng cả network, security, compute) trở thành một chuỗi apply thủ công nhiều bước, dễ sai sót giữa chừng, cần runbook rõ ràng.
- Cần tooling để orchestrate (Terragrunt, Atlantis, CI pipeline riêng) thay vì chỉ `terraform apply` đơn giản — tăng độ phức tạp vận hành.

**Kinh nghiệm rút ra khi đã trải qua sự cố state khổng lồ:** nguyên tắc chung là tách state theo **ranh giới thay đổi (change boundary)** — những gì thường thay đổi cùng nhau nên ở cùng state, những gì hiếm khi thay đổi cùng lúc (như network core so với ứng dụng chạy hàng ngày) nên tách riêng để giảm blast radius và tốc độ `plan`.

## Detailed Answer (EN)
**Symptoms of a "monolithic state":**
- **`plan`/`apply` slows down exponentially**: on every `plan`, Terraform by default refreshes **every** resource in the state to check for drift — with thousands of resources, a simple `plan` can take 10-20 minutes just refreshing, before even computing the diff.
- **Enormous blast radius**: a small syntax error or a bad change in a shared module can make `plan` propose changing/deleting hundreds of unrelated resources at once.
- **Lock contention**: with one shared state across a team/multiple teams, locking forces everyone to **queue up** for apply — CI/CD pipelines from unrelated teams block each other even though the changes are logically independent.
- **Human-error blast radius scales up**: a mistakenly-run `terraform destroy` affects the entire system instead of a small part.

**State-splitting strategies from real large-scale experience:**

1. **Split by layer/domain** (most common): network, security (IAM), database, compute, each with its own state, using the `terraform_remote_state` data source so a higher layer reads a lower layer's outputs.
```
states/
  01-network/       (VPC, subnet, route table)
  02-security/       (IAM roles, security groups)
  03-data/           (RDS, S3, ElastiCache)
  04-compute/        (EKS, EC2, ASG)
```
Trade-off: added complexity for changes that span layers (you must apply each state sequentially in dependency order).

2. **Split by team/service ownership**: each team owns its own state for its service — reduces lock contention between teams, aligns well with a "you build it, you run it" model.

3. **Split by environment AND region** for multi-region systems: `prod-ap-southeast-1`, `prod-us-east-1` each get their own state, so an incident in one region doesn't affect the ability to apply in another.

4. **Terragrunt (or Terraform Stacks in HCP Terraform)** to orchestrate many small states without manually writing `terraform_remote_state` boilerplate everywhere — Terragrunt auto-generates backend config from directory structure and supports a `dependency` block for cleaner cross-state references.

**Trade-offs to weigh when splitting state too finely:**
- Too many small states → harder to see the big picture (you have to cross-reference many places to understand the whole architecture).
- Changes spanning multiple states (e.g., changing the VPC CIDR affects network, security, and compute) become a multi-step manual apply chain, error-prone midway through, requiring a clear runbook.
- Requires orchestration tooling (Terragrunt, Atlantis, a dedicated CI pipeline) instead of a simple `terraform apply` — increasing operational complexity.

**A lesson learned from living through a monolithic-state incident:** the general rule is to split state along **change boundaries** — things that usually change together should live in the same state, while things that rarely change at the same time (like core network vs. day-to-day application deploys) should be separated to reduce blast radius and keep `plan` fast.

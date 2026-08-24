---
id: terraform-lifecycle-prevent-destroy-tradeoffs
position: devops
technology: terraform-iac
level: senior
tags: [terraform, lifecycle, production, safety]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Block `lifecycle` trong Terraform (`prevent_destroy`, `create_before_destroy`, `ignore_changes`) hoạt động như thế nào? Kể một tình huống production thực tế mà việc dùng sai/thiếu `lifecycle` gây ra sự cố.

## Question (EN)
How does Terraform's `lifecycle` block (`prevent_destroy`, `create_before_destroy`, `ignore_changes`) work? Describe a real production scenario where misusing or missing `lifecycle` caused an incident.

## Đáp án chi tiết (VI)
`lifecycle` là block cấu hình hành vi **thay đổi/xóa** của một resource, khác với việc chỉ khai báo desired state thông thường.

**1. `prevent_destroy` — chặn cứng việc xóa:**
```hcl
resource "aws_db_instance" "prod" {
  # ...
  lifecycle {
    prevent_destroy = true
  }
}
```
Bất kỳ `plan`/`apply` nào có ý định destroy resource này (kể cả gián tiếp do đổi thuộc tính bắt buộc phải recreate) sẽ bị Terraform **chặn ngay ở bước plan** với lỗi rõ ràng, buộc phải sửa code hoặc gỡ `prevent_destroy` một cách tường minh trước.

**2. `create_before_destroy` — đổi thứ tự mặc định khi phải recreate resource:**
```hcl
resource "aws_launch_template" "app" {
  name_prefix   = "app-"
  image_id      = var.ami_id
  instance_type = "t3.medium"

  lifecycle {
    create_before_destroy = true
  }
}
```
Mặc định, khi một thuộc tính buộc phải recreate resource (immutable attribute), Terraform **destroy trước, create sau** — gây downtime nếu resource đó đang phục vụ traffic. `create_before_destroy = true` đảo ngược: **tạo resource mới trước**, chỉ xóa resource cũ sau khi resource mới sẵn sàng — cần thiết cho launch template, ASG, hoặc bất kỳ resource nào không thể chấp nhận gap thời gian giữa destroy và create.

**3. `ignore_changes` — bỏ qua drift trên một số attribute cụ thể:**
```hcl
resource "aws_autoscaling_group" "app" {
  desired_capacity = 3
  # ...
  lifecycle {
    ignore_changes = [desired_capacity]
  }
}
```
Dùng khi một attribute bị **thay đổi bởi tiến trình khác ngoài Terraform** một cách hợp lệ (ví dụ Auto Scaling tự điều chỉnh `desired_capacity` theo load) — nếu không `ignore_changes`, mỗi lần `plan` sẽ liên tục đòi "sửa lại" `desired_capacity` về giá trị cứng trong code, xung đột với hành vi tự động scale.

**Tình huống production thực tế (kể theo kiểu war story hay được hỏi):**

Một team quản lý Auto Scaling Group bằng Terraform, khai báo `desired_capacity = 3` **không có** `ignore_changes`. Trong giờ cao điểm, CloudWatch alarm tự động scale ASG lên 8 instance để chịu tải. Ngay sau đó, pipeline CI/CD chạy một `apply` định kỳ (không liên quan gì tới ASG, chỉ update tag cho resource khác trong cùng state) — nhưng vì `desired_capacity` trong state giờ là 8 (do Terraform tự refresh) trong khi code vẫn ghi `3`, Terraform hiểu đây là **drift cần sửa lại**, và `apply` đã **scale-in ASG về lại 3 instance ngay giữa giờ cao điểm** — gây quá tải 5 instance còn lại và sự cố downtime một phần.

**Bài học và cách khắc phục:**
- Thêm `ignore_changes = [desired_capacity]` cho mọi ASG được cả Terraform và auto-scaling policy cùng quản lý — để Terraform "nhường quyền" kiểm soát attribute đó cho auto-scaling.
- Tổng quát hơn: bất kỳ attribute nào có **hai nguồn điều khiển** (Terraform và một hệ thống runtime khác) đều là ứng viên cho `ignore_changes`, nếu không sẽ luôn có xung đột giữa "trạng thái mong muốn tĩnh" và "trạng thái vận hành động".
- Cân nhắc tách hẳn `desired_capacity` ra khỏi Terraform quản lý (chỉ quản lý `min_size`/`max_size`, để scaling policy tự quyết `desired_capacity`) thay vì cố gắng đồng bộ hai nguồn.

**Điểm dễ bị hỏi bẫy về `prevent_destroy`:** nó **không** ngăn được việc xóa resource nếu bạn xóa hẳn resource block đó khỏi state bằng `terraform state rm` rồi xóa tay qua console — `prevent_destroy` chỉ chặn trong luồng `plan`/`apply` bình thường của Terraform, không phải cơ chế bảo vệ tuyệt đối ở tầng cloud. Muốn bảo vệ thật sự cần kết hợp thêm deletion protection ở cấp provider (RDS `deletion_protection`, S3 MFA delete).

## Detailed Answer (EN)
`lifecycle` is a block that configures a resource's **change/destroy behavior**, going beyond just declaring the ordinary desired state.

**1. `prevent_destroy` — a hard block on deletion:**
```hcl
resource "aws_db_instance" "prod" {
  # ...
  lifecycle {
    prevent_destroy = true
  }
}
```
Any `plan`/`apply` that would destroy this resource (even indirectly, from changing an attribute that forces recreation) is **blocked right at the plan stage** with a clear error, requiring you to fix the code or explicitly remove `prevent_destroy` first.

**2. `create_before_destroy` — reversing the default order when a resource must be recreated:**
```hcl
resource "aws_launch_template" "app" {
  name_prefix   = "app-"
  image_id      = var.ami_id
  instance_type = "t3.medium"

  lifecycle {
    create_before_destroy = true
  }
}
```
By default, when an attribute forces recreation (an immutable attribute), Terraform **destroys first, then creates** — causing downtime if that resource is currently serving traffic. `create_before_destroy = true` reverses this: **create the new resource first**, only destroying the old one once the new one is ready — necessary for launch templates, ASGs, or any resource that can't tolerate a gap between destroy and create.

**3. `ignore_changes` — ignoring drift on specific attributes:**
```hcl
resource "aws_autoscaling_group" "app" {
  desired_capacity = 3
  # ...
  lifecycle {
    ignore_changes = [desired_capacity]
  }
}
```
Used when an attribute is **legitimately changed by a process outside Terraform** (e.g., Auto Scaling adjusting `desired_capacity` based on load) — without `ignore_changes`, every `plan` would keep trying to "fix" `desired_capacity` back to the hardcoded value in code, conflicting with the automatic scaling behavior.

**A real production scenario (a war story commonly asked about):**

A team managed an Auto Scaling Group with Terraform, declaring `desired_capacity = 3` **without** `ignore_changes`. During peak hours, a CloudWatch alarm automatically scaled the ASG up to 8 instances to handle load. Right after, a scheduled CI/CD pipeline ran an `apply` (unrelated to the ASG — just updating a tag on another resource in the same state) — but since `desired_capacity` in state was now 8 (refreshed from reality) while the code still said `3`, Terraform interpreted this as **drift needing correction**, and the `apply` **scaled the ASG back down to 3 instances right in the middle of peak hours** — overloading the remaining 5 instances and causing a partial outage.

**Lessons learned and the fix:**
- Add `ignore_changes = [desired_capacity]` for any ASG managed by both Terraform and an auto-scaling policy — letting Terraform "cede control" of that attribute to auto-scaling.
- More generally: any attribute with **two sources of control** (Terraform and another runtime system) is a candidate for `ignore_changes`, otherwise there will always be a conflict between "static desired state" and "dynamic operational state."
- Consider removing `desired_capacity` from Terraform's control entirely (only manage `min_size`/`max_size`, letting the scaling policy decide `desired_capacity`) instead of trying to sync two sources of truth.

**A common trick point about `prevent_destroy`:** it does **not** stop deletion if you remove the resource block from the state entirely via `terraform state rm` and then delete it manually via the console — `prevent_destroy` only blocks within Terraform's normal `plan`/`apply` flow, it is not an absolute protection mechanism at the cloud layer. Real protection requires combining it with provider-level deletion protection (RDS `deletion_protection`, S3 MFA delete).

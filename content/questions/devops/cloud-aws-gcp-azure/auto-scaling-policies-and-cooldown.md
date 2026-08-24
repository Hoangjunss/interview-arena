---
id: auto-scaling-policies-and-cooldown
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [auto-scaling, ec2, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Target Tracking, Step Scaling và Scheduled Scaling trong Auto Scaling Group. Cooldown period dùng để làm gì và vì sao nó quan trọng?

## Question (EN)
Compare Target Tracking, Step Scaling, and Scheduled Scaling in an Auto Scaling Group. What is the cooldown period for, and why does it matter?

## Đáp án chi tiết (VI)
| Loại policy | Cơ chế | Khi nào dùng |
|---|---|---|
| **Target Tracking** | Giữ 1 metric (CPU, request count/target, custom CloudWatch metric) quanh 1 giá trị mục tiêu — ASG tự tính cần thêm/bớt bao nhiêu instance | Đơn giản, phù hợp phần lớn use case, "set and forget" |
| **Step Scaling** | Định nghĩa nhiều "bậc" phản ứng theo mức độ vượt ngưỡng alarm (ví dụ CPU >70% thêm 2 instance, >90% thêm 5 instance) | Cần phản ứng linh hoạt/mạnh hơn theo mức độ tải, traffic tăng đột biến (spike) |
| **Scheduled Scaling** | Scale theo lịch cố định (cron) | Tải có pattern dự đoán được — ví dụ tăng capacity trước giờ mở bán flash sale, giảm ban đêm |

**Ví dụ Step Scaling (Terraform):**
```hcl
resource "aws_autoscaling_policy" "scale_out" {
  name                   = "scale-out-step"
  autoscaling_group_name = aws_autoscaling_group.web.name
  policy_type            = "StepScaling"
  adjustment_type        = "ChangeInCapacity"

  step_adjustment {
    scaling_adjustment          = 2
    metric_interval_lower_bound = 0
    metric_interval_upper_bound = 20
  }
  step_adjustment {
    scaling_adjustment          = 5
    metric_interval_lower_bound = 20
  }
}
```

**Cooldown period là gì:** khoảng thời gian (mặc định 300s) sau một hành động scale, trong đó ASG **bỏ qua các alarm scale tiếp theo** để chờ instance mới khởi động xong và metric ổn định trở lại.

**Vì sao quan trọng:**
- Không có cooldown: ASG có thể liên tục scale-out vì metric (CPU trung bình) vẫn cao ngay sau khi thêm instance (do instance mới chưa kịp nhận traffic hoặc chưa warm-up), dẫn tới **over-provisioning** và tốn chi phí.
- Cooldown quá dài: ASG phản ứng chậm với traffic tăng đột ngột, gây **thiếu capacity, tăng latency/lỗi 5xx**.

**Lưu ý:** Target Tracking policy có cơ chế cooldown ngầm định thông minh hơn (dựa trên cả scale-out và scale-in cooldown riêng biệt), trong khi Step Scaling cần khai báo `cooldown` rõ ràng theo từng policy.

**Gotcha thực tế:** kết hợp nhiều policy scale-out với ngưỡng trùng nhau dễ gây scale "chồng chéo" (double scale) — nên review kỹ CloudWatch Alarm liên kết với từng policy, tránh 2 alarm cùng trigger 1 lúc gây scale dư thừa.

## Detailed Answer (EN)
| Policy type | Mechanism | When to use |
|---|---|---|
| **Target Tracking** | Keeps one metric (CPU, requests per target, custom CloudWatch metric) around a target value — the ASG computes how many instances to add/remove | Simple, fits most use cases, "set and forget" |
| **Step Scaling** | Defines multiple response "steps" based on how far an alarm is breached (e.g. CPU >70% adds 2 instances, >90% adds 5) | Needs a more flexible/aggressive response proportional to load, sudden traffic spikes |
| **Scheduled Scaling** | Scales on a fixed schedule (cron) | Predictable load patterns — e.g. increase capacity before a flash sale opens, scale down overnight |

**Step Scaling example (Terraform):**
```hcl
resource "aws_autoscaling_policy" "scale_out" {
  name                   = "scale-out-step"
  autoscaling_group_name = aws_autoscaling_group.web.name
  policy_type            = "StepScaling"
  adjustment_type        = "ChangeInCapacity"

  step_adjustment {
    scaling_adjustment          = 2
    metric_interval_lower_bound = 0
    metric_interval_upper_bound = 20
  }
  step_adjustment {
    scaling_adjustment          = 5
    metric_interval_lower_bound = 20
  }
}
```

**What the cooldown period does:** a period (default 300s) after a scaling action, during which the ASG **ignores further scaling alarms** to give new instances time to start and metrics time to stabilize.

**Why it matters:**
- Without cooldown: the ASG can keep scaling out repeatedly because the metric (average CPU) stays high right after adding instances (new instances haven't yet received traffic or finished warming up), causing **over-provisioning** and wasted cost.
- Too-long cooldown: the ASG reacts too slowly to sudden traffic surges, causing **capacity shortage, increased latency/5xx errors**.

**Note:** Target Tracking has a smarter built-in cooldown mechanism (separate scale-out and scale-in cooldowns), while Step Scaling requires an explicit `cooldown` per policy.

**Real pitfall:** combining multiple scale-out policies with overlapping thresholds can cause "double scaling" — carefully review the CloudWatch Alarms tied to each policy to avoid two alarms triggering simultaneously and over-scaling.

---
id: what-is-auto-scaling-group
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [auto-scaling, ec2, aws]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Auto Scaling Group (ASG) là gì? Nó hoạt động dựa trên những thành phần nào?

## Question (EN)
What is an Auto Scaling Group (ASG)? What components does it rely on?

## Đáp án chi tiết (VI)
**Auto Scaling Group (ASG)** là dịch vụ tự động điều chỉnh số lượng EC2 instance đang chạy để đáp ứng tải, giữ ứng dụng luôn có đủ (nhưng không dư thừa) capacity.

**Các thành phần chính:**
- **Launch Template** (khuyến nghị, thay cho Launch Configuration cũ): định nghĩa AMI, instance type, key pair, security group, user-data script — "khuôn mẫu" để tạo instance mới.
- **Min / Max / Desired capacity**: số instance tối thiểu, tối đa, và mong muốn hiện tại.
- **Scaling Policy**: quy tắc khi nào scale (target tracking, step scaling, scheduled).
- **Health check**: ASG tự động terminate và thay thế instance unhealthy (dựa trên EC2 status check hoặc ELB health check).
- **Availability Zones**: ASG trải instance qua nhiều AZ để chịu lỗi.

**Ví dụ cấu hình (Terraform):**
```hcl
resource "aws_autoscaling_group" "web" {
  desired_capacity    = 2
  min_size            = 2
  max_size            = 6
  vpc_zone_identifier = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  target_group_arns   = [aws_lb_target_group.web.arn]
  health_check_type   = "ELB"
  health_check_grace_period = 300

  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
}

resource "aws_autoscaling_policy" "cpu_target" {
  name                   = "cpu-target-tracking"
  autoscaling_group_name = aws_autoscaling_group.web.name
  policy_type            = "TargetTrackingScaling"
  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 60.0
  }
}
```

**Ví dụ thực tế:** website thương mại điện tử đặt `min=2, max=10`, target tracking CPU 60% — giờ cao điểm buổi tối tự scale lên 6-8 instance, ban đêm scale về 2 để tiết kiệm chi phí.

**Gotcha:**
- `health_check_grace_period` quá ngắn khiến ASG terminate instance mới khởi động trước khi app kịp warm-up, gây vòng lặp tạo-xóa instance liên tục.
- Scale-in (giảm) cần cấu hình **termination policy** hợp lý (ví dụ `OldestInstance`) để tránh xóa nhầm instance đang xử lý request quan trọng — nên bật **connection draining / deregistration delay** trên target group trước khi terminate.

## Detailed Answer (EN)
An **Auto Scaling Group (ASG)** automatically adjusts the number of running EC2 instances to match load, keeping the application adequately (but not excessively) provisioned.

**Main components:**
- **Launch Template** (recommended, replacing the older Launch Configuration): defines the AMI, instance type, key pair, security group, user-data script — the "blueprint" for new instances.
- **Min / Max / Desired capacity**: minimum, maximum, and current desired instance counts.
- **Scaling Policy**: rules for when to scale (target tracking, step scaling, scheduled).
- **Health check**: ASG automatically terminates and replaces unhealthy instances (based on EC2 status checks or ELB health checks).
- **Availability Zones**: ASG spreads instances across multiple AZs for fault tolerance.

**Example configuration (Terraform):**
```hcl
resource "aws_autoscaling_group" "web" {
  desired_capacity    = 2
  min_size            = 2
  max_size            = 6
  vpc_zone_identifier = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  target_group_arns   = [aws_lb_target_group.web.arn]
  health_check_type   = "ELB"
  health_check_grace_period = 300

  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
}

resource "aws_autoscaling_policy" "cpu_target" {
  name                   = "cpu-target-tracking"
  autoscaling_group_name = aws_autoscaling_group.web.name
  policy_type            = "TargetTrackingScaling"
  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 60.0
  }
}
```

**Real example:** an e-commerce site sets `min=2, max=10` with target tracking on 60% CPU — during evening peak hours it auto-scales up to 6-8 instances, and scales back to 2 overnight to save cost.

**Pitfalls:**
- Too short a `health_check_grace_period` causes the ASG to terminate freshly-launched instances before the app finishes warming up, triggering an endless create-terminate loop.
- Scaling in needs a sensible **termination policy** (e.g. `OldestInstance`) to avoid killing an instance mid-way through handling an important request — enable **connection draining / deregistration delay** on the target group before termination.

---
id: alb-target-group-health-check-debugging
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [load-balancer, networking, troubleshooting]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Target group health check bị fail liên tục dù ứng dụng chạy bình thường khi SSH vào kiểm tra. Bạn debug vấn đề này như thế nào?

## Question (EN)
A target group's health checks keep failing even though the application looks fine when you SSH in and check. How would you debug this?

## Đáp án chi tiết (VI)
Đây là tình huống debug thực tế rất hay gặp với ALB/NLB. Quy trình debug có hệ thống:

**1. Kiểm tra cấu hình health check có khớp với ứng dụng không:**
```bash
aws elbv2 describe-target-health --target-group-arn <tg-arn>
aws elbv2 describe-target-groups --target-group-arns <tg-arn>
```
Kiểm tra: `HealthCheckPath` (ví dụ `/health`) có tồn tại và trả **đúng status code kỳ vọng** (`Matcher: 200`)? App có thể trả 200 ở `/` nhưng `/health` lại 404 nếu chưa implement endpoint đó.

**2. Kiểm tra Security Group của target:**
Target group cần cho phép traffic từ **Security Group của Load Balancer** (hoặc CIDR của LB) trên đúng port health check — lỗi phổ biến nhất là quên mở port health check trong SG của EC2/container dù đã mở port ứng dụng chính.

**3. Kiểm tra port health check có đúng không:**
Nếu app chạy trên port 8080 nhưng health check trỏ port 80 (mặc định), sẽ luôn fail dù app khỏe mạnh.

**4. Kiểm tra thời gian phản hồi vs timeout:**
```
HealthCheckTimeoutSeconds: 5
HealthCheckIntervalSeconds: 30
HealthyThresholdCount: 2
UnhealthyThresholdCount: 2
```
Nếu app khởi động chậm (JVM warm-up, kết nối DB pool) và mất >5s để trả response ở lần gọi đầu, health check timeout liên tục — cần tăng timeout hoặc dùng `HealthCheckGracePeriod` cho ASG.

**5. Kiểm tra network path (với NLB):**
NLB hoạt động ở layer 4 — nếu dùng **target type `instance`** với `preserve_client_ip` bật, mà app không lắng nghe đúng interface, hoặc route table thiếu route trả về client thật, health check TCP có thể fail dù port đang listen.

**6. Xem log/metric CloudWatch:**
`TargetResponseTime`, `HTTPCode_Target_5XX_Count`, `UnHealthyHostCount` để xác định pattern (fail toàn bộ hay ngẫu nhiên 1 vài instance).

**Case thực tế hay gặp:** container chạy trong ECS Fargate, health check path đúng, nhưng SG của **task** chỉ allow traffic từ SG khác không phải SG của ALB — do copy-paste SG cũ từ service khác. Sửa: thêm inbound rule cho phép `source = SG-of-ALB` trên đúng container port.

## Detailed Answer (EN)
This is a very common real-world ALB/NLB debugging scenario. A systematic approach:

**1. Verify the health check config matches the application:**
```bash
aws elbv2 describe-target-health --target-group-arn <tg-arn>
aws elbv2 describe-target-groups --target-group-arns <tg-arn>
```
Check: does `HealthCheckPath` (e.g. `/health`) exist and return the **expected status code** (`Matcher: 200`)? The app might return 200 on `/` but 404 on `/health` if that endpoint isn't implemented.

**2. Check the target's Security Group:**
The target's SG must allow traffic from the **Load Balancer's Security Group** (or its CIDR) on the correct health check port — the most common mistake is forgetting to open the health-check port on the EC2/container's SG even though the main application port is open.

**3. Verify the health check port is correct:**
If the app listens on port 8080 but the health check targets port 80 (default), it will always fail even though the app is healthy.

**4. Check response time vs timeout:**
```
HealthCheckTimeoutSeconds: 5
HealthCheckIntervalSeconds: 30
HealthyThresholdCount: 2
UnhealthyThresholdCount: 2
```
If the app starts slowly (JVM warm-up, DB connection pooling) and takes >5s to respond on the first call, health checks will keep timing out — increase the timeout or use the ASG's `HealthCheckGracePeriod`.

**5. Check the network path (for NLB):**
NLB operates at layer 4 — if using **target type `instance`** with client IP preservation enabled, and the app isn't listening on the right interface, or the route table lacks a route back to the real client, TCP health checks can fail even though the port is listening.

**6. Check CloudWatch logs/metrics:**
`TargetResponseTime`, `HTTPCode_Target_5XX_Count`, `UnHealthyHostCount` to identify the pattern (all targets failing, or just a random subset).

**Common real case:** a container running on ECS Fargate has the correct health check path, but the **task's** Security Group only allows traffic from a different SG, not the ALB's SG — because the SG was copy-pasted from another service. Fix: add an inbound rule allowing `source = ALB's SG` on the correct container port.

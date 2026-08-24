---
id: cost-optimization-strategy-at-scale
position: devops
technology: cloud-aws-gcp-azure
level: senior
tags: [cost, finops, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn được giao nhiệm vụ giảm 30% chi phí cloud hàng tháng cho một hệ thống đang chạy production mà không được ảnh hưởng đến độ ổn định. Bạn tiếp cận vấn đề này như thế nào?

## Question (EN)
You're tasked with reducing monthly cloud costs by 30% for a system running in production, without impacting stability. How do you approach this?

## Đáp án chi tiết (VI)
Đây là bài toán **FinOps** thực tế — cần tiếp cận có hệ thống, không phải "tắt bớt vài instance" cảm tính.

**Bước 1 — Đo lường trước khi tối ưu (Cost Visibility):**
- Bật **AWS Cost Explorer**, **Cost and Usage Report (CUR)**, gắn **tag** đầy đủ (team, environment, service) cho mọi resource để biết chi phí đến từ đâu — không thể tối ưu cái không đo được.
- Phân tích Top 10 dịch vụ tốn chi phí nhất (thường là EC2, RDS, data transfer, NAT Gateway) — tập trung vào phần lớn nhất trước (nguyên tắc 80/20).

**Bước 2 — Rightsizing (thường mang lại tiết kiệm lớn nhất, rủi ro thấp nhất):**
```bash
# AWS Compute Optimizer gợi ý instance type phù hợp dựa trên utilization thực tế
aws compute-optimizer get-ec2-instance-recommendations
```
- Nhiều team over-provision "cho an toàn" (chọn instance to hơn cần thiết) — Compute Optimizer/CloudWatch cho thấy CPU trung bình thực tế chỉ 15-20%, có thể downsize 1-2 bậc mà không ảnh hưởng hiệu năng.
- **Rủi ro cần quản lý**: rightsize sai (quá aggressive) có thể gây thiếu capacity ở peak — nên rollout dần, theo dõi metric 1-2 tuần trước khi downsize tiếp.

**Bước 3 — Purchasing strategy (Savings Plan/RI cho baseline, Spot cho batch):**
- Baseline capacity ổn định (biết chắc chạy 24/7 ít nhất 1 năm) → mua **Compute Savings Plan** — tiết kiệm 40-66% mà không khóa cứng instance type.
- Batch job/worker chịu được gián đoạn → chuyển sang **Spot Instance** — tiết kiệm 70-90%.
- Đây thường là đòn bẩy tiết kiệm lớn nhất (có thể đóng góp 15-20% trong tổng 30% mục tiêu) và **không ảnh hưởng gì tới ứng dụng** vì chỉ thay đổi cách trả tiền, không đổi kiến trúc.

**Bước 4 — Storage & data transfer optimization:**
- S3 Lifecycle policy chuyển dữ liệu lạnh sang tier rẻ hơn (xem chi tiết ở câu hỏi lifecycle riêng).
- Xóa **unattached EBS volume, snapshot cũ không dùng, Elastic IP không gắn** — chi phí "rác" tích lũy âm thầm, dễ tìm bằng script quét định kỳ.
- Giảm **cross-AZ / cross-region data transfer** bằng cách thiết kế lại traffic pattern (ví dụ đảm bảo app và cache/DB nó gọi nằm cùng AZ khi có thể) — data transfer phí ẩn dễ bị bỏ qua nhưng có thể chiếm 5-10% bill ở scale lớn.
- Dùng VPC Endpoint để tránh traffic AWS-service đi qua NAT Gateway (đã phân tích ở câu NAT Gateway).

**Bước 5 — Auto scaling tối ưu (giảm over-provisioning giờ thấp điểm):**
- Review lại `min_size` của ASG — nhiều đội đặt `min=desired peak/2` "cho chắc" thay vì để scaling policy tự điều tiết theo tải thực tế ban đêm.
- Scheduled scaling cho môi trường non-production: tự tắt EC2/RDS dev/staging ngoài giờ làm việc (tiết kiệm ~65% cho môi trường chỉ dùng giờ hành chính).

**Bước 6 — Giám sát liên tục, không phải one-time project:**
- Thiết lập **budget alert** (AWS Budgets) cảnh báo sớm khi chi phí vượt ngưỡng.
- Đưa cost review vào quy trình sprint/release định kỳ, tránh "tối ưu 1 lần rồi trôi dần trở lại" (cost creep).

**Cách trình bày kết quả với stakeholder:** phân tách rõ đâu là tiết kiệm **một lần** (dọn rác, downsize) vs tiết kiệm **liên tục theo tháng** (Savings Plan, Spot, lifecycle), và luôn kèm theo **rủi ro đã đánh giá** (ví dụ: đã test tải trước khi downsize RDS) để tránh optimize quá tay gây sự cố production — đây chính là điểm phân biệt senior engineer với người chỉ biết "tắt máy cho rẻ".

## Detailed Answer (EN)
This is a real **FinOps** problem — it requires a systematic approach, not an ad-hoc "shut down a few instances" reaction.

**Step 1 — Measure before optimizing (Cost Visibility):**
- Enable **AWS Cost Explorer** and the **Cost and Usage Report (CUR)**, and fully **tag** every resource (team, environment, service) to know where cost comes from — you can't optimize what you can't measure.
- Analyze the top 10 highest-cost services (usually EC2, RDS, data transfer, NAT Gateway) — focus on the biggest contributors first (the 80/20 rule).

**Step 2 — Rightsizing (usually the biggest savings with the lowest risk):**
```bash
# AWS Compute Optimizer suggests appropriate instance types based on real utilization
aws compute-optimizer get-ec2-instance-recommendations
```
- Many teams over-provision "to be safe" (picking a larger instance than needed) — Compute Optimizer/CloudWatch often shows average CPU utilization of only 15-20%, allowing a downsize of 1-2 tiers without impacting performance.
- **Risk to manage**: overly aggressive rightsizing can cause capacity shortages at peak — roll out gradually, monitoring metrics for 1-2 weeks before downsizing further.

**Step 3 — Purchasing strategy (Savings Plan/RI for baseline, Spot for batch):**
- For stable baseline capacity (known to run 24/7 for at least a year) → buy a **Compute Savings Plan** — 40-66% savings without hard-locking instance type.
- For interruption-tolerant batch jobs/workers → switch to **Spot Instances** — 70-90% savings.
- This is usually the biggest single lever (can contribute 15-20% of a 30% target) and **has zero impact on the application** since it only changes how you pay, not the architecture.

**Step 4 — Storage & data transfer optimization:**
- S3 Lifecycle policies to move cold data to cheaper tiers (covered in more depth in the dedicated lifecycle question).
- Delete **unattached EBS volumes, old unused snapshots, unattached Elastic IPs** — quietly accumulating "junk" cost, easily found with a periodic scanning script.
- Reduce **cross-AZ / cross-region data transfer** by redesigning traffic patterns (e.g. keeping an app and the cache/DB it calls in the same AZ where possible) — data transfer fees are an easily-overlooked cost that can be 5-10% of the bill at scale.
- Use VPC Endpoints to keep AWS-service traffic off the NAT Gateway (as covered in the NAT Gateway question).

**Step 5 — Auto scaling optimization (reduce off-peak over-provisioning):**
- Review ASG `min_size` values — many teams set `min = peak_desired/2` "to be safe" instead of letting the scaling policy adapt to actual overnight load.
- Scheduled scaling for non-production environments: auto-shutdown dev/staging EC2/RDS outside business hours (~65% savings for environments only used during work hours).

**Step 6 — Continuous monitoring, not a one-time project:**
- Set up **budget alerts** (AWS Budgets) to catch cost overruns early.
- Bake cost review into the regular sprint/release process, avoiding "optimize once and slowly drift back" (cost creep).

**How to present results to stakeholders:** clearly separate **one-time** savings (cleanup, downsizing) from **recurring monthly** savings (Savings Plan, Spot, lifecycle), and always include an **assessed risk** (e.g. load-tested before downsizing RDS) to avoid over-optimizing and causing a production incident — this is exactly what distinguishes a senior engineer from someone who just "turns things off to save money."

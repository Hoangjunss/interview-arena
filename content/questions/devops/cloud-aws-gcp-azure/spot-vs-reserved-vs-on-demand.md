---
id: spot-vs-reserved-vs-on-demand
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [cost, ec2, spot-instance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh On-Demand, Reserved Instance, Savings Plan và Spot Instance. Chiến lược nào phù hợp cho một hệ thống production thực tế?

## Question (EN)
Compare On-Demand, Reserved Instance, Savings Plan, and Spot Instance. What strategy fits a real production system?

## Đáp án chi tiết (VI)
| Loại | Mức giảm giá | Cam kết | Rủi ro | Phù hợp cho |
|---|---|---|---|---|
| **On-Demand** | Không giảm (giá chuẩn) | Không | Không | Tải không dự đoán được, workload ngắn hạn, test |
| **Reserved Instance (RI)** | ~40-72% | 1 hoặc 3 năm, cam kết instance type/region cụ thể | Trả trước hoặc cam kết chi trả dù không dùng hết | Workload ổn định, biết trước capacity cần dùng dài hạn |
| **Savings Plan** | ~40-72% (tương đương RI) | 1 hoặc 3 năm, cam kết **mức chi tiêu $/giờ**, linh hoạt hơn RI (áp dụng cả EC2, Fargate, Lambda) | Vẫn phải cam kết chi tiêu, nhưng linh hoạt instance family/region hơn RI | Muốn tiết kiệm như RI nhưng cần linh hoạt đổi instance type |
| **Spot Instance** | ~70-90% | Không cam kết, có thể bị **thu hồi (interrupt) với 2 phút cảnh báo** | Instance có thể bị terminate bất cứ lúc nào | Batch job, CI/CD runner, xử lý dữ liệu chịu được gián đoạn, workload stateless có thể retry |

**Chiến lược thực tế cho production (kết hợp "layered" approach):**
1. **Baseline capacity** (chạy 24/7 ổn định, ví dụ core API service): mua **Savings Plan** cho phần này — tiết kiệm sâu, vẫn linh hoạt đổi instance type khi cần.
2. **Phần capacity biến động theo giờ cao điểm**: dùng **On-Demand** — không cam kết, trả đúng theo nhu cầu thực tế.
3. **Batch processing / worker không cần SLA cao** (video encoding, data pipeline, CI runner): dùng **Spot Instance** kết hợp **Spot Fleet / EC2 Fleet** với nhiều instance type để giảm rủi ro bị thu hồi đồng loạt.

**Ví dụ cấu hình Mixed Instances Policy cho ASG (kết hợp On-Demand + Spot):**
```hcl
resource "aws_autoscaling_group" "mixed" {
  min_size = 2
  max_size = 10

  mixed_instances_policy {
    instances_distribution {
      on_demand_base_capacity  = 2
      on_demand_percentage_above_base_capacity = 20
      spot_allocation_strategy = "capacity-optimized"
    }
    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.app.id
      }
      override { instance_type = "m5.large" }
      override { instance_type = "m5a.large" }
      override { instance_type = "m6i.large" }
    }
  }
}
```
`on_demand_base_capacity = 2` đảm bảo luôn có 2 instance ổn định, phần scale thêm ưu tiên 80% Spot — cân bằng giữa tiết kiệm chi phí và độ ổn định.

**Xử lý Spot interruption đúng cách:** lắng nghe **EC2 Instance Metadata (IMDS) interruption notice** (`/latest/meta-data/spot/instance-action`) để chủ động drain connection, lưu checkpoint, và deregister khỏi load balancer trước khi bị terminate — thay vì để traffic bị mất đột ngột.

**Gotcha:** Reserved Instance mua sai instance type/region sẽ **"kẹt vốn"** — không dùng hết vẫn mất tiền (trừ Convertible RI có thể đổi nhưng vẫn giới hạn); đây là lý do nhiều tổ chức lớn chuyển hẳn sang Savings Plan vì tính linh hoạt cao hơn.

## Detailed Answer (EN)
| Type | Discount | Commitment | Risk | Best for |
|---|---|---|---|---|
| **On-Demand** | None (standard price) | None | None | Unpredictable load, short-lived workloads, testing |
| **Reserved Instance (RI)** | ~40-72% | 1 or 3 years, commits to specific instance type/region | Prepaid or committed spend even if underused | Stable workloads with known long-term capacity needs |
| **Savings Plan** | ~40-72% (comparable to RI) | 1 or 3 years, commits to a **$/hour spend rate**, more flexible than RI (covers EC2, Fargate, Lambda) | Still a spend commitment, but more flexibility across instance families/regions than RI | Wanting RI-level savings with flexibility to change instance types |
| **Spot Instance** | ~70-90% | No commitment, can be **interrupted with a 2-minute warning** | Instance can be terminated at any time | Batch jobs, CI/CD runners, fault-tolerant data processing, stateless retryable workloads |

**Real production strategy (layered approach):**
1. **Baseline capacity** (runs 24/7 steadily, e.g. core API service): buy a **Savings Plan** — deep savings while staying flexible on instance type.
2. **Variable peak-hour capacity**: use **On-Demand** — no commitment, pay exactly for actual need.
3. **Batch processing / low-SLA workers** (video encoding, data pipelines, CI runners): use **Spot Instances** combined with **Spot Fleet / EC2 Fleet** across multiple instance types to reduce the risk of mass simultaneous interruption.

**Example Mixed Instances Policy for an ASG (On-Demand + Spot):**
```hcl
resource "aws_autoscaling_group" "mixed" {
  min_size = 2
  max_size = 10

  mixed_instances_policy {
    instances_distribution {
      on_demand_base_capacity  = 2
      on_demand_percentage_above_base_capacity = 20
      spot_allocation_strategy = "capacity-optimized"
    }
    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.app.id
      }
      override { instance_type = "m5.large" }
      override { instance_type = "m5a.large" }
      override { instance_type = "m6i.large" }
    }
  }
}
```
`on_demand_base_capacity = 2` guarantees 2 stable instances always available, with additional scale-out preferring 80% Spot — balancing cost savings against stability.

**Handling Spot interruption correctly:** listen for the **EC2 Instance Metadata (IMDS) interruption notice** (`/latest/meta-data/spot/instance-action`) to proactively drain connections, save checkpoints, and deregister from the load balancer before termination — rather than losing traffic abruptly.

**Pitfall:** buying the wrong instance type/region for a Reserved Instance **locks up capital** — you pay for it whether you use it or not (except Convertible RIs, which can be exchanged but still have constraints); this is why many large organizations have moved entirely to Savings Plans for their greater flexibility.

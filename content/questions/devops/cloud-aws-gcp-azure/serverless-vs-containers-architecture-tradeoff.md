---
id: serverless-vs-containers-architecture-tradeoff
position: devops
technology: cloud-aws-gcp-azure
level: senior
tags: [serverless, containers, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi thiết kế một hệ thống mới, khi nào bạn chọn kiến trúc serverless (Lambda) và khi nào chọn container (ECS/EKS)? Trình bày framework quyết định.

## Question (EN)
When designing a new system, when would you choose a serverless architecture (Lambda) versus containers (ECS/EKS)? Walk through your decision framework.

## Đáp án chi tiết (VI)
Đây không phải câu hỏi "cái nào tốt hơn" mà là **đánh giá trade-off theo đặc điểm workload cụ thể**.

**Framework quyết định theo nhiều trục:**

| Trục đánh giá | Nghiêng về Lambda | Nghiêng về Container (ECS/EKS) |
|---|---|---|
| **Traffic pattern** | Không đều, có lúc = 0 (event-driven, cron, xử lý bất đồng bộ) | Ổn định, liên tục, tải cao đều đặn |
| **Thời gian xử lý** | Ngắn (<15 phút), phần lớn <1 phút | Dài hạn, long-running process, streaming |
| **Yêu cầu latency** | Chấp nhận cold start (vài trăm ms - vài giây thỉnh thoảng) | Cần latency cực thấp và **ổn định tuyệt đối** |
| **Ngân sách team/vận hành** | Team nhỏ, muốn giảm tối đa gánh nặng vận hành hạ tầng | Team có kinh nghiệm container/K8s, cần kiểm soát sâu (network, sidecar, service mesh) |
| **Chi phí ở scale lớn, tải ổn định** | Đắt hơn container ở tải cao 24/7 liên tục (tính theo invocation) | Rẻ hơn đáng kể khi tải ổn định lớn (trả theo capacity đặt trước) |
| **Portability** | Vendor lock-in cao hơn (API Gateway + Lambda event format riêng AWS) | Portable hơn (container chạy được trên bất kỳ cloud/on-prem nào) |
| **Runtime/dependency phức tạp** | Giới hạn (package size, thời gian khởi động, không hỗ trợ mọi native binary dễ dàng) | Toàn quyền kiểm soát OS, dependency, GPU, network stack |

**Ví dụ quyết định thực tế:**
- **Xử lý ảnh upload (resize, watermark) khi user upload lên S3**: traffic không đều, xử lý nhanh (<30s), event-driven từ S3 trigger → **Lambda** là lựa chọn rõ ràng, không cần giữ server chạy chờ event hiếm khi tới.
- **API core xử lý hàng chục nghìn request/giây liên tục, cần latency <50ms ổn định**: tải cao, ổn định, latency-sensitive → **ECS/EKS** với auto scaling phù hợp hơn, tránh cold start ảnh hưởng SLA và tối ưu chi phí ở scale lớn.
- **Batch job xử lý dữ liệu chạy 2 tiếng mỗi đêm**: vượt giới hạn 15 phút của Lambda → bắt buộc dùng **ECS/Fargate task** hoặc Step Functions orchestrate nhiều Lambda ngắn.

**Kiến trúc hybrid (thực tế phổ biến nhất ở công ty trưởng thành):**
```
API chính (traffic ổn định, latency-critical)     -> ECS/EKS
Event xử lý bất đồng bộ (webhook, image processing) -> Lambda
Cron job định kỳ (report, cleanup)                  -> Lambda + EventBridge Schedule
Batch xử lý dữ liệu lớn                             -> ECS/Fargate task hoặc AWS Batch
```
Phần lớn hệ thống production trưởng thành **không chọn 100% 1 phe** — mà dùng đúng công cụ cho đúng loại workload, đây chính là điều interviewer senior muốn nghe thay vì câu trả lời tuyệt đối "Lambda tốt hơn" hay "Container tốt hơn".

**Điểm cần nhấn khi trả lời phỏng vấn:** luôn gắn quyết định với **chi phí vận hành thực tế của tổ chức** — team 3 người không nên tự vận hành EKS cluster phức tạp nếu Lambda/Fargate đã đủ đáp ứng, dù về mặt lý thuyết kỹ thuật container "linh hoạt hơn". Ngược lại, tổ chức lớn với platform team chuyên trách Kubernetes có thể tận dụng tốt hơn lợi ích dài hạn của container hóa toàn bộ.

## Detailed Answer (EN)
This isn't a "which is better" question but an **evaluation of trade-offs based on specific workload characteristics**.

**Decision framework across several axes:**

| Axis | Favors Lambda | Favors Containers (ECS/EKS) |
|---|---|---|
| **Traffic pattern** | Irregular, sometimes zero (event-driven, cron, async processing) | Stable, continuous, consistently high load |
| **Execution duration** | Short (<15 min), mostly <1 min | Long-running processes, streaming |
| **Latency requirements** | Tolerates cold starts (occasional hundreds of ms to a few seconds) | Needs extremely low and **absolutely consistent** latency |
| **Team/ops budget** | Small team wanting to minimize infrastructure ops burden | Team experienced with containers/K8s, needs deep control (networking, sidecars, service mesh) |
| **Cost at large scale, steady load** | More expensive than containers under continuous 24/7 high load (billed per invocation) | Significantly cheaper at large, steady load (paying for pre-provisioned capacity) |
| **Portability** | Higher vendor lock-in (API Gateway + Lambda's AWS-specific event format) | More portable (containers run on any cloud/on-prem) |
| **Runtime/dependency complexity** | Limited (package size, cold-start time, not every native binary is easy to run) | Full control over OS, dependencies, GPU, network stack |

**Real decision examples:**
- **Image processing (resize, watermark) when a user uploads to S3**: irregular traffic, fast processing (<30s), event-driven from an S3 trigger → **Lambda** is the clear choice, no need to keep a server running waiting for rare events.
- **Core API handling tens of thousands of requests/second continuously, needing stable <50ms latency**: high, steady load, latency-sensitive → **ECS/EKS** with proper auto scaling fits better, avoiding cold starts affecting SLA and optimizing cost at scale.
- **A batch job processing data for 2 hours every night**: exceeds Lambda's 15-minute limit → must use an **ECS/Fargate task** or Step Functions orchestrating multiple short Lambdas.

**Hybrid architecture (the most common real-world pattern at mature companies):**
```
Core API (steady traffic, latency-critical)          -> ECS/EKS
Async event processing (webhooks, image processing)   -> Lambda
Periodic cron jobs (reports, cleanup)                  -> Lambda + EventBridge Schedule
Large-scale batch data processing                      -> ECS/Fargate task or AWS Batch
```
Most mature production systems **don't pick 100% one side** — they use the right tool for the right workload, which is exactly what a senior interviewer wants to hear instead of an absolute "Lambda is better" or "Containers are better" answer.

**Key point to emphasize in an interview:** always tie the decision to the organization's **real operational cost** — a 3-person team shouldn't self-manage a complex EKS cluster if Lambda/Fargate already meets the need, even though containers are theoretically "more flexible." Conversely, a large organization with a dedicated Kubernetes platform team can better capture the long-term benefits of full containerization.

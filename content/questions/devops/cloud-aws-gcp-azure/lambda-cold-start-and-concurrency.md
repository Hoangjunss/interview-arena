---
id: lambda-cold-start-and-concurrency
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [serverless, lambda, performance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cold start trong Lambda là gì và nguyên nhân gây ra nó? Làm sao để giảm ảnh hưởng của cold start trong production?

## Question (EN)
What is a cold start in Lambda and what causes it? How do you reduce its impact in production?

## Đáp án chi tiết (VI)
**Cold start** là độ trễ xảy ra khi Lambda phải **khởi tạo một execution environment mới** trước khi chạy function — xảy ra khi: lần gọi đầu tiên, không có instance "warm" nào rảnh để tái sử dụng, hoặc traffic tăng đột biến cần thêm concurrent execution.

**Các bước diễn ra trong cold start:**
1. Tải code function (download package/image từ S3/ECR).
2. Khởi tạo runtime (Node.js, Java, Python...).
3. Chạy code **ngoài handler** (import module, khởi tạo DB connection, load config) — gọi là "init phase".
4. Chạy handler xử lý request.

Bước 1-3 chỉ xảy ra ở cold start; các lần gọi tiếp theo tái sử dụng environment (warm) chỉ chạy bước 4.

**Yếu tố ảnh hưởng độ dài cold start:**
| Yếu tố | Ảnh hưởng |
|---|---|
| Runtime | Java/.NET cold start chậm hơn (JVM startup) so với Node.js/Python/Go |
| Package size | Package/image lớn (nhiều dependency) tải lâu hơn |
| VPC attachment | Lambda trong VPC từng chậm hơn đáng kể do phải tạo ENI — đã cải thiện nhiều từ 2019 (Hyperplane ENI) nhưng vẫn có overhead nhỏ |
| Memory | Memory càng cao, CPU càng nhiều → cold start nhanh hơn |

**Concurrency model:** mỗi execution environment chỉ xử lý **1 request tại 1 thời điểm** (trừ khi dùng response streaming/threading tự quản lý bên trong code). Khi có N request đồng thời, Lambda tạo N environment song song (tới giới hạn **concurrency limit**, mặc định 1000/account/region, có thể xin tăng).

**Giải pháp giảm ảnh hưởng cold start:**
1. **Provisioned Concurrency**: giữ sẵn N environment "warm" liên tục, loại bỏ hoàn toàn cold start cho N request đồng thời đầu tiên — nhưng **tốn phí ngay cả khi idle** (mất lợi ích "pay per use" của serverless).
   ```bash
   aws lambda put-provisioned-concurrency-config \
     --function-name my-api \
     --qualifier prod \
     --provisioned-concurrent-executions 5
   ```
2. **Giảm package size**: tree-shaking, loại bỏ dependency không cần, dùng Lambda Layers cho thư viện dùng chung.
3. **Chọn runtime nhẹ**: Node.js/Python/Go thay vì Java nếu latency là ưu tiên hàng đầu.
4. **Tối ưu init code**: khởi tạo DB connection/SDK client **ngoài handler** (tái sử dụng across warm invocation) nhưng tránh làm quá nhiều việc nặng trong init phase.
5. **SnapStart** (cho Java): AWS snapshot execution environment sau khi init, khôi phục từ snapshot thay vì khởi tạo lại từ đầu — giảm cold start Java đáng kể.

**Gotcha:** Provisioned Concurrency vẫn có thể "miss" nếu traffic vượt số lượng provisioned — các request vượt ngưỡng vẫn chịu cold start bình thường (fall back to on-demand scaling), nên cần cấu hình kèm **Application Auto Scaling** cho Provisioned Concurrency theo schedule/target tracking dựa trên traffic pattern thực tế.

## Detailed Answer (EN)
A **cold start** is the latency incurred when Lambda must **initialize a new execution environment** before running the function — happens on the first invocation, when no idle "warm" instance is available for reuse, or when a traffic spike requires additional concurrent executions.

**Steps that happen during a cold start:**
1. Download the function code (package/image from S3/ECR).
2. Initialize the runtime (Node.js, Java, Python, etc.).
3. Run code **outside the handler** (module imports, DB connection setup, config loading) — the "init phase".
4. Run the handler to process the request.

Steps 1-3 only happen on a cold start; subsequent invocations reuse a warm environment and only run step 4.

**Factors affecting cold start duration:**
| Factor | Effect |
|---|---|
| Runtime | Java/.NET cold starts are slower (JVM startup) than Node.js/Python/Go |
| Package size | Larger packages/images (more dependencies) take longer to load |
| VPC attachment | Lambda-in-VPC used to be notably slower due to ENI creation — much improved since 2019 (Hyperplane ENIs) but still a small overhead |
| Memory | More memory means more CPU → faster cold start |

**Concurrency model:** each execution environment handles **one request at a time** (unless using response streaming/internally managed threading). With N concurrent requests, Lambda spins up N parallel environments (up to the **concurrency limit**, default 1000/account/region, which can be raised on request).

**Ways to reduce cold start impact:**
1. **Provisioned Concurrency**: keeps N environments permanently warm, eliminating cold start entirely for the first N concurrent requests — but **costs money even while idle** (loses the "pay per use" benefit of serverless).
   ```bash
   aws lambda put-provisioned-concurrency-config \
     --function-name my-api \
     --qualifier prod \
     --provisioned-concurrent-executions 5
   ```
2. **Reduce package size**: tree-shaking, remove unused dependencies, use Lambda Layers for shared libraries.
3. **Choose a lightweight runtime**: Node.js/Python/Go instead of Java when latency is the top priority.
4. **Optimize init code**: initialize DB connections/SDK clients **outside the handler** (reused across warm invocations) but avoid doing too much heavy work during init.
5. **SnapStart** (for Java): AWS snapshots the execution environment after init and restores from the snapshot instead of re-initializing from scratch — significantly reduces Java cold starts.

**Pitfall:** Provisioned Concurrency can still be "missed" if traffic exceeds the provisioned amount — requests beyond the threshold still incur a normal cold start (falling back to on-demand scaling), so it should be paired with **Application Auto Scaling** for Provisioned Concurrency based on schedule/target tracking that matches real traffic patterns.

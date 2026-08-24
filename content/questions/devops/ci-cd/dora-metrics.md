---
id: dora-metrics
position: devops
technology: ci-cd
level: mid
tags: [metrics, dora, engineering-productivity]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DORA metrics là gì? Làm sao để đo lường và cải thiện các chỉ số này trong thực tế bằng dữ liệu từ CI/CD pipeline?

## Question (EN)
What are DORA metrics? How do you measure and improve them in practice using CI/CD pipeline data?

## Đáp án chi tiết (VI)
**DORA metrics** (DevOps Research and Assessment, nghiên cứu của Google) là 4 chỉ số được chứng minh bằng dữ liệu là có tương quan mạnh với hiệu suất kỹ thuật và hiệu quả kinh doanh của tổ chức phần mềm.

| Metric | Định nghĩa | Elite performer (benchmark) |
|---|---|---|
| **Deployment Frequency** | Tần suất deploy lên production | Nhiều lần/ngày |
| **Lead Time for Changes** | Thời gian từ commit đến khi chạy trên production | Dưới 1 giờ |
| **Change Failure Rate** | % lần deploy gây ra sự cố (incident, rollback, hotfix) | 0-15% |
| **Time to Restore Service (MTTR)** | Thời gian trung bình để khôi phục sau sự cố production | Dưới 1 giờ |

**Cách đo bằng dữ liệu pipeline thực tế:**

1. **Deployment Frequency:** đếm số lần job `deploy-production` chạy thành công, group theo ngày/tuần. Có thể lấy từ webhook của CI platform hoặc Kubernetes deployment history:
```bash
kubectl rollout history deployment/app -n production
```

2. **Lead Time for Changes:** tính từ `commit_timestamp` (git log) đến `deploy_success_timestamp` (log CI). Cần instrument pipeline để ghi 2 mốc thời gian này vào hệ thống theo dõi (ví dụ đẩy event vào Datadog/Prometheus khi mỗi bước hoàn thành).
```python
lead_time = deploy_timestamp - commit_timestamp
```

3. **Change Failure Rate:** cần định nghĩa rõ "failure" là gì — thường là deploy dẫn đến rollback, hotfix trong vòng X giờ, hoặc incident được tag liên kết với deploy đó. Công thức: `số deploy gây lỗi / tổng số deploy`.

4. **MTTR:** từ thời điểm alert/incident được tạo (PagerDuty, thời điểm phát hiện) đến thời điểm service khôi phục (thường đo bằng thời điểm incident được đóng hoặc metric error rate trở lại bình thường).

**Cải thiện từng chỉ số bằng thay đổi pipeline cụ thể:**

| Metric muốn cải thiện | Thay đổi CI/CD cụ thể |
|---|---|
| Deployment Frequency thấp | Chuyển sang trunk-based dev + feature flag; giảm batch size mỗi lần merge; tự động hóa approval không cần thiết |
| Lead Time dài | Tối ưu build cache; song song hóa test; giảm số bước manual approval; tách unit test nhanh khỏi E2E chậm |
| Change Failure Rate cao | Tăng coverage test tự động, thêm canary deployment, quality gate chặt hơn ở PR |
| MTTR cao | Chuẩn bị runbook rollback sẵn, dùng feature flag làm kill switch, alerting tốt hơn, artifact versioning để rollback nhanh |

**Lưu ý quan trọng khi dùng DORA metrics:**
- **4 chỉ số phải nhìn cùng nhau**, không tối ưu riêng lẻ. Ví dụ tăng Deployment Frequency bằng cách bỏ hết test sẽ làm tăng Change Failure Rate — phản tác dụng.
- DORA là chỉ số **năng lực hệ thống**, không nên dùng để đánh giá hiệu suất cá nhân từng dev (dễ gây gaming metric, ví dụ chia nhỏ commit giả tạo để tăng deployment frequency).
- Cần baseline trước khi tối ưu — đo hiện trạng trước, so sánh theo thời gian, không so sánh tuyệt đối với công ty khác vì bối cảnh khác nhau.

## Detailed Answer (EN)
**DORA metrics** (from Google's DevOps Research and Assessment program) are 4 metrics data-proven to correlate strongly with an engineering organization's technical performance and business outcomes.

| Metric | Definition | Elite performer benchmark |
|---|---|---|
| **Deployment Frequency** | How often you deploy to production | Multiple times per day |
| **Lead Time for Changes** | Time from commit to running in production | Under 1 hour |
| **Change Failure Rate** | % of deploys that cause an incident, rollback, or hotfix | 0-15% |
| **Time to Restore Service (MTTR)** | Average time to recover from a production incident | Under 1 hour |

**Measuring with real pipeline data:**

1. **Deployment Frequency:** count successful `deploy-production` job runs, grouped by day/week. Pull this from CI platform webhooks or Kubernetes deployment history:
```bash
kubectl rollout history deployment/app -n production
```

2. **Lead Time for Changes:** compute from `commit_timestamp` (git log) to `deploy_success_timestamp` (CI logs). Instrument the pipeline to record both timestamps into a monitoring system (e.g. pushing events to Datadog/Prometheus as each step completes).
```python
lead_time = deploy_timestamp - commit_timestamp
```

3. **Change Failure Rate:** you need a clear definition of "failure" — typically a deploy that leads to a rollback, a hotfix within X hours, or an incident tagged as linked to that deploy. Formula: `failed deploys / total deploys`.

4. **MTTR:** from the moment an alert/incident is created (PagerDuty, detection time) to the moment service is restored (usually measured by the incident closing or the error-rate metric returning to normal).

**Improving each metric with concrete pipeline changes:**

| Metric to improve | Concrete CI/CD change |
|---|---|
| Low Deployment Frequency | Move to trunk-based dev + feature flags; shrink batch size per merge; automate unnecessary manual approvals |
| Long Lead Time | Optimize build caching; parallelize tests; reduce manual approval steps; split fast unit tests from slow E2E |
| High Change Failure Rate | Increase automated test coverage, add canary deployments, tighten quality gates at PR time |
| High MTTR | Prepare a rollback runbook in advance, use feature flags as a kill switch, better alerting, artifact versioning for fast rollback |

**Important caveats when using DORA metrics:**
- **All 4 metrics must be viewed together**, never optimized in isolation. E.g. boosting Deployment Frequency by cutting all tests will spike Change Failure Rate — self-defeating.
- DORA measures **system-level capability**, not individual developer performance — using it that way invites gaming the metric (e.g. splitting commits artificially to inflate deployment frequency).
- Establish a baseline before optimizing — measure your current state, track change over time, and avoid comparing absolute numbers to other companies since context differs.
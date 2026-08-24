---
id: pipeline-stages-design-best-practices
position: devops
technology: ci-cd
level: mid
tags: [pipeline-design, best-practices]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn thiết kế các stage cho một CI/CD pipeline như thế nào? Nguyên tắc "fail fast" áp dụng ra sao trong việc sắp xếp thứ tự stage?

## Question (EN)
How do you design the stages of a CI/CD pipeline? How does the "fail fast" principle apply to ordering the stages?

## Đáp án chi tiết (VI)
Thiết kế stage tốt xoay quanh 3 nguyên tắc: **fail fast**, **song song hóa những gì độc lập**, và **tách theo chi phí thời gian/tài nguyên**.

**Thứ tự stage điển hình (từ rẻ/nhanh đến đắt/chậm):**

1. **Static checks** (lint, format check, secret scan) — vài giây, chạy trước tiên vì rẻ nhất và bắt được nhiều lỗi "ngớ ngẩn".
2. **Compile/Build** — nếu code không build được thì không cần chạy test.
3. **Unit test** — nhanh, cô lập, không phụ thuộc network/DB.
4. **SAST/dependency scan** (Snyk, Trivy, SonarQube) — có thể chạy song song với unit test vì độc lập.
5. **Package & push artifact** (Docker image, jar) — chỉ chạy nếu các bước trên pass.
6. **Integration test / contract test** — cần môi trường (DB, service mock), chậm hơn.
7. **Deploy to staging**.
8. **E2E/smoke test trên staging**.
9. **Manual approval / quality gate**.
10. **Deploy to production** (rolling/canary/blue-green).
11. **Post-deploy smoke test + monitoring**.

**Fail fast nghĩa là:** đặt các kiểm tra rẻ, nhanh, có xác suất fail cao lên đầu pipeline để không lãng phí thời gian/tài nguyên chạy các bước đắt đỏ (build Docker image, deploy) khi mà code còn lỗi cú pháp cơ bản. Ví dụ: không nên build Docker image (tốn 5 phút) rồi mới phát hiện lint fail — hãy lint trước (10 giây).

**Kỹ thuật tối ưu hóa:**
- **Song song hóa (parallel jobs):** unit test cho từng module chạy song song trên nhiều runner, dùng ma trận (matrix strategy) trong GitHub Actions.
- **Dependency giữa job:** dùng `needs:` (GitHub Actions) hoặc `stage`/`needs` (GitLab CI) để job sau chỉ chạy khi job trước pass.
- **Conditional stage:** chỉ chạy deploy khi push vào `main`, chỉ chạy security scan đầy đủ khi merge (không chạy trên mỗi commit của PR để tiết kiệm thời gian).

```yaml
# GitHub Actions - ví dụ song song + fail fast
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
  unit-test:
    needs: lint
    runs-on: ubuntu-latest
    steps: [...]
  security-scan:
    needs: lint
    runs-on: ubuntu-latest
    steps: [...]
  build-and-push:
    needs: [unit-test, security-scan]
    runs-on: ubuntu-latest
    steps: [...]
```

**Pitfall:** Nhồi tất cả vào một job tuần tự khiến pipeline chạy 20-30 phút dù 90% thời gian dùng để chờ các bước không liên quan tới nhau. Ngoài ra, đặt bước đắt tiền (deploy, e2e) trước bước rẻ (lint) là thiết kế ngược — lãng phí compute và làm chậm feedback cho dev.

## Detailed Answer (EN)
Good stage design revolves around three principles: **fail fast**, **parallelize what's independent**, and **separate by time/resource cost**.

**Typical stage order (cheapest/fastest to most expensive/slowest):**

1. **Static checks** (lint, format check, secret scan) — seconds, run first because they're cheapest and catch many "silly" mistakes.
2. **Compile/Build** — if code doesn't build, no point running tests.
3. **Unit tests** — fast, isolated, no network/DB dependency.
4. **SAST/dependency scan** (Snyk, Trivy, SonarQube) — can run in parallel with unit tests since they're independent.
5. **Package & push artifact** (Docker image, jar) — only runs if the above pass.
6. **Integration/contract tests** — need an environment (DB, service mocks), slower.
7. **Deploy to staging**.
8. **E2E/smoke tests on staging**.
9. **Manual approval / quality gate**.
10. **Deploy to production** (rolling/canary/blue-green).
11. **Post-deploy smoke test + monitoring**.

**Fail fast means:** placing cheap, fast checks with a high probability of catching errors at the front of the pipeline, so you don't waste time/resources running expensive steps (building a Docker image, deploying) when the code still has basic syntax errors. Example: don't build a Docker image (5 minutes) only to discover the lint failed afterward — lint first (10 seconds).

**Optimization techniques:**
- **Parallelization:** run unit tests per module in parallel across runners using a matrix strategy in GitHub Actions.
- **Job dependencies:** use `needs:` (GitHub Actions) or `stage`/`needs` (GitLab CI) so a later job only runs once earlier jobs pass.
- **Conditional stages:** only run deploy on pushes to `main`, only run a full security scan on merge (not on every PR commit) to save time.

```yaml
# GitHub Actions - parallel + fail fast example
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
  unit-test:
    needs: lint
    runs-on: ubuntu-latest
    steps: [...]
  security-scan:
    needs: lint
    runs-on: ubuntu-latest
    steps: [...]
  build-and-push:
    needs: [unit-test, security-scan]
    runs-on: ubuntu-latest
    steps: [...]
```

**Pitfall:** Cramming everything into one sequential job makes the pipeline take 20-30 minutes even though 90% of the time is spent waiting on unrelated steps. Also, putting expensive steps (deploy, e2e) before cheap ones (lint) is backwards design — it wastes compute and slows down developer feedback.

---
id: environment-promotion-strategy
position: devops
technology: ci-cd
level: mid
tags: [deployment-strategy, environments, pipeline-design]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình promotion qua các môi trường (dev → staging → production) hoạt động thế nào trong một pipeline CD? Nên dùng nhiều pipeline riêng biệt hay một pipeline duy nhất đi qua từng môi trường?

## Question (EN)
How does environment promotion (dev → staging → production) work in a CD pipeline? Should you use separate pipelines per environment or one pipeline flowing through each?

## Đáp án chi tiết (VI)
**Environment promotion** là mô hình đưa **cùng một artifact bất biến** đi qua chuỗi môi trường có mức độ giống production tăng dần, mỗi môi trường đóng vai trò một lớp kiểm chứng trước khi đến production.

**Chuỗi môi trường điển hình:**
```
Dev → Staging/QA → (đôi khi Pre-prod/UAT) → Production
```
- **Dev:** môi trường tích hợp sớm, dữ liệu giả, có thể không ổn định, mọi merge vào `main` đều auto-deploy.
- **Staging/QA:** giống production nhất có thể (infra, config, dữ liệu tương tự nhưng đã mask/anonymize), nơi chạy integration/E2E test và QA thủ công.
- **Production:** môi trường thật, traffic thật, yêu cầu approval và/hoặc canary/blue-green.

**Nguyên tắc cốt lõi: "build once, promote many" (KHÔNG rebuild ở mỗi môi trường)**

```yaml
# GitHub Actions - một pipeline, nhiều job promotion tuần tự
jobs:
  build:
    steps:
      - run: docker build -t myrepo/app:${{ github.sha }} .
      - run: docker push myrepo/app:${{ github.sha }}

  deploy-dev:
    needs: build
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n dev

  deploy-staging:
    needs: deploy-dev
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n staging
      - run: npx playwright test

  deploy-production:
    needs: deploy-staging
    environment:
      name: production   # GitHub Environment - có thể yêu cầu manual approval
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n production
```

Nếu build lại image riêng cho từng môi trường (khác nhau dù cùng source code — ví dụ compile flag khác, dependency version khác do cache miss), bạn sẽ vi phạm nguyên tắc quan trọng nhất của CD: **artifact test ở staging chính là artifact chạy ở production**. Build lại tạo ra rủi ro "nó chạy được ở staging nhưng lỗi ở production" dù source code giống hệt — vì môi trường build có thể khác (version compiler, dependency resolve khác).

**Một pipeline hay nhiều pipeline riêng biệt?**

| Cách tiếp cận | Ưu điểm | Nhược điểm |
|---|---|---|
| **Một pipeline, nhiều stage tuần tự (promotion)** | Đảm bảo build once; dễ trace toàn bộ hành trình 1 artifact; audit trail rõ ràng | Pipeline dài, nếu 1 stage giữa chừng fail phải fix rồi chạy lại từ đầu (trừ khi hỗ trợ resume) |
| **Nhiều pipeline riêng (trigger riêng theo môi trường)** | Linh hoạt hơn khi môi trường có quy trình khác biệt lớn (ví dụ production cần compliance riêng) | Dễ vô tình build lại, khó đảm bảo đúng cùng 1 artifact đi qua các môi trường nếu không cẩn thận |

Thực tế phổ biến nhất: **một pipeline logic** (build 1 lần) nhưng **tách deploy thành các job/stage riêng có gate riêng** (như ví dụ trên) — kết hợp được cả hai lợi ích.

**Gate giữa các môi trường:**
- Dev → Staging: tự động, không cần approval.
- Staging → Production: thường cần ít nhất 1 trong các gate: automated test pass (E2E, smoke), manual approval (QA sign-off, release manager), thời gian bake (soak time) đủ lâu ở staging để phát hiện vấn đề chậm xuất hiện.

**Pitfall thường gặp:**
- Config (env variables, connection string) bị hardcode theo môi trường ngay trong artifact thay vì inject tại thời điểm deploy — phá vỡ nguyên tắc "build once" vì phải build riêng cho từng môi trường.
- Staging "giả" quá xa production (thiếu load, thiếu dữ liệu thật, infra khác hẳn) khiến test pass ở staging nhưng vẫn lỗi ở production — cần đầu tư giữ staging gần production nhất có thể (parity).
- Bỏ qua bước promotion tuần tự, deploy thẳng lên production để "tiết kiệm thời gian" trong tình huống khẩn cấp — nếu không có runbook riêng cho hotfix, dễ gây sự cố lớn hơn.

## Detailed Answer (EN)
**Environment promotion** is the pattern of pushing the **same immutable artifact** through a chain of environments that increasingly resemble production, with each environment acting as a validation layer before reaching production.

**Typical environment chain:**
```
Dev → Staging/QA → (sometimes Pre-prod/UAT) → Production
```
- **Dev:** early integration environment, fake data, can be unstable, every merge to `main` auto-deploys.
- **Staging/QA:** as close to production as possible (infra, config, similar but masked/anonymized data), where integration/E2E tests and manual QA run.
- **Production:** the real environment, real traffic, requires approval and/or canary/blue-green.

**Core principle: "build once, promote many" (NEVER rebuild per environment)**

```yaml
# GitHub Actions - one pipeline, sequential promotion jobs
jobs:
  build:
    steps:
      - run: docker build -t myrepo/app:${{ github.sha }} .
      - run: docker push myrepo/app:${{ github.sha }}

  deploy-dev:
    needs: build
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n dev

  deploy-staging:
    needs: deploy-dev
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n staging
      - run: npx playwright test

  deploy-production:
    needs: deploy-staging
    environment:
      name: production   # GitHub Environment - can require manual approval
    steps:
      - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n production
```

If you rebuild a separate image per environment (different despite the same source — e.g. different compiler flags, different resolved dependency versions due to a cache miss), you violate the most important CD principle: **the artifact tested in staging must be the exact artifact running in production**. Rebuilding creates the risk of "it worked in staging but broke in production" even with identical source code — because the build environment itself may differ (compiler version, dependency resolution).

**One pipeline or separate pipelines per environment?**

| Approach | Pros | Cons |
|---|---|---|
| **One pipeline, sequential promotion stages** | Guarantees build-once; easy to trace an artifact's whole journey; clear audit trail | The pipeline is long — if a middle stage fails, fixing and restarting can require starting over (unless resumable) |
| **Separate pipelines per environment (independently triggered)** | More flexible when environments have very different processes (e.g. production needs its own compliance) | Easy to accidentally rebuild; hard to guarantee the exact same artifact flows through without extra discipline |

The most common real-world approach: **one logical pipeline** (build once) but **separate deploy jobs/stages each with their own gate** (as shown above) — getting the benefits of both.

**Gates between environments:**
- Dev → Staging: automatic, no approval needed.
- Staging → Production: usually needs at least one of: automated tests passing (E2E, smoke), manual approval (QA sign-off, release manager), or a sufficient bake/soak time in staging to catch slow-to-appear issues.

**Common pitfalls:**
- Hardcoding config (env variables, connection strings) into the artifact per environment instead of injecting it at deploy time — this breaks the "build once" principle since you end up rebuilding per environment.
- A "fake" staging environment too far from production (missing load, missing realistic data, wildly different infra) causing tests to pass in staging but fail in production — invest in keeping staging as close to production as possible (parity).
- Skipping sequential promotion and deploying straight to production "to save time" during an emergency — without a dedicated hotfix runbook, this can cause a bigger incident.
---
id: what-is-continuous-testing
position: devops
technology: ci-cd
level: junior
tags: [testing, ci-cd-fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Continuous Testing là gì? Nó khác gì so với việc chỉ chạy test trong CI pipeline?

## Question (EN)
What is Continuous Testing? How does it differ from simply running tests inside a CI pipeline?

## Đáp án chi tiết (VI)
**Continuous Testing** là triết lý/thực hành kiểm thử **liên tục ở mọi giai đoạn** của vòng đời phần mềm — không chỉ dừng ở việc chạy `npm test` trong CI, mà là một chiến lược xuyên suốt từ lúc viết code đến sau khi deploy production, nhằm cung cấp phản hồi về rủi ro nghiệp vụ càng sớm càng tốt.

**Phân biệt với "chạy test trong CI":**

| | Chạy test trong CI | Continuous Testing |
|---|---|---|
| **Phạm vi** | Một bước trong pipeline (thường unit + vài integration test) | Toàn bộ vòng đời: local (pre-commit), CI, staging, production (canary/synthetic monitoring) |
| **Mục tiêu** | Xác nhận code không lỗi trước khi merge | Đánh giá **rủi ro release** liên tục — trả lời câu hỏi "hệ thống này có đủ an toàn để đi xa hơn không?" ở mọi mốc |
| **Thời điểm** | Chỉ tại thời điểm CI chạy (sau khi push code) | Ngay từ IDE (linter, test khi save file), pre-commit hook, CI, post-deploy (smoke test, synthetic monitoring 24/7) |

**Các lớp Continuous Testing thực tế:**

1. **Shift-left (trước khi commit):** IDE tích hợp linter/type-check thời gian thực; pre-commit hook chạy test liên quan đến file thay đổi (`lint-staged`).
2. **Trong CI pipeline:** unit test, integration test, static/security scan — như thường thấy.
3. **Trên staging:** E2E test, performance test, contract test giữa các service.
4. **Sau khi deploy production (shift-right):** smoke test tự động ngay sau deploy, synthetic monitoring (giả lập user thật gọi API định kỳ để phát hiện degrade), canary analysis dựa trên metrics thực (error rate, latency) thay vì chỉ test giả lập.

```yaml
# Ví dụ: smoke test tự động chạy NGAY sau khi deploy xong (shift-right)
deploy-production:
  steps:
    - run: kubectl apply -f deployment.yaml
    - run: ./scripts/smoke-test.sh https://api.production.com
      # nếu fail, tự động trigger rollback
```

**Vì sao quan trọng:** Nếu chỉ dừng ở "chạy test trong CI", bạn chỉ biết code đúng **tại thời điểm merge**, không biết được hệ thống có hoạt động đúng trong **môi trường thực với traffic thực** hay không (network latency thực, dữ liệu thực, tải thực). Continuous Testing mở rộng phạm vi kiểm chứng ra ngoài phạm vi "code compile và unit test pass".

**Pitfall thường gặp:** Nhầm lẫn "có CI chạy test" với "có văn hóa continuous testing" — nhiều team có CI xanh nhưng không hề có smoke test/synthetic monitoring sau deploy, nên sự cố production (do khác biệt môi trường, dữ liệu thật) chỉ được phát hiện khi khách hàng report, quá muộn so với việc phát hiện ngay trong vài phút đầu sau deploy.

## Detailed Answer (EN)
**Continuous Testing** is the philosophy/practice of testing **continuously at every stage** of the software lifecycle — not just running `npm test` in CI, but an end-to-end strategy from writing code through post-production deployment, aimed at surfacing business risk feedback as early as possible.

**Distinguishing it from "running tests in CI":**

| | Running tests in CI | Continuous Testing |
|---|---|---|
| **Scope** | One pipeline step (usually unit + some integration tests) | The entire lifecycle: local (pre-commit), CI, staging, production (canary/synthetic monitoring) |
| **Goal** | Confirm code isn't broken before merging | Continuously assess **release risk** — answering "is this system safe enough to move forward?" at every checkpoint |
| **Timing** | Only when CI runs (after a push) | From the IDE onward (linter, on-save tests), pre-commit hooks, CI, post-deploy (smoke tests, 24/7 synthetic monitoring) |

**The real-world layers of Continuous Testing:**

1. **Shift-left (before commit):** IDE-integrated real-time linting/type-checking; pre-commit hooks running tests relevant to changed files (`lint-staged`).
2. **In the CI pipeline:** unit tests, integration tests, static/security scans — the usual suspects.
3. **On staging:** E2E tests, performance tests, contract tests between services.
4. **After production deploy (shift-right):** automated smoke tests right after deployment, synthetic monitoring (simulating real users calling the API periodically to detect degradation), canary analysis based on real metrics (error rate, latency) rather than only simulated tests.

```yaml
# Example: an automated smoke test running RIGHT AFTER deployment (shift-right)
deploy-production:
  steps:
    - run: kubectl apply -f deployment.yaml
    - run: ./scripts/smoke-test.sh https://api.production.com
      # on failure, automatically triggers a rollback
```

**Why it matters:** If you stop at "tests run in CI," you only know the code was correct **at merge time** — you don't know whether the system actually works in a **real environment with real traffic** (real network latency, real data, real load). Continuous Testing extends verification beyond "code compiles and unit tests pass".

**Common pitfall:** Confusing "CI runs tests" with "having a continuous testing culture" — many teams have a green CI but zero smoke tests/synthetic monitoring post-deploy, so production incidents (caused by environment or real-data differences) are only discovered when a customer reports them — far too late compared to catching them in the first few minutes after deploy.
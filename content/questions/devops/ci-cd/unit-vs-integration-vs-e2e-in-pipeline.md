---
id: unit-vs-integration-vs-e2e-in-pipeline
position: devops
technology: ci-cd
level: junior
tags: [testing, ci-cd-fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong một pipeline CI, unit test, integration test và end-to-end (E2E) test khác nhau như thế nào? Nên đặt chúng ở giai đoạn nào của pipeline?

## Question (EN)
In a CI pipeline, how do unit tests, integration tests, and end-to-end (E2E) tests differ? At which stage should each run?

## Đáp án chi tiết (VI)
Ba loại test này khác nhau ở **phạm vi kiểm thử**, **tốc độ chạy**, và **độ tin cậy** — thường được minh họa bằng **testing pyramid**: nhiều unit test ở đáy, ít E2E test ở đỉnh.

| Loại test | Phạm vi | Tốc độ | Phụ thuộc | Vị trí trong pipeline |
|---|---|---|---|---|
| **Unit test** | 1 hàm/class, cô lập hoàn toàn (mock mọi dependency ngoài) | Rất nhanh (mili-giây/test) | Không cần DB, network, service khác | Chạy sớm nhất, trên mọi PR/commit |
| **Integration test** | Nhiều module/service phối hợp với nhau (ví dụ service gọi thật DB, cache) | Trung bình (giây/test) | Cần DB thật (hoặc testcontainer), có thể cần service khác chạy | Sau unit test, thường sau khi build xong artifact |
| **E2E test** | Toàn bộ luồng nghiệp vụ qua UI/API thật, giống hành vi người dùng | Chậm (phút/kịch bản) | Cần môi trường đầy đủ (staging), browser automation (Playwright/Cypress) | Sau khi deploy lên staging, trước khi cho phép lên production |

**Ví dụ cụ thể (hệ thống e-commerce):**
- Unit test: `calculateDiscount(price, couponCode)` trả về đúng giá trị với các input khác nhau — không cần DB.
- Integration test: gọi API `POST /orders` thật, kiểm tra order được lưu đúng vào DB test (dùng Testcontainers spin up Postgres tạm thời).
- E2E test: dùng Playwright mở browser, đăng nhập, thêm sản phẩm vào giỏ, thanh toán, kiểm tra email xác nhận được gửi — mô phỏng đúng hành vi user thật trên môi trường staging.

**Vị trí trong pipeline (GitHub Actions ví dụ):**
```yaml
jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps: [ ... npm run test:unit ... ]

  integration-test:
    needs: unit-test
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
    steps: [ ... npm run test:integration ... ]

  deploy-staging:
    needs: integration-test
    steps: [ ... deploy ... ]

  e2e-test:
    needs: deploy-staging
    steps: [ ... npx playwright test ... ]
```

**Vì sao phân tầng như vậy quan trọng:** Nếu chạy E2E test cho mọi PR ngay từ đầu, feedback loop sẽ rất chậm (E2E thường mất 10-30 phút và dễ flaky vì phụ thuộc network/UI timing). Đặt unit test — nhanh và rẻ — ở đầu để bắt phần lớn lỗi logic sớm; chỉ khi qua được các lớp rẻ hơn mới đầu tư chạy E2E tốn kém.

**Pitfall thường gặp:**
- Đảo ngược testing pyramid ("ice cream cone anti-pattern") — quá nhiều E2E test, quá ít unit test, khiến pipeline chậm và test suite dễ flaky, khó maintain.
- Gọi integration test là "unit test" (mock không đủ, vẫn kết nối DB thật) khiến test chạy chậm nhưng lại tưởng đang có bộ unit test nhanh.
- Không cô lập môi trường integration test — chạy song song 2 pipeline dùng chung 1 DB test gây race condition, kết quả test không ổn định.

## Detailed Answer (EN)
These three test types differ in **scope**, **speed**, and **reliability** — often illustrated by the **testing pyramid**: many unit tests at the base, few E2E tests at the top.

| Test type | Scope | Speed | Dependencies | Pipeline placement |
|---|---|---|---|---|
| **Unit test** | One function/class, fully isolated (mocks every external dependency) | Very fast (milliseconds/test) | No DB, network, or other services needed | Runs earliest, on every PR/commit |
| **Integration test** | Multiple modules/services working together (e.g. a service hitting a real DB, cache) | Medium (seconds/test) | Needs a real DB (or a testcontainer), possibly other running services | After unit tests, usually after the artifact is built |
| **E2E test** | Full business flow through a real UI/API, mimicking user behavior | Slow (minutes/scenario) | Needs a full environment (staging), browser automation (Playwright/Cypress) | After deploying to staging, before allowing promotion to production |

**Concrete example (e-commerce system):**
- Unit test: `calculateDiscount(price, couponCode)` returns the correct value for various inputs — no DB needed.
- Integration test: call the real `POST /orders` API, verify the order is correctly persisted to a test DB (spun up on the fly via Testcontainers/Postgres).
- E2E test: use Playwright to open a browser, log in, add a product to the cart, check out, and verify a confirmation email was sent — accurately simulating real user behavior on staging.

**Pipeline placement (GitHub Actions example):**
```yaml
jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps: [ ... npm run test:unit ... ]

  integration-test:
    needs: unit-test
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
    steps: [ ... npm run test:integration ... ]

  deploy-staging:
    needs: integration-test
    steps: [ ... deploy ... ]

  e2e-test:
    needs: deploy-staging
    steps: [ ... npx playwright test ... ]
```

**Why this layering matters:** Running E2E tests on every PR from the start would badly slow feedback (E2E often takes 10-30 minutes and is prone to flakiness from network/UI timing). Put unit tests — fast and cheap — first to catch most logic errors early; only invest in expensive E2E runs once the cheaper layers pass.

**Common pitfalls:**
- Inverting the testing pyramid ("ice cream cone anti-pattern") — too many E2E tests, too few unit tests, making the pipeline slow and the suite prone to flakiness and hard to maintain.
- Calling something a "unit test" when it isn't sufficiently mocked and still hits a real DB — the tests run slow while the team mistakenly believes they have a fast unit-test suite.
- Not isolating the integration-test environment — two pipelines running in parallel against the same shared test DB causes race conditions and unstable results.
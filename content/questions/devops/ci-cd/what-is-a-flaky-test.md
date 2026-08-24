---
id: what-is-a-flaky-test
position: devops
technology: ci-cd
level: junior
tags: [testing, reliability, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flaky test là gì? Vì sao nó nguy hiểm cho pipeline CI/CD và bạn xử lý flaky test như thế nào?

## Question (EN)
What is a flaky test? Why is it dangerous for a CI/CD pipeline, and how do you deal with flaky tests?

## Đáp án chi tiết (VI)
**Flaky test** là test **không cho kết quả nhất quán** khi chạy nhiều lần trên cùng một đoạn code không đổi — lúc pass, lúc fail, dù không có gì thay đổi.

**Vì sao nguy hiểm:**
- **Xói mòn niềm tin vào CI:** khi dev thấy pipeline fail nhưng biết "chắc lại do flaky test", họ bắt đầu bấm re-run mà không điều tra, dần dần bỏ qua cả những fail thật sự.
- **Che giấu bug thật:** một số flaky test flaky vì nó đang phát hiện race condition/bug thật trong code (không phải lỗi test) — bỏ qua nó nghĩa là bỏ qua bug tiềm ẩn.
- **Chặn merge/deploy oan:** nếu quality gate yêu cầu 100% test pass, một flaky test có thể chặn một PR hoàn toàn tốt, gây chậm trễ release.
- **Tốn compute/thời gian:** retry pipeline nhiều lần để "may mắn pass" gây lãng phí tài nguyên CI runner.

**Nguyên nhân phổ biến:**

| Nguyên nhân | Ví dụ |
|---|---|
| **Race condition/thời gian bất định** | `setTimeout(fn, 100)` rồi assert ngay, đôi khi async chưa kịp hoàn thành |
| **Phụ thuộc thứ tự chạy test** | Test B giả định state do test A để lại, nhưng test framework chạy song song/đảo thứ tự |
| **Phụ thuộc môi trường ngoài** | Gọi API thật (không mock) bị timeout ngẫu nhiên, hoặc phụ thuộc giờ hệ thống (`new Date()`) |
| **Tài nguyên chia sẻ** | 2 test chạy song song cùng ghi vào 1 file/DB record, gây conflict |
| **Test không dọn dẹp (cleanup) đúng** | Data từ test trước còn sót lại ảnh hưởng test sau |

**Cách xử lý:**

1. **Phát hiện:** dùng công cụ track flaky test qua nhiều lần chạy (ví dụ chạy test suite N lần liên tục trong CI để tìm test không ổn định), hoặc dùng tính năng built-in như GitHub Actions "re-run failed jobs" kết hợp theo dõi lịch sử pass/fail của từng test.

2. **Cách ly ngay, không để chặn pipeline:** đánh dấu quarantine (`test.skip` có ticket theo dõi, hoặc gắn tag `@flaky` để CI tách riêng, không tính vào quality gate) — nhưng phải có deadline sửa, không để mãi mãi.
```javascript
// Jest ví dụ - đánh dấu để theo dõi riêng, không chặn pipeline chính
test.skip('checkout flow - FLAKY-1234, tracked for fix', () => { ... });
```

3. **Sửa tận gốc:**
- Thay `setTimeout` cứng bằng `waitFor`/polling có điều kiện rõ ràng (`await waitFor(() => expect(...).toBeVisible())`).
- Mock thời gian hệ thống, network call thay vì phụ thuộc môi trường thật.
- Đảm bảo mỗi test độc lập hoàn toàn: setup/teardown riêng, không chia sẻ state global.
- Chạy test với `--randomize` để chủ động phát hiện phụ thuộc thứ tự ẩn.

4. **Retry có kiểm soát (giải pháp tạm, không phải fix thật):** một số team cho phép retry tự động 1-2 lần cho test nghi flaky trong lúc chờ fix, nhưng đây là band-aid — nếu retry che giấu bug thật, nó nguy hiểm hơn là giúp ích.

**Pitfall:** Retry tự động toàn bộ suite mà không theo dõi test nào flaky thường xuyên sẽ khiến flaky test tồn tại vĩnh viễn không ai sửa — vì "nó tự pass ở lần retry 2" nên không ai thấy cấp bách phải fix.

## Detailed Answer (EN)
A **flaky test** is one that **produces inconsistent results** when run multiple times against unchanged code — sometimes passing, sometimes failing, with nothing actually different.

**Why it's dangerous:**
- **Erodes trust in CI:** when developers see the pipeline fail and assume "probably just a flaky test", they start re-running blindly without investigating, and eventually start ignoring real failures too.
- **Masks real bugs:** some tests are flaky because they're catching a genuine race condition/bug in the code (not a test defect) — ignoring it means ignoring a latent bug.
- **Blocks merges/deploys unfairly:** if a quality gate requires 100% test pass, one flaky test can block a perfectly good PR, delaying releases.
- **Wastes compute/time:** re-running the pipeline repeatedly hoping to "get lucky" wastes CI runner resources.

**Common causes:**

| Cause | Example |
|---|---|
| **Race conditions/timing indeterminism** | `setTimeout(fn, 100)` followed immediately by an assertion, sometimes before the async work finishes |
| **Test-order dependency** | Test B assumes state left behind by test A, but the framework runs tests in parallel/random order |
| **External environment dependency** | Calling a real API (unmocked) that randomly times out, or relying on wall-clock time (`new Date()`) |
| **Shared resources** | Two tests running in parallel both write to the same file/DB record, causing conflicts |
| **Improper cleanup** | Leftover data from a previous test affects the next one |

**How to deal with it:**

1. **Detect:** use tooling to track flakiness across multiple runs (e.g. running the test suite N times in a row in CI to spot unstable tests), or use built-in features like GitHub Actions "re-run failed jobs" combined with per-test pass/fail history tracking.

2. **Quarantine immediately without blocking the pipeline:** mark it as quarantined (`test.skip` with a tracking ticket, or tag `@flaky` so CI separates it out and excludes it from the quality gate) — but always with a deadline to fix, never permanently.
```javascript
// Jest example - marked for separate tracking, doesn't block the main pipeline
test.skip('checkout flow - FLAKY-1234, tracked for fix', () => { ... });
```

3. **Fix the root cause:**
- Replace hardcoded `setTimeout` with explicit condition-based polling (`await waitFor(() => expect(...).toBeVisible())`).
- Mock system time and network calls instead of depending on the real environment.
- Ensure each test is fully independent: its own setup/teardown, no shared global state.
- Run tests with `--randomize` to proactively surface hidden order dependencies.

4. **Controlled retries (a temporary mitigation, not a real fix):** some teams allow 1-2 automatic retries for suspected flaky tests while waiting on a fix, but this is a band-aid — if the retry is masking a real bug, it's more harmful than helpful.

**Pitfall:** Blanket auto-retrying the whole suite without tracking which specific tests are chronically flaky lets flaky tests live forever unfixed — since "it passed on retry 2" removes the urgency anyone feels to actually fix it.
---
id: debugging-a-broken-pipeline
position: devops
technology: ci-cd
level: mid
tags: [debugging, troubleshooting, github-actions]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline CI đột nhiên fail dù không ai đổi gì trong code liên quan — bạn debug theo quy trình nào? Nêu các nguyên nhân thường gặp.

## Question (EN)
A CI pipeline suddenly fails even though nobody changed anything related in the code — what's your debugging process? What are common root causes?

## Đáp án chi tiết (VI)
Đây là tình huống rất thực tế: "works on my machine" nhưng CI fail, hoặc pipeline chạy ổn định hàng tháng rồi bỗng đỏ mà "không ai đổi gì". Quy trình debug có hệ thống:

**Bước 1: Đọc log lỗi chính xác, đừng đoán.**
- Xem chính xác step nào fail, exit code là gì, message lỗi đầy đủ (không chỉ dòng cuối — nhiều lỗi thực sự nằm ở giữa log, dòng cuối chỉ là "Process exited with code 1").
- Với GitHub Actions, bật `ACTIONS_STEP_DEBUG=true` (secret) để log chi tiết hơn.

**Bước 2: Xác định "không ai đổi gì" có thực sự đúng không.**
- Kiểm tra `git log` xem có commit nào mới trên nhánh, kể cả merge tự động từ Dependabot/Renovate.
- Kiểm tra pipeline config (`.github/workflows/*.yml`) có bị đổi bởi PR khác không.

**Bước 3: Loại trừ theo nhóm nguyên nhân phổ biến (từ dễ đến khó):**

| Nguyên nhân | Cách nhận biết | Cách fix |
|---|---|---|
| **Dependency version trôi (floating version)** | `package.json` dùng `^1.2.0` thay vì pin cứng, một bản patch mới của thư viện phá vỡ tương thích | Pin version cụ thể, dùng lock file (`package-lock.json`, `poetry.lock`) và cài bằng `npm ci` thay vì `npm install` |
| **Base image Docker thay đổi ngầm** | `FROM node:20` (không pin tag cụ thể) kéo về patch version mới có breaking change | Pin digest: `FROM node:20.11.0-alpine@sha256:...` |
| **External service/API bên thứ 3 down hoặc rate limit** | Test gọi API thật (npm registry, Docker Hub) bị timeout/429 | Thêm retry với backoff, cache dependency, hoặc mock external call trong test |
| **Runner image của CI platform update** | GitHub cập nhật `ubuntu-latest` sang version OS mới, tool version mặc định thay đổi | Pin runner cụ thể (`ubuntu-22.04` thay vì `ubuntu-latest`) nếu cần ổn định tuyệt đối |
| **Flaky test / race condition** | Fail không nhất quán khi retry | Xem câu hỏi riêng về flaky test |
| **Hết dung lượng/quota** | Disk full trên runner, hết cache quota, hết secret quota | Dọn dẹp artifact cũ, tăng resource runner |
| **Thay đổi ở service phụ thuộc (shared lib, monorepo)** | Một service khác trong cùng repo đổi API mà service này phụ thuộc | Kiểm tra dependency graph, xem PR gần đây ở package liên quan |
| **Cache bị corrupt/stale** | Build dùng cache cũ sai với code hiện tại | Xóa cache CI, chạy lại pipeline "no cache" để xác nhận |

**Bước 4: Cô lập bằng cách reproduce local hoặc chạy pipeline ở chế độ debug.**
```bash
# Chạy đúng lệnh CI ở local với cùng phiên bản Node/tool
docker run --rm -it node:20.11.0-alpine sh -c "npm ci && npm test"
```
Nếu lỗi tái hiện được ở local với đúng image/version CI dùng, đã cô lập được vấn đề vào code/dependency thay vì hạ tầng CI.

**Bước 5: Nếu nghi ngờ do external factor, kiểm tra changelog/status page** của dependency, base image, hoặc CI platform (GitHub Status, npm registry status).

**Pitfall khi debug:**
- Vội vàng thêm `--force`/`retry` để "cho qua" mà không hiểu nguyên nhân — che giấu vấn đề, để lại nợ kỹ thuật, có thể tái phát nghiêm trọng hơn sau này.
- Không phân biệt được lỗi do code mới thực sự có bug với lỗi do môi trường/dependency bên ngoài thay đổi — dẫn đến sửa sai chỗ (revert code tốt trong khi vấn đề nằm ở base image).
- Bỏ qua log warning tưởng như không liên quan — nhiều khi warning ở bước trước (ví dụ "deprecated API" ) chính là dấu hiệu sớm của lỗi ở bước sau.

## Detailed Answer (EN)
This is a very real scenario: "works on my machine" but CI fails, or a pipeline runs fine for months then suddenly turns red with "nobody changed anything." A systematic debugging process:

**Step 1: Read the actual error log, don't guess.**
- Identify precisely which step failed, the exit code, and the full error message (not just the last line — many real errors sit mid-log, with the last line just saying "Process exited with code 1").
- On GitHub Actions, enable `ACTIONS_STEP_DEBUG=true` (secret) for more detailed logging.

**Step 2: Verify "nobody changed anything" is actually true.**
- Check `git log` for any new commits on the branch, including automated merges from Dependabot/Renovate.
- Check whether the pipeline config (`.github/workflows/*.yml`) was changed by another PR.

**Step 3: Rule out common cause categories (easiest to hardest):**

| Cause | How to recognize | Fix |
|---|---|---|
| **Floating dependency versions** | `package.json` uses `^1.2.0` instead of pinning, a new patch release breaks compatibility | Pin exact versions, use lock files (`package-lock.json`, `poetry.lock`), install with `npm ci` instead of `npm install` |
| **Docker base image silently changed** | `FROM node:20` (untagged patch) pulls a new patch version with a breaking change | Pin the digest: `FROM node:20.11.0-alpine@sha256:...` |
| **Third-party service/API down or rate-limited** | Tests hitting real APIs (npm registry, Docker Hub) timeout/get 429s | Add retry with backoff, cache dependencies, or mock external calls in tests |
| **CI platform's runner image updated** | GitHub updates `ubuntu-latest` to a new OS version, default tool versions change | Pin a specific runner (`ubuntu-22.04` instead of `ubuntu-latest`) if absolute stability is needed |
| **Flaky test / race condition** | Inconsistent failure across retries | See the dedicated flaky test question |
| **Ran out of capacity/quota** | Disk full on the runner, cache quota exceeded, secret quota exceeded | Clean up old artifacts, increase runner resources |
| **Change in a dependent service (shared lib, monorepo)** | Another service in the same repo changed an API this one depends on | Check the dependency graph, look at recent PRs in related packages |
| **Corrupt/stale cache** | The build uses an outdated cache mismatched with current code | Clear the CI cache, run the pipeline "no cache" to confirm |

**Step 4: Isolate by reproducing locally or running the pipeline in debug mode.**
```bash
# Run the exact CI command locally with the same Node/tool version
docker run --rm -it node:20.11.0-alpine sh -c "npm ci && npm test"
```
If the error reproduces locally with the exact image/version CI uses, you've isolated the problem to code/dependencies rather than CI infrastructure.

**Step 5: If you suspect an external factor, check the changelog/status page** of the dependency, base image, or CI platform (GitHub Status, npm registry status).

**Debugging pitfalls:**
- Hastily adding `--force`/retry to "make it pass" without understanding the cause — this hides the problem, leaves technical debt, and can recur more severely later.
- Failing to distinguish a real bug in new code from an environment/dependency change outside your control — leading to fixing the wrong thing (reverting good code while the real issue is the base image).
- Ignoring a warning that seems unrelated — a warning in an earlier step (e.g. "deprecated API") is often an early signal of the failure that shows up later.
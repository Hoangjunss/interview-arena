---
id: what-is-a-build-pipeline
position: devops
technology: ci-cd
level: junior
tags: [ci-cd-fundamentals, pipeline]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một build pipeline (CI pipeline) là gì? Nó thường bao gồm những thành phần/bước nào?

## Question (EN)
What is a build pipeline (CI pipeline)? What components/stages does it typically include?

## Đáp án chi tiết (VI)
**Build pipeline** là một chuỗi các bước tự động được kích hoạt mỗi khi có sự kiện (push code, mở PR, tạo tag...) nhằm biến source code thành artifact có thể chạy được, đồng thời xác thực chất lượng code trước khi merge/release.

Các bước phổ biến trong một pipeline CI cơ bản:

1. **Checkout** — clone source code từ Git tại đúng commit/branch.
2. **Install dependencies** — `npm ci`, `mvn dependency:resolve`, `pip install -r requirements.txt`...
3. **Lint / Static analysis** — ESLint, Checkstyle, SonarQube để bắt lỗi style/code smell sớm.
4. **Build/Compile** — biên dịch code (`mvn package`, `go build`, `tsc`).
5. **Unit test** — chạy test nhanh, cô lập (JUnit, Jest).
6. **Package artifact** — đóng gói thành `.jar`, Docker image, `.zip`.
7. **Publish artifact** — đẩy lên registry (Nexus, Artifactory, Docker Hub/ECR).
8. (Tùy pipeline) **Integration test / deploy to staging / security scan**.

Ví dụ một GitHub Actions workflow tối giản:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

**Vì sao quan trọng:** Pipeline giúp phát hiện lỗi ngay khi vừa commit thay vì để đến lúc QA hoặc production mới phát hiện — chi phí sửa lỗi tăng theo cấp số nhân càng phát hiện muộn. Một pipeline tốt phải **nhanh** (feedback loop dưới vài phút) và **đáng tin cậy** (không flaky), nếu không dev sẽ mất niềm tin và bắt đầu bỏ qua kết quả CI.

**Lỗi thường gặp của người mới:** nhét quá nhiều bước nặng (ví dụ e2e test toàn bộ) vào pipeline chạy trên mỗi push, khiến feedback loop chậm (>15-20 phút), làm giảm năng suất — nên tách stage nhanh (unit test) chạy mọi lúc, còn stage nặng (e2e, security scan) chạy theo lịch hoặc chỉ trên merge vào main.

## Detailed Answer (EN)
A **build pipeline** is a chain of automated steps triggered by an event (a push, opening a PR, creating a tag...) that turns source code into a runnable artifact while validating code quality before merge/release.

Common stages in a basic CI pipeline:

1. **Checkout** — clone source code at the right commit/branch.
2. **Install dependencies** — `npm ci`, `mvn dependency:resolve`, `pip install -r requirements.txt`...
3. **Lint / Static analysis** — ESLint, Checkstyle, SonarQube to catch style/code smells early.
4. **Build/Compile** — compile the code (`mvn package`, `go build`, `tsc`).
5. **Unit tests** — run fast, isolated tests (JUnit, Jest).
6. **Package artifact** — package into a `.jar`, Docker image, `.zip`.
7. **Publish artifact** — push to a registry (Nexus, Artifactory, Docker Hub/ECR).
8. (Depending on the pipeline) **Integration tests / deploy to staging / security scan**.

A minimal GitHub Actions example:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

**Why it matters:** A pipeline catches issues right at commit time instead of waiting for QA or production to find them — the cost of a fix grows exponentially the later it's found. A good pipeline must be **fast** (feedback loop under a few minutes) and **reliable** (no flakiness); otherwise developers lose trust and start ignoring CI results.

**Common beginner mistake:** cramming too many heavy steps (e.g. a full e2e suite) into the pipeline that runs on every push, blowing up the feedback loop (>15-20 minutes) and hurting productivity — split fast stages (unit tests) to run always, and heavy stages (e2e, security scans) to run on a schedule or only on merges to main.

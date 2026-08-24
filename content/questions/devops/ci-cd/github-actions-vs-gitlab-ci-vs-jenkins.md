---
id: github-actions-vs-gitlab-ci-vs-jenkins
position: devops
technology: ci-cd
level: junior
tags: [pipeline-as-code, tooling, github-actions]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh GitHub Actions, GitLab CI và Jenkins. Ưu nhược điểm của mỗi công cụ và khi nào nên chọn cái nào?

## Question (EN)
Compare GitHub Actions, GitLab CI, and Jenkins. What are the pros/cons of each, and when would you choose one over another?

## Đáp án chi tiết (VI)
Cả ba đều là công cụ **pipeline-as-code** — định nghĩa pipeline bằng file cấu hình lưu trong Git thay vì click chuột trên UI — nhưng khác nhau về kiến trúc, độ linh hoạt và hệ sinh thái.

| Tiêu chí | GitHub Actions | GitLab CI | Jenkins |
|---|---|---|---|
| **Kiểu hosting** | SaaS (GitHub-hosted runner) hoặc self-hosted runner | SaaS (GitLab.com) hoặc self-hosted | Chủ yếu self-hosted (server riêng) |
| **File cấu hình** | `.github/workflows/*.yml` | `.gitlab-ci.yml` | `Jenkinsfile` (Groovy DSL) |
| **Tích hợp** | Chặt với GitHub (PR, issue, release) | Chặt với GitLab (MR, container registry built-in) | Độc lập với VCS, tích hợp qua plugin |
| **Marketplace/Plugin** | GitHub Marketplace (rất nhiều action cộng đồng) | Ít hơn, thiên về built-in feature | Plugin ecosystem lâu đời, cực kỳ phong phú (17000+ plugin) |
| **Độ linh hoạt** | Trung bình — YAML khai báo, dùng `composite actions` cho logic phức tạp | Trung bình — YAML + `rules`, `extends` để tái sử dụng | Cao nhất — Groovy full programming language, custom logic tùy ý |
| **Bảo trì hạ tầng** | Không cần (managed runner) trừ khi self-hosted | Không cần (managed runner) trừ khi self-hosted | Cần tự quản lý server, upgrade, bảo mật |
| **Chi phí** | Free tier hào phóng cho public repo, tính phút cho private | Free tier tương tự, tính phút | Free (open-source) nhưng tốn chi phí vận hành hạ tầng |
| **Learning curve** | Thấp — YAML đơn giản | Thấp-trung bình | Cao — cần hiểu Groovy, plugin, agent |

**Ví dụ GitHub Actions:**
```yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**Ví dụ GitLab CI:**
```yaml
stages: [test]
test:
  stage: test
  script:
    - npm test
```

**Ví dụ Jenkinsfile (declarative):**
```groovy
pipeline {
  agent any
  stages {
    stage('Test') {
      steps { sh 'npm test' }
    }
  }
}
```

**Khi nào chọn cái nào:**
- **GitHub Actions:** đã dùng GitHub, muốn setup nhanh, không muốn quản lý hạ tầng CI, team nhỏ-vừa.
- **GitLab CI:** đã dùng GitLab (đặc biệt GitLab self-managed cho công ty cần compliance/on-prem), muốn tích hợp registry/security scanning built-in (GitLab Ultimate có SAST/DAST tích hợp sẵn).
- **Jenkins:** hệ thống legacy, cần logic pipeline cực kỳ phức tạp/tùy biến, cần chạy on-premise hoàn toàn vì lý do bảo mật/compliance nghiêm ngặt, hoặc đã đầu tư lớn vào plugin ecosystem sẵn có (ví dụ tích hợp với hệ thống nội bộ cũ).

**Pitfall khi so sánh:** Nhiều người nghĩ Jenkins "lỗi thời" nhưng thực tế nó vẫn thống trị ở doanh nghiệp lớn vì tính tùy biến và khả năng chạy hoàn toàn on-premise (air-gapped network). Ngược lại, GitHub Actions/GitLab CI dễ dùng hơn nhưng có thể gặp giới hạn khi cần logic phức tạp (ví dụ dynamic pipeline generation) hoặc vendor lock-in vào nền tảng Git tương ứng.

## Detailed Answer (EN)
All three are **pipeline-as-code** tools — defining pipelines via config files stored in Git rather than clicking through a UI — but differ in architecture, flexibility, and ecosystem.

| Criterion | GitHub Actions | GitLab CI | Jenkins |
|---|---|---|---|
| **Hosting model** | SaaS (GitHub-hosted runners) or self-hosted runners | SaaS (GitLab.com) or self-hosted | Mostly self-hosted (your own server) |
| **Config file** | `.github/workflows/*.yml` | `.gitlab-ci.yml` | `Jenkinsfile` (Groovy DSL) |
| **Integration** | Tight with GitHub (PRs, issues, releases) | Tight with GitLab (MRs, built-in container registry) | VCS-agnostic, integrated via plugins |
| **Marketplace/plugins** | GitHub Marketplace (huge community action library) | Fewer, leans on built-in features | Long-standing plugin ecosystem, extremely rich (17,000+ plugins) |
| **Flexibility** | Medium — declarative YAML, `composite actions` for complex logic | Medium — YAML + `rules`, `extends` for reuse | Highest — Groovy is a full programming language, arbitrary custom logic |
| **Infra maintenance** | None needed (managed runners) unless self-hosted | None needed (managed runners) unless self-hosted | Must self-manage the server, upgrades, security |
| **Cost** | Generous free tier for public repos, billed by minute for private | Similar free tier, billed by minute | Free (open-source) but you pay for infra operations |
| **Learning curve** | Low — simple YAML | Low-medium | High — requires understanding Groovy, plugins, agents |

**GitHub Actions example:**
```yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**GitLab CI example:**
```yaml
stages: [test]
test:
  stage: test
  script:
    - npm test
```

**Jenkinsfile example (declarative):**
```groovy
pipeline {
  agent any
  stages {
    stage('Test') {
      steps { sh 'npm test' }
    }
  }
}
```

**When to choose which:**
- **GitHub Actions:** already on GitHub, want a fast setup, don't want to manage CI infrastructure, small-to-medium teams.
- **GitLab CI:** already on GitLab (especially self-managed GitLab for compliance/on-prem needs), want built-in registry/security scanning (GitLab Ultimate ships integrated SAST/DAST).
- **Jenkins:** legacy systems, need extremely complex/custom pipeline logic, need fully on-premise/air-gapped execution for strict security/compliance reasons, or already have heavy investment in its plugin ecosystem (e.g. integration with old internal systems).

**Comparison pitfall:** Many assume Jenkins is "outdated", but it still dominates in large enterprises precisely because of its customizability and ability to run fully on-premise (air-gapped networks). Conversely, GitHub Actions/GitLab CI are easier to use but can hit limits with complex logic (e.g. dynamic pipeline generation) or lock you into their respective Git platform.
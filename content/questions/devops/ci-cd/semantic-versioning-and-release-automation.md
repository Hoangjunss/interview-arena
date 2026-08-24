---
id: semantic-versioning-and-release-automation
position: devops
technology: ci-cd
level: mid
tags: [versioning, release-automation, pipeline-design]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Semantic Versioning (SemVer) là gì? Làm sao để tự động hóa việc bump version và tạo changelog trong pipeline CI/CD?

## Question (EN)
What is Semantic Versioning (SemVer)? How do you automate version bumping and changelog generation in a CI/CD pipeline?

## Đáp án chi tiết (VI)
**Semantic Versioning** là quy ước đặt tên version theo format `MAJOR.MINOR.PATCH` (ví dụ `2.4.1`), mỗi phần mang ý nghĩa rõ ràng về mức độ ảnh hưởng của thay đổi:

| Phần | Tăng khi nào | Ví dụ |
|---|---|---|
| **MAJOR** | Có breaking change, không tương thích ngược | Đổi API signature, xóa endpoint cũ |
| **MINOR** | Thêm tính năng mới, tương thích ngược | Thêm endpoint mới, thêm optional field |
| **PATCH** | Sửa lỗi, không đổi behavior/API | Fix bug, cải thiện performance |

**Vấn đề của việc bump version thủ công:** dễ quên, dễ sai (bump MINOR nhưng thực ra có breaking change), tốn thời gian, và không nhất quán giữa các thành viên team.

**Tự động hóa bằng Conventional Commits + semantic-release:**

Trước tiên, chuẩn hóa commit message theo **Conventional Commits**:
```
feat: add discount calculation for bulk orders     → bump MINOR
fix: correct rounding error in tax calculation     → bump PATCH
feat!: remove deprecated v1 payment API             → bump MAJOR (dấu ! hoặc BREAKING CHANGE trong body)
chore: update dependencies                          → không bump version
```

Sau đó dùng công cụ (`semantic-release`, hoặc `standard-version`, hoặc `release-please` của Google) để tự động:
1. Đọc toàn bộ commit từ lần release trước.
2. Suy ra loại bump (major/minor/patch) dựa trên loại commit cao nhất tìm thấy.
3. Tự động cập nhật `package.json`/`Cargo.toml`/tag Git.
4. Sinh `CHANGELOG.md` từ commit message.
5. Tạo GitHub Release kèm release note.
6. (Tùy chọn) publish package lên npm/registry.

```yaml
# GitHub Actions - semantic-release
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Cấu hình `.releaserc`:**
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

**Kết quả:** mỗi lần merge vào `main`, pipeline tự động quyết định version tiếp theo (ví dụ `2.4.0` → `2.4.1` nếu chỉ có `fix:`, hoặc `2.5.0` nếu có `feat:`), tự động publish, tự động sinh changelog — không cần con người can thiệp quyết định số version.

**Trade-off/rủi ro:**
- Đòi hỏi kỷ luật commit message nghiêm ngặt — nếu team không tuân thủ Conventional Commits, tool suy luận sai loại bump (ví dụ quên đánh dấu breaking change dẫn đến release MINOR nhưng thực chất phá vỡ API).
- Với monorepo nhiều package, cần công cụ hỗ trợ **independent versioning** (mỗi package version riêng) như `changesets` (phổ biến trong hệ sinh thái JS) thay vì `semantic-release` thuần (thường giả định 1 package/1 version).
- Semantic-release tự động publish có thể rủi ro nếu pipeline có lỗi logic — cần test kỹ trước khi bật auto-publish cho package public.

## Detailed Answer (EN)
**Semantic Versioning** is a naming convention in the format `MAJOR.MINOR.PATCH` (e.g. `2.4.1`), where each segment carries a clear meaning about the impact of a change:

| Segment | Bumped when | Example |
|---|---|---|
| **MAJOR** | A breaking, backward-incompatible change | Changing an API signature, removing an old endpoint |
| **MINOR** | A new feature added, backward compatible | Adding a new endpoint, adding an optional field |
| **PATCH** | A bug fix, no change to behavior/API | Fixing a bug, improving performance |

**The problem with manual version bumping:** easy to forget, easy to get wrong (bumping MINOR when it's actually a breaking change), time-consuming, and inconsistent across team members.

**Automating with Conventional Commits + semantic-release:**

First, standardize commit messages using **Conventional Commits**:
```
feat: add discount calculation for bulk orders     → bump MINOR
fix: correct rounding error in tax calculation     → bump PATCH
feat!: remove deprecated v1 payment API             → bump MAJOR (! mark or BREAKING CHANGE in body)
chore: update dependencies                          → no version bump
```

Then use a tool (`semantic-release`, `standard-version`, or Google's `release-please`) to automate:
1. Reading all commits since the last release.
2. Inferring the bump type (major/minor/patch) from the highest-priority commit type found.
3. Automatically updating `package.json`/`Cargo.toml`/Git tag.
4. Generating `CHANGELOG.md` from commit messages.
5. Creating a GitHub Release with release notes.
6. (Optionally) publishing the package to npm/a registry.

```yaml
# GitHub Actions - semantic-release
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**`.releaserc` config:**
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

**Result:** on every merge to `main`, the pipeline automatically decides the next version (e.g. `2.4.0` → `2.4.1` if only `fix:` commits exist, or `2.5.0` if a `feat:` commit exists), automatically publishes, and automatically generates a changelog — no human decides the version number.

**Trade-offs/risks:**
- Requires strict commit-message discipline — if the team doesn't follow Conventional Commits, the tool infers the wrong bump type (e.g. forgetting to mark a breaking change results in a MINOR release that actually breaks the API).
- For monorepos with multiple packages, you need tooling that supports **independent versioning** (each package versioned separately), like `changesets` (popular in the JS ecosystem), rather than plain `semantic-release` (which usually assumes one package per repo).
- Auto-publishing via semantic-release can be risky if the pipeline has a logic bug — test thoroughly before enabling auto-publish for a public package.
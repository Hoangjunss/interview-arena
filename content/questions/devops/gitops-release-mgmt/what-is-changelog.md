---
id: what-is-changelog
position: devops
technology: gitops-release-mgmt
level: junior
tags: [release-management, documentation, git]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Changelog là gì và tại sao nó quan trọng trong quy trình release? Làm sao để tự động sinh changelog từ Git history?

## Question (EN)
What is a changelog, and why does it matter in a release process? How can a changelog be generated automatically from Git history?

## Đáp án chi tiết (VI)
**Changelog** là một tài liệu (thường là file `CHANGELOG.md`) liệt kê **những gì đã thay đổi giữa các phiên bản** của một phần mềm — tính năng mới, bugfix, breaking change — theo thứ tự thời gian/version.

**Vì sao quan trọng:**
- Giúp **team khác** (frontend, QA, product) biết chuyện gì thay đổi mà không cần đọc code diff.
- Giúp **quyết định nâng cấp**: đọc changelog để biết version mới có breaking change hay không trước khi bump dependency.
- Là **bằng chứng audit**: khi có sự cố production, changelog giúp trả lời nhanh "bản release gần nhất thay đổi gì".
- Kết hợp với SemVer để user hiểu ngay mức độ rủi ro khi upgrade.

**Changelog viết tay (dễ bị bỏ quên, không nhất quán):**
```markdown
## [1.5.0] - 2026-08-24
### Added
- API mới cho tra cứu lịch sử đơn hàng
### Fixed
- Sửa lỗi race condition khi tạo order đồng thời
```

**Tự động sinh changelog** bằng cách tuân thủ **Conventional Commits** (`feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`) và dùng tool như `semantic-release`, `git-cliff`, hoặc `standard-version`:

```bash
# Ví dụ commit message tuân thủ Conventional Commits
git commit -m "feat(order): add order history lookup API"
git commit -m "fix(order): resolve race condition on concurrent create"
git commit -m "feat(auth)!: change token format

BREAKING CHANGE: old JWT tokens are no longer valid"
```

```bash
# git-cliff tự sinh CHANGELOG.md từ commit history
git-cliff --tag v1.5.0 -o CHANGELOG.md
```

Kết quả: tool tự phân loại commit theo prefix, tự tính version tiếp theo (feat → minor, fix → patch, BREAKING CHANGE → major), và sinh changelog markdown chuẩn hoá — loại bỏ việc con người phải nhớ viết tay.

**Trong context GitOps/release repo:** changelog thường được gắn kèm PR update version trong config repo, giúp reviewer (người approve deploy lên prod) biết chính xác thay đổi gì đang được promote, đặc biệt quan trọng khi có **approval gate** thủ công trước khi vào production.

**Pitfall:** viết changelog chung chung kiểu "misc fixes", "update stuff" — vô dụng khi cần điều tra sự cố hoặc quyết định rollback. Changelog tốt phải đủ chi tiết để người đọc quyết định được "có nên rollback bản này không" mà không cần đọc code.

## Detailed Answer (EN)
A **changelog** is a document (typically a `CHANGELOG.md` file) listing **what changed between versions** of a piece of software — new features, bugfixes, breaking changes — in chronological/version order.

**Why it matters:**
- Lets **other teams** (frontend, QA, product) know what changed without reading a code diff.
- Informs **upgrade decisions**: read the changelog to see whether a new version has breaking changes before bumping a dependency.
- Serves as an **audit trail**: during a production incident, the changelog quickly answers "what did the latest release change?"
- Paired with SemVer, it lets users instantly gauge upgrade risk.

**Hand-written changelog (easy to forget, inconsistent):**
```markdown
## [1.5.0] - 2026-08-24
### Added
- New API for order history lookup
### Fixed
- Fixed race condition on concurrent order creation
```

**Automatically generating a changelog** by following **Conventional Commits** (`feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`) with a tool like `semantic-release`, `git-cliff`, or `standard-version`:

```bash
# Example commit messages following Conventional Commits
git commit -m "feat(order): add order history lookup API"
git commit -m "fix(order): resolve race condition on concurrent create"
git commit -m "feat(auth)!: change token format

BREAKING CHANGE: old JWT tokens are no longer valid"
```

```bash
# git-cliff auto-generates CHANGELOG.md from commit history
git-cliff --tag v1.5.0 -o CHANGELOG.md
```

Result: the tool auto-categorizes commits by prefix, auto-computes the next version (feat → minor, fix → patch, BREAKING CHANGE → major), and produces a standardized markdown changelog — eliminating manual, error-prone writing.

**In a GitOps/release repo context:** the changelog is often attached to the PR that bumps the version in the config repo, letting the reviewer (the person approving the prod deploy) know exactly what's being promoted — especially important with a manual **approval gate** before production.

**Pitfall:** writing vague changelog entries like "misc fixes" or "update stuff" — useless when investigating an incident or deciding whether to roll back. A good changelog must be detailed enough for a reader to decide "should I roll this back?" without reading the code.

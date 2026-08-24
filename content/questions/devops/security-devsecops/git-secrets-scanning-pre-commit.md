---
id: git-secrets-scanning-pre-commit
position: devops
technology: security-devsecops
level: junior
tags: [secrets-management, ci-cd, sast]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao ngăn developer commit nhầm secret (API key, password) lên Git? Trình bày cách thiết lập secret scanning ở cả pre-commit hook và trong CI pipeline.

## Question (EN)
How do you prevent developers from accidentally committing secrets (API keys, passwords) to Git? Show how to set up secret scanning at both the pre-commit hook and CI pipeline levels.

## Đáp án chi tiết (VI)
**Tại sao đây là vấn đề nghiêm trọng:** một khi secret đã được commit, nó **tồn tại vĩnh viễn trong Git history** kể cả sau khi bị xoá ở commit sau — bất kỳ ai clone repo đều có thể `git log -p` để tìm lại. Với repo public, thời gian từ lúc push đến lúc bị bot quét và khai thác có thể chỉ vài phút.

**Chiến lược phòng thủ nhiều lớp (defense in depth):**

**Lớp 1 — Pre-commit hook (chặn ngay trên máy dev, sớm nhất có thể):**
```bash
# Cài gitleaks làm pre-commit hook qua pre-commit framework
pip install pre-commit
```
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks
```
```bash
pre-commit install
# Từ giờ mỗi lần "git commit" sẽ tự động scan diff trước khi cho phép commit
```
Nếu phát hiện secret:
```
Finding:     AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
Secret:      AKIAIOSFODNN7EXAMPLE
RuleID:      aws-access-token
File:        config/settings.py
Line:        12
```
Commit bị chặn ngay tại đây — chưa kịp push lên remote.

**Lớp 2 — CI pipeline (bắt trường hợp dev bypass hook bằng `--no-verify`):**
```yaml
# GitHub Actions
- name: Scan for secrets
  uses: gitleaks/gitleaks-action@v2
  env:
    GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```
Đây là lớp bắt buộc, không thể bỏ qua như pre-commit hook (dev không có quyền skip bước CI) — quan trọng vì pre-commit hook chỉ mang tính khuyến nghị, ai cũng có thể `git commit --no-verify` để bypass.

**Lớp 3 — Scan toàn bộ history định kỳ (bắt các secret đã lọt từ trước khi có công cụ):**
```bash
# Scan toàn bộ Git history, không chỉ commit mới
gitleaks detect --source . --log-opts="--all"
```

**Xử lý khi phát hiện secret đã lọt vào history (không chỉ xoá ở commit mới):**
```bash
# git filter-repo để xoá triệt để khỏi toàn bộ history
git filter-repo --path config/settings.py --invert-paths

# Sau đó BẮT BUỘC phải rotate secret đó, vì force-push không đảm bảo
# xoá hết mọi clone/fork đã tồn tại trước đó - coi như secret đã bị lộ vĩnh viễn
```

**Cấu hình rule tuỳ chỉnh để giảm false positive:**
```toml
# .gitleaks.toml
[[rules]]
  id = "custom-internal-token"
  regex = '''internal_token_[a-zA-Z0-9]{32}'''

[allowlist]
  paths = [
    '''.*_test\.go''',        # bỏ qua test fixture chứa fake secret
    '''docs/examples/.*'''
  ]
```

**Pitfall thường gặp:**
- Chỉ dựa vào pre-commit hook mà không có lớp CI — hook chỉ chạy trên máy dev đã cài đặt, dev mới join team hoặc quên cài `pre-commit install` sẽ không được bảo vệ.
- Phát hiện secret trong CI nhưng chỉ cảnh báo (warning) thay vì fail build — secret vẫn được merge vào `main`, biến "cảnh báo sớm" thành vô nghĩa.
- Quên rằng "xoá file khỏi commit mới nhất" không đủ — Git lưu toàn bộ history, phải dùng `filter-repo`/BFG và **luôn rotate secret** bất kể có xoá khỏi history hay không, vì không thể chắc chắn không ai đã pull/fork trước đó.

## Detailed Answer (EN)
**Why this is a serious problem:** once a secret is committed, it **lives forever in Git history** even after being deleted in a later commit — anyone who clones the repo can `git log -p` to find it. For public repos, the time from push to a bot scanning and exploiting it can be just minutes.

**Defense-in-depth strategy:**

**Layer 1 — Pre-commit hook (blocks on the dev's machine, as early as possible):**
```bash
# Install gitleaks as a pre-commit hook via the pre-commit framework
pip install pre-commit
```
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks
```
```bash
pre-commit install
# From now on, every "git commit" auto-scans the diff before allowing the commit
```
If a secret is detected:
```
Finding:     AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
Secret:      AKIAIOSFODNN7EXAMPLE
RuleID:      aws-access-token
File:        config/settings.py
Line:        12
```
The commit is blocked right here — before it's even pushed to remote.

**Layer 2 — CI pipeline (catches devs who bypass the hook with `--no-verify`):**
```yaml
# GitHub Actions
- name: Scan for secrets
  uses: gitleaks/gitleaks-action@v2
  env:
    GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```
This layer is mandatory, unlike the pre-commit hook (developers can't skip a required CI step) — critical because pre-commit hooks are only advisory; anyone can run `git commit --no-verify` to bypass them.

**Layer 3 — Periodic full-history scans (catches secrets that leaked before the tooling existed):**
```bash
# Scan the entire Git history, not just new commits
gitleaks detect --source . --log-opts="--all"
```

**Handling a secret that already leaked into history (not just deleting it in a new commit):**
```bash
# git filter-repo to purge it from the entire history
git filter-repo --path config/settings.py --invert-paths

# Then you MUST rotate that secret, because force-pushing doesn't guarantee
# removal from every existing clone/fork - treat the secret as permanently exposed
```

**Custom rules to reduce false positives:**
```toml
# .gitleaks.toml
[[rules]]
  id = "custom-internal-token"
  regex = '''internal_token_[a-zA-Z0-9]{32}'''

[allowlist]
  paths = [
    '''.*_test\.go''',        # ignore test fixtures containing fake secrets
    '''docs/examples/.*'''
  ]
```

**Common pitfalls:**
- Relying only on the pre-commit hook without a CI layer — the hook only runs on machines where it's installed; a new team member or someone who forgot `pre-commit install` isn't protected.
- Detecting a secret in CI but only warning instead of failing the build — the secret still merges into `main`, making the "early warning" pointless.
- Forgetting that "deleting the file in the latest commit" isn't enough — Git preserves the full history, so you must use `filter-repo`/BFG and **always rotate the secret** regardless of whether it was purged from history, since you can never be certain nobody already pulled or forked it.

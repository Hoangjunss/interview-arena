---
id: test-gating-quality-gates
position: devops
technology: ci-cd
level: mid
tags: [testing, quality-gates, code-coverage]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quality gate trong CI/CD là gì? Bạn thiết lập các tiêu chí gate (code coverage, static analysis, security scan) như thế nào để cân bằng giữa chất lượng và tốc độ release?

## Question (EN)
What is a quality gate in CI/CD? How do you set gating criteria (code coverage, static analysis, security scan) to balance quality with release velocity?

## Đáp án chi tiết (VI)
**Quality gate** là một điểm kiểm tra tự động trong pipeline: nếu code không đạt tiêu chí đã định (coverage, số lỗi lint, số lỗ hổng bảo mật...), pipeline **fail** và **chặn merge/deploy**. Đây là cách "đóng băng" tiêu chuẩn chất lượng thành quy tắc máy thực thi, thay vì phụ thuộc vào review thủ công dễ bỏ sót.

**Các loại gate phổ biến:**

1. **Code coverage threshold:**
```yaml
# ví dụ với Jest + GitHub Actions
- run: npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
```
Nếu coverage dưới 80%, `npm test` exit code khác 0 → job fail → PR không thể merge (nếu cấu hình branch protection yêu cầu check này pass).

2. **Static analysis / code smell (SonarQube):**
```yaml
- uses: sonarsource/sonarqube-scan-action@v4
- name: SonarQube Quality Gate
  uses: sonarsource/sonarqube-quality-gate-action@v1
  timeout-minutes: 5
```
SonarQube có khái niệm **Quality Gate** riêng: fail nếu có bug mới mức Blocker/Critical, duplication > X%, hoặc coverage của code mới (New Code) dưới ngưỡng.

3. **Security/dependency scan (SAST, SCA):**
```yaml
- uses: aquasecurity/trivy-action@master
  with:
    severity: 'CRITICAL,HIGH'
    exit-code: '1'
```
`exit-code: 1` khiến pipeline fail nếu tìm thấy lỗ hổng mức Critical/High — chặn artifact có CVE nghiêm trọng lên production.

4. **Branch protection rule** (GitHub) buộc các check trên phải pass trước khi cho phép merge:
```
Settings > Branches > Require status checks to pass before merging:
  - unit-tests
  - sonarqube-quality-gate
  - trivy-scan
```

**Cân bằng chất lượng vs tốc độ — nguyên tắc thực tế:**

| Cách tiếp cận | Khi dùng |
|---|---|
| **Coverage trên "New Code" thay vì toàn bộ codebase** | Codebase legacy có coverage thấp — ép coverage 80% toàn bộ ngay lập tức là bất khả thi; chỉ ép code mới phải có coverage cao |
| **Gate cứng (block) cho Critical/High, chỉ cảnh báo (warning) cho Medium/Low** | Không làm tê liệt pipeline vì lỗi nhỏ không đáng chặn release |
| **Gate khác nhau theo nhánh** | PR vào `main`: gate đầy đủ. Nhánh feature nội bộ: gate nhẹ hơn để không cản trở tốc độ phát triển |
| **Time-box cho security scan** | Scan quá lâu (>10 phút) làm chậm feedback — cân nhắc chạy scan nặng theo lịch (nightly) thay vì mọi PR |

**Pitfall thường gặp:**
- Đặt ngưỡng coverage quá cao (ví dụ 95%) khiến dev viết test vô nghĩa chỉ để pass số liệu (test không assert gì thực chất) — coverage cao không đồng nghĩa test tốt.
- Gate quá nghiêm ngặt mà không có "override có kiểm soát" (ví dụ cho phép lead approve bypass trong trường hợp khẩn cấp) khiến team tìm cách lách gate hoàn toàn (comment out test, disable rule) thay vì sửa đúng vấn đề.
- Không phân biệt gate cho code mới và code cũ khiến việc áp dụng gate vào dự án legacy trở nên bất khả thi và bị team phản đối ngay từ đầu.

## Detailed Answer (EN)
A **quality gate** is an automated checkpoint in the pipeline: if the code fails a defined criterion (coverage, lint error count, security vulnerabilities...), the pipeline **fails** and **blocks merge/deploy**. This "freezes" quality standards into a machine-enforced rule instead of relying on manual review, which is prone to oversight.

**Common gate types:**

1. **Code coverage threshold:**
```yaml
# example with Jest + GitHub Actions
- run: npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
```
If coverage falls below 80%, `npm test` exits non-zero → job fails → the PR can't be merged (if branch protection requires this check to pass).

2. **Static analysis / code smells (SonarQube):**
```yaml
- uses: sonarsource/sonarqube-scan-action@v4
- name: SonarQube Quality Gate
  uses: sonarsource/sonarqube-quality-gate-action@v1
  timeout-minutes: 5
```
SonarQube has its own **Quality Gate** concept: fails if there are new Blocker/Critical bugs, duplication above X%, or coverage of new code below a threshold.

3. **Security/dependency scanning (SAST, SCA):**
```yaml
- uses: aquasecurity/trivy-action@master
  with:
    severity: 'CRITICAL,HIGH'
    exit-code: '1'
```
`exit-code: 1` fails the pipeline if a Critical/High vulnerability is found — blocking an artifact with a serious CVE from reaching production.

4. **Branch protection rules** (GitHub) require these checks to pass before allowing a merge:
```
Settings > Branches > Require status checks to pass before merging:
  - unit-tests
  - sonarqube-quality-gate
  - trivy-scan
```

**Balancing quality vs velocity — practical principles:**

| Approach | When to use |
|---|---|
| **Gate coverage on "New Code" rather than the whole codebase** | Legacy codebases with low overall coverage — forcing 80% globally overnight is unrealistic; only require new code to meet a high bar |
| **Hard block for Critical/High, warning-only for Medium/Low** | Avoids paralyzing the pipeline over minor issues not worth blocking a release |
| **Different gates per branch** | PR into `main`: full gate. Internal feature branch: lighter gate so it doesn't slow down development |
| **Time-box security scans** | A scan taking too long (>10 min) slows feedback — consider running heavy scans on a schedule (nightly) instead of every PR |

**Common pitfalls:**
- Setting coverage thresholds too high (e.g. 95%) drives developers to write meaningless tests just to hit the number (tests that assert nothing real) — high coverage doesn't mean good tests.
- Overly strict gates without a "controlled override" (e.g. allowing a lead to approve a bypass in emergencies) push teams to game the gate entirely (commenting out tests, disabling rules) instead of fixing the real issue.
- Not distinguishing gates for new vs legacy code makes rolling out gates on an old project infeasible and gets rejected by the team outright.
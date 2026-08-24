---
id: shift-left-security-sast-dast-sca-pipeline
position: devops
technology: security-devsecops
level: mid
tags: [devsecops, ci-cd, sast, dast, sca]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
"Shift-left security" nghĩa là gì? Trình bày cách bạn tích hợp SAST, SCA và DAST vào một pipeline CI/CD thực tế, và xử lý thế nào khi kết quả scan có quá nhiều false positive.

## Question (EN)
What does "shift-left security" mean? Describe how you would integrate SAST, SCA, and DAST into a real CI/CD pipeline, and how you'd handle a scan producing too many false positives.

## Đáp án chi tiết (VI)
**Shift-left security** nghĩa là đưa việc kiểm tra bảo mật vào càng sớm càng tốt trong vòng đời phát triển (lúc code, commit, PR) thay vì chỉ kiểm tra ở giai đoạn pre-production hoặc sau khi bị pentest/incident. Lợi ích: chi phí sửa lỗi tăng theo cấp số nhân nếu phát hiện muộn (IDE → CI → staging → production).

**Ba loại kiểm tra chính và vị trí trong pipeline:**

| Loại | Kiểm tra gì | Công cụ phổ biến | Chạy ở đâu |
|---|---|---|---|
| **SAST** (Static Application Security Testing) | Lỗi trong source code (SQL injection, hardcoded secret, unsafe deserialization) mà không cần chạy app | SonarQube, Semgrep, CodeQL, Checkmarx | Pre-commit hook, mỗi PR |
| **SCA** (Software Composition Analysis) | Lỗ hổng CVE trong thư viện/dependency bên thứ 3, license compliance | Snyk, Trivy, OWASP Dependency-Check, Grype | Mỗi PR, khi có dependency mới |
| **DAST** (Dynamic Application Security Testing) | Lỗ hổng runtime bằng cách tấn công thật vào app đang chạy (XSS, CSRF, auth bypass) | OWASP ZAP, Burp Suite | Sau khi deploy lên staging, trước khi lên prod |

**Pipeline mẫu (GitLab CI):**
```yaml
stages: [build, sast, sca, deploy-staging, dast, deploy-prod]

sast:
  stage: sast
  script:
    - semgrep --config=auto --error --json -o sast-report.json .
  artifacts:
    reports:
      sast: sast-report.json

sca:
  stage: sca
  script:
    - trivy fs --severity HIGH,CRITICAL --exit-code 1 .
  allow_failure: false

dast:
  stage: dast
  script:
    - docker run -t owasp/zap2docker-stable zap-baseline.py -t https://staging.example.com -r zap-report.html
  needs: [deploy-staging]
```

**Xử lý false positive — đây là phần quan trọng nhất trong thực tế:**
1. **Baseline/suppress có lý do rõ ràng**: dùng file suppression (`.semgrepignore`, Trivy `.trivyignore`) kèm comment giải thích tại sao an toàn, có ngày review lại — không suppress vĩnh viễn không lý do.
2. **Tune rule set thay vì tắt cả tool**: nhiều SAST default rule set quá nhạy (ví dụ cảnh báo mọi string concatenation là SQL injection). Custom rule theo ngôn ngữ/framework cụ thể giảm noise đáng kể.
3. **Gate theo severity, không phải theo tổng số finding**: block merge chỉ khi có CRITICAL/HIGH chưa được triage, để LOW/MEDIUM vào backlog theo dõi thay vì làm dev "mù" vì quá nhiều cảnh báo (alert fatigue).
4. **Track false-positive rate theo thời gian** — nếu rate cao liên tục, đổi tool hoặc điều chỉnh threshold, đừng để dev quen tay bấm "ignore" mọi cảnh báo (dẫn đến bỏ sót true positive thật).

**Pitfall thường gặp:** chạy DAST full scan (active scan) nhắm vào production — có thể gây downtime hoặc side-effect thật (VD: tạo đơn hàng thật, xoá dữ liệu thật) nếu app không có staging riêng biệt và dữ liệu test.

## Detailed Answer (EN)
**Shift-left security** means moving security checks as early as possible in the development lifecycle (at coding time, commit time, PR time) instead of only checking at pre-production or after a pentest/incident. The rationale: the cost of fixing a vulnerability grows exponentially the later it's found (IDE → CI → staging → production).

**Three main check types and where they fit in the pipeline:**

| Type | What it checks | Common tools | Where it runs |
|---|---|---|---|
| **SAST** (Static Application Security Testing) | Source-code flaws (SQL injection, hardcoded secrets, unsafe deserialization) without running the app | SonarQube, Semgrep, CodeQL, Checkmarx | Pre-commit hook, on every PR |
| **SCA** (Software Composition Analysis) | CVEs in third-party libraries/dependencies, license compliance | Snyk, Trivy, OWASP Dependency-Check, Grype | On every PR, when a new dependency is added |
| **DAST** (Dynamic Application Security Testing) | Runtime vulnerabilities by actually attacking a running app (XSS, CSRF, auth bypass) | OWASP ZAP, Burp Suite | After deploying to staging, before production |

**Sample pipeline (GitLab CI):**
```yaml
stages: [build, sast, sca, deploy-staging, dast, deploy-prod]

sast:
  stage: sast
  script:
    - semgrep --config=auto --error --json -o sast-report.json .
  artifacts:
    reports:
      sast: sast-report.json

sca:
  stage: sca
  script:
    - trivy fs --severity HIGH,CRITICAL --exit-code 1 .
  allow_failure: false

dast:
  stage: dast
  script:
    - docker run -t owasp/zap2docker-stable zap-baseline.py -t https://staging.example.com -r zap-report.html
  needs: [deploy-staging]
```

**Handling false positives — the most important part in practice:**
1. **Suppress with a documented reason**: use a suppression file (`.semgrepignore`, Trivy's `.trivyignore`) with a comment explaining why it's safe and a review date — never suppress permanently without justification.
2. **Tune the rule set instead of disabling the whole tool**: many default SAST rule sets are overly sensitive (e.g., flagging every string concatenation as SQL injection). Custom rules per language/framework cut noise significantly.
3. **Gate on severity, not total finding count**: block merges only for un-triaged CRITICAL/HIGH findings; route LOW/MEDIUM to a tracked backlog instead of blinding developers with noise (alert fatigue).
4. **Track false-positive rate over time** — if it stays high, switch tools or adjust thresholds; don't let developers get into the habit of clicking "ignore" on everything (which causes real true positives to slip through).

**Common pitfall:** running a full active DAST scan against production — it can cause downtime or real side effects (e.g., creating real orders, deleting real data) if the app lacks a proper isolated staging environment with test data.

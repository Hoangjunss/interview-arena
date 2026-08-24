---
id: securitycontext-nen-cau-hinh-gi-cho-pod-container
position: backend
technology: operations-\u0026-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SecurityContext nên cấu hình gì cho Pod/container?

## Question (EN)
What should be configured in Pod/container SecurityContext?

## Đáp án chi tiết (VI)
SecurityContext cấu hình quyền chạy container như user/group, privileged mode, capabilities, read-only root filesystem và privilege escalation. Mục tiêu là giảm quyền runtime nếu container bị khai thác.\
\
Ví dụ:\
```yaml\
securityContext:\
  runAsNonRoot: true\
  allowPrivilegeEscalation: false\
  readOnlyRootFilesystem: true\
  capabilities:\
    drop: [\\"ALL\\"]\
```\
Cần test app vì read-only filesystem hoặc non-root có thể yêu cầu chỉnh path ghi tạm, permissions hoặc image build.

## Detailed Answer (EN)
SecurityContext configures runtime permissions such as user/group, privileged mode, capabilities, read-only root filesystem and privilege escalation. The goal is reducing runtime permissions if a container is exploited.\
\
Example:\
```yaml\
securityContext:\
  runAsNonRoot: true\
  allowPrivilegeEscalation: false\
  readOnlyRootFilesystem: true\
  capabilities:\
    drop: [\\"ALL\\"]\
```\
Test the app because read-only filesystem or non-root runtime may require changing temp paths, permissions or image build.

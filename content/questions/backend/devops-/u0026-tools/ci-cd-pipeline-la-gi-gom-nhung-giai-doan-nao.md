---
id: ci-cd-pipeline-la-gi-gom-nhung-giai-doan-nao
position: backend
technology: devops-\u0026-tools
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI/CD pipeline là gì? Gồm những giai đoạn nào?

## Question (EN)
What is a CI/CD pipeline and what stages does it have?

## Đáp án chi tiết (VI)
Pipeline là chuỗi bước **tự động** đưa mã từ commit tới môi trường chạy — thay cho quy trình thủ công.\
\
Các giai đoạn (stage) điển hình:\
1. **Source**: trigger khi push/merge (webhook từ Git).\
2. **Build**: biên dịch, đóng gói (vd build Docker image).\
3. **Test**: unit → integration → lint/security scan; fail thì dừng.\
4. **Artifact**: lưu output (image, binary) vào registry.\
5. **Deploy**: đẩy lên staging/prod, có thể kèm approval.\
\
Nguyên tắc: **fail fast** (lỗi lộ sớm, dừng ngay), mỗi commit đi qua cùng một pipeline nhất quán. Công cụ: GitHub Actions, GitLab CI, Jenkins, CircleCI.

## Detailed Answer (EN)
A pipeline is a chain of **automated** steps taking code from commit to a running environment — replacing manual process.\
\
Typical stages:\
1. **Source**: triggered on push/merge (Git webhook).\
2. **Build**: compile and package (e.g. build a Docker image).\
3. **Test**: unit → integration → lint/security scan; stop on failure.\
4. **Artifact**: store output (image, binary) in a registry.\
5. **Deploy**: push to staging/prod, possibly with an approval gate.\
\
Principles: **fail fast** (surface errors early, stop immediately), and every commit goes through the same consistent pipeline. Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI.

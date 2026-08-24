---
id: ci-vs-cd-vs-continuous-deployment
position: devops
technology: ci-cd
level: junior
tags: [ci-cd-fundamentals, concepts]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Continuous Integration (CI), Continuous Delivery và Continuous Deployment. Cho ví dụ cụ thể để minh họa sự khác nhau.

## Question (EN)
Explain the difference between Continuous Integration (CI), Continuous Delivery, and Continuous Deployment. Give a concrete example to illustrate the difference.

## Đáp án chi tiết (VI)
Ba khái niệm này thường bị dùng lẫn lộn nhưng khác nhau ở **mức độ tự động hóa** và **điểm dừng cuối cùng** của pipeline.

| Khái niệm | Mục tiêu | Điểm dừng | Yêu cầu con người |
|---|---|---|---|
| **Continuous Integration (CI)** | Tích hợp code của nhiều dev vào nhánh chung liên tục, phát hiện lỗi sớm | Sau build + unit test | Không cần duyệt để merge nếu pipeline pass |
| **Continuous Delivery** | Đảm bảo code luôn ở trạng thái **có thể** release bất cứ lúc nào | Artifact đã sẵn sàng ở staging/pre-prod, chờ **duyệt thủ công** để lên production | Cần người bấm nút "Deploy to Production" |
| **Continuous Deployment** | Mọi commit pass pipeline sẽ **tự động** lên production | Production | Không cần con người can thiệp |

**Ví dụ cụ thể:**
- CI: Dev push code lên nhánh `feature/xyz`, GitHub Actions tự động chạy `mvn test`, nếu fail thì báo đỏ ngay trên PR — chưa nói gì đến việc deploy.
- Continuous Delivery: Sau khi merge vào `main`, pipeline tự động build Docker image, deploy lên môi trường staging, chạy integration test. Artifact này đã "release-ready" nhưng vẫn cần một Product Owner hoặc Release Manager bấm nút approve trên Jenkins/GitLab để đẩy lên production (thường vì lý do business — release theo lịch, theo tính năng).
- Continuous Deployment: Giống Continuous Delivery nhưng bỏ bước approve thủ công — pass hết test là tự động lên production luôn. Các công ty như Etsy, Amazon từng công bố deploy hàng trăm/nghìn lần mỗi ngày theo mô hình này.

**Pitfall thường gặp:**
- Nhiều người nói "chúng tôi làm CI/CD" nhưng thực ra chỉ có CI (build + test tự động), chưa hề tự động deploy — cần hỏi rõ trong phỏng vấn để tránh nhầm.
- Continuous Deployment đòi hỏi test suite cực kỳ đáng tin cậy (high coverage, không flaky) và cơ chế rollback/feature flag tốt, vì không còn "người gác cổng" cuối cùng trước khi code chạm vào khách hàng thật.
- Một số hệ thống có yêu cầu compliance (tài chính, y tế) bắt buộc phải có bước approval thủ công — nên chọn Continuous Delivery thay vì Continuous Deployment.

## Detailed Answer (EN)
These three terms are often used interchangeably but differ in **automation level** and the **final stopping point** of the pipeline.

| Concept | Goal | Stops at | Human involvement |
|---|---|---|---|
| **Continuous Integration (CI)** | Continuously merge multiple developers' code into a shared branch, catch integration bugs early | After build + unit tests | No approval needed to merge if pipeline passes |
| **Continuous Delivery** | Guarantee the codebase is always **releasable** at any moment | Artifact ready in staging/pre-prod, waiting for **manual approval** to go to production | A human clicks "Deploy to Production" |
| **Continuous Deployment** | Every commit that passes the pipeline is **automatically** shipped to production | Production | No human intervention |

**Concrete example:**
- CI: A dev pushes to `feature/xyz`; GitHub Actions automatically runs `mvn test`. If it fails, the PR shows a red check — nothing about deployment yet.
- Continuous Delivery: After merging to `main`, the pipeline auto-builds a Docker image, deploys to staging, runs integration tests. The artifact is "release-ready", but a Product Owner or Release Manager still has to click approve in Jenkins/GitLab to push to production (usually for business reasons — scheduled releases, feature bundling).
- Continuous Deployment: Same as Continuous Delivery but without the manual approval gate — passing tests means an automatic push to production. Companies like Etsy and Amazon have reported hundreds/thousands of deploys per day under this model.

**Common pitfalls:**
- People often say "we do CI/CD" when they really only have CI (automated build + test) with no automated deployment at all — worth clarifying in an interview.
- Continuous Deployment demands an extremely reliable test suite (high coverage, no flakiness) and solid rollback/feature-flag mechanisms, since there's no final human gatekeeper before code touches real users.
- Regulated systems (finance, healthcare) often require a mandatory manual approval step — so Continuous Delivery is the right choice there, not Continuous Deployment.

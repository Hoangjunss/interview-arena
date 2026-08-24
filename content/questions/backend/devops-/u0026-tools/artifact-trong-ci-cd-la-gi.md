---
id: artifact-trong-ci-cd-la-gi
position: backend
technology: devops-\u0026-tools
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Artifact trong CI/CD là gì?

## Question (EN)
What is an artifact in CI/CD?

## Đáp án chi tiết (VI)
Artifact là **sản phẩm đầu ra bất biến** của bước build, sẵn sàng để deploy hoặc test tiếp — vd Docker image, file `.jar`/`.war`, binary, gói npm, hay thư mục `dist`.\
\
- **Build once, deploy many**: build **một lần** ra artifact rồi dùng **chính artifact đó** cho mọi môi trường (staging → prod) → đảm bảo thứ chạy ở prod đúng thứ đã test.\
- Lưu ở **artifact registry** (Docker Hub/ECR cho image, Nexus/Artifactory cho package) và **gắn version/tag** để truy vết + rollback.\
- Khác với **build cache** (dữ liệu tạm tăng tốc build); artifact là kết quả cuối cần lưu.\
\
Nguyên tắc: đừng build lại cho mỗi môi trường — chỉ promote cùng một artifact.

## Detailed Answer (EN)
An artifact is the **immutable output** of a build, ready to deploy or test further — e.g. a Docker image, a `.jar`/`.war`, a binary, an npm package, or a `dist` folder.\
\
- **Build once, deploy many**: build **once** into an artifact, then use **that same artifact** across environments (staging → prod) → ensuring what runs in prod is exactly what was tested.\
- Stored in an **artifact registry** (Docker Hub/ECR for images, Nexus/Artifactory for packages) and **versioned/tagged** for traceability and rollback.\
- Distinct from the **build cache** (temporary data to speed builds); an artifact is the final result you keep.\
\
Rule: do not rebuild per environment — promote the same artifact.

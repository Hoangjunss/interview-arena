---
id: imagepullpolicy-va-registry-strategy-can-hieu-gi
position: backend
technology: operations-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`imagePullPolicy` và registry strategy cần hiểu gì?

## Question (EN)
What should you understand about `imagePullPolicy` and registry strategy?

## Đáp án chi tiết (VI)
`imagePullPolicy` quyết định kubelet kéo image khi nào: `Always`, `IfNotPresent`, hoặc `Never`. Nếu dùng tag mutable như `latest`, behavior dễ khó đoán và rollback khó hơn.\
\
Production nên dùng immutable version tags hoặc digest, private registry có auth rõ ràng, image scanning trong CI và retention policy. Khi rollout, đổi tag/digest trong manifest để Kubernetes tạo ReplicaSet mới.

## Detailed Answer (EN)
`imagePullPolicy` controls when kubelet pulls an image: `Always`, `IfNotPresent`, or `Never`. Mutable tags such as `latest` make behavior harder to reason about and rollback harder.\
\
Production should use immutable version tags or digests, private registry auth, image scanning in CI and a retention policy. During rollout, change the tag/digest in the manifest so Kubernetes creates a new ReplicaSet.

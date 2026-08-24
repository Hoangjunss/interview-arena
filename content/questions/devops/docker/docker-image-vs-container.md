---
id: docker-image-vs-container
position: devops
technology: docker
level: junior
tags: [docker, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Docker image và Docker container là gì?

## Question (EN)
What is the difference between a Docker image and a Docker container?

## Đáp án chi tiết (VI)
Image là bản đóng gói tĩnh, chỉ đọc, chứa filesystem + config để chạy ứng dụng. Container là một instance đang chạy của image đó, có thêm một writable layer.

## Detailed Answer (EN)
An image is a static, read-only package containing the filesystem and config needed to run an app. A container is a running instance of that image, with an added writable layer.

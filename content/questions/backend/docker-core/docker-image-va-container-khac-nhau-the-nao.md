---
id: docker-image-va-container-khac-nhau-the-nao
position: backend
technology: docker-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker image và container khác nhau thế nào?

## Question (EN)
How are a Docker image and a container different?

## Đáp án chi tiết (VI)
Image là template bất biến gồm filesystem layers, metadata và command mặc định. Container là runtime instance được tạo từ image, có process, network namespace và writable layer riêng.\
\
Một image có thể chạy thành nhiều container. Khi container bị xóa, thay đổi trong writable layer mất nếu không dùng volume hoặc lưu dữ liệu ra hệ thống bền vững.

## Detailed Answer (EN)
An image is an immutable template made of filesystem layers, metadata and default commands. A container is a runtime instance created from an image, with processes, network namespace and its own writable layer.\
\
One image can run many containers. When a container is removed, changes in the writable layer are lost unless data is stored in a volume or another durable system.

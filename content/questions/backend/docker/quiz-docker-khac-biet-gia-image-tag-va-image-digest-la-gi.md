---
id: quiz-docker-khac-biet-gia-image-tag-va-image-digest-la-gi
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa image tag và image digest là gì?

## Đáp án trắc nghiệm
- [ ] Digest là số thứ tự tăng dần Docker gán cho mỗi lần push image
- [ ] Tag và digest đều bất biến, chỉ khác nhau ở định dạng hiển thị
- [ ] latest là một digest đặc biệt luôn trỏ tới bản ổn định mới nhất đã được kiểm thử
- [x] Tag là nhãn có thể trỏ lại image khác; digest là hash nội dung, bất biến

## Giải thích (VI)
Tag là tên tham chiếu dễ đọc như app:1.2.0 hay app:latest, và có thể bị push đè để trỏ sang image khác. Digest là tham chiếu theo hash nội dung (sha256:...), bất biến — cùng một digest luôn là đúng một image. Production nên tránh phụ thuộc latest, dùng version tag rõ ràng và pin digest khi cần tính tái lập cao.

### Giải thích các phương án:
- **Digest là số thứ tự tăng dần Docker gán cho mỗi lần push image** (Sai): Sai — digest là hash mật mã của nội dung image (ví dụ sha256:...), không phải số thứ tự tăng dần.
- **Tag và digest đều bất biến, chỉ khác nhau ở định dạng hiển thị** (Sai): Sai — tag có thể bị push đè để trỏ sang image khác; chỉ digest mới bất biến theo nội dung.
- **latest là một digest đặc biệt luôn trỏ tới bản ổn định mới nhất đã được kiểm thử** (Sai): Hiểu nhầm phổ biến: latest chỉ là một tag thông thường theo quy ước, không đảm bảo mới nhất hay đã kiểm thử, và không phải digest.
- **Tag là nhãn có thể trỏ lại image khác; digest là hash nội dung, bất biến** (Đúng): Đúng: tag (app:1.2.0) là nhãn dễ đọc nhưng di chuyển được; digest là địa chỉ theo nội dung nên cùng một digest luôn là cùng một image.

---
id: quiz-docker-docker-image-va-container-khac-nhau-o-diem-cot-loi-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker image và container khác nhau ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] Mỗi image chỉ tạo được đúng một container; muốn chạy nhiều bản phải build lại image nhiều lần
- [x] Image là template bất biến gồm các layer chỉ đọc; container là instance đang chạy có thêm writable layer
- [ ] Image và container là hai tên gọi của cùng một thứ, chỉ khác ở chỗ image nằm trên registry còn container nằm trên máy local
- [ ] Container là bản snapshot đóng băng của image dùng để backup, không chạy được process nào

## Giải thích (VI)
Image là template bất biến gồm các layer chỉ đọc. Container là instance đang chạy tạo từ image, có thêm một writable layer và namespace/process riêng. Một image chạy được thành nhiều container. Thay đổi trong writable layer mất khi container bị xóa nếu không dùng volume.

### Giải thích các phương án:
- **Mỗi image chỉ tạo được đúng một container; muốn chạy nhiều bản phải build lại image nhiều lần** (Sai): Một image có thể tạo ra bao nhiêu container tùy ý — mỗi container có writable layer riêng, không cần build lại.
- **Image là template bất biến gồm các layer chỉ đọc; container là instance đang chạy có thêm writable layer** (Đúng): Đúng định nghĩa: image là bản đóng gói tĩnh gồm các layer filesystem chỉ đọc, container là một lần chạy của image cộng thêm writable layer và process/namespace riêng.
- **Image và container là hai tên gọi của cùng một thứ, chỉ khác ở chỗ image nằm trên registry còn container nằm trên máy local** (Sai): Đây là hiểu nhầm phổ biến — image và container là hai khái niệm khác nhau về bản chất, không phải cùng một vật ở hai nơi.
- **Container là bản snapshot đóng băng của image dùng để backup, không chạy được process nào** (Sai): Ngược lại: container chính là thứ đang chạy process; snapshot bất biến để lưu trữ mới là image.

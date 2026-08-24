---
id: quiz-docker-phat-bieu-nao-dung-ve-luu-tr-va-persist-d-lieu-cua-container
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào đúng về lưu trữ và persist dữ liệu của container?

## Đáp án trắc nghiệm
- [ ] Dữ liệu ghi vào writable layer vẫn còn sau khi container bị xoá
- [ ] docker commit một container đang chạy sẽ lưu cả dữ liệu trong volume vào image mới
- [ ] Instruction VOLUME trong Dockerfile lưu dữ liệu vào bên trong image để phân phối kèm image
- [ ] Một volume chỉ gắn được cho đúng một container tại một thời điểm
- [x] Volume tồn tại độc lập với vòng đời container: xóa container không tự động xóa volume

## Giải thích (VI)
Dữ liệu ghi vào writable layer mất khi container bị xóa nếu không dùng volume/bind mount. Volume tồn tại độc lập với container (xóa container không xóa volume) và nhiều container gắn chung được. Hai hiểu nhầm cần tránh: instruction VOLUME không đưa dữ liệu vào image, và docker commit không lưu nội dung volume vào image mới.

### Giải thích các phương án:
- **Dữ liệu ghi vào writable layer vẫn còn sau khi container bị xoá** (Sai): Ngược lại: writable layer gắn với vòng đời container — xoá container là mất phần dữ liệu chỉ nằm ở đó.
- **docker commit một container đang chạy sẽ lưu cả dữ liệu trong volume vào image mới** (Sai): Sai — docker commit chụp lại filesystem layer nhưng loại trừ nội dung của volume; dữ liệu volume không vào image.
- **Instruction VOLUME trong Dockerfile lưu dữ liệu vào bên trong image để phân phối kèm image** (Sai): Sai — VOLUME chỉ đánh dấu đường dẫn cần gắn volume lúc chạy; dữ liệu không được đóng gói vào image.
- **Một volume chỉ gắn được cho đúng một container tại một thời điểm** (Sai): Nhiều container mount được cùng một volume để chia sẻ dữ liệu, dù cần cẩn trọng về ghi đồng thời.
- **Volume tồn tại độc lập với vòng đời container: xóa container không tự động xóa volume** (Đúng): Đúng — đó chính là lý do volume phù hợp cho dữ liệu bền vững; volume phải được xoá riêng khi không cần nữa.

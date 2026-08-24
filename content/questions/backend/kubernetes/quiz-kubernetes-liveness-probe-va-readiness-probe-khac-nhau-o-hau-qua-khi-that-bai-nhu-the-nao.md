---
id: quiz-kubernetes-liveness-probe-va-readiness-probe-khac-nhau-o-hau-qua-khi-that-bai-nhu-the-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Liveness probe và readiness probe khác nhau ở hậu quả khi thất bại như thế nào?

## Đáp án trắc nghiệm
- [x] Liveness thất bại → khởi động lại container; readiness thất bại → gỡ khỏi Service
- [ ] Cả hai đều khởi động lại container, chỉ khác tần suất kiểm tra
- [ ] Readiness thất bại thì Pod bị xóa và tạo lại
- [ ] Liveness chỉ chạy một lần lúc khởi động, readiness chạy liên tục

## Giải thích (VI)
Liveness trả lời "tiến trình còn sống không" — hỏng thì restart container. Readiness trả lời "có sẵn sàng nhận request chưa" — hỏng thì rút khỏi Service nhưng container vẫn chạy. Nhầm hai cái này gây restart loop không cần thiết.

### Giải thích các phương án:
- **Liveness thất bại → khởi động lại container; readiness thất bại → gỡ khỏi Service** (Đúng): Hai probe kích hoạt hai hành động hoàn toàn khác nhau. Pod trượt readiness vẫn chạy, chỉ ngừng nhận traffic cho tới khi probe xanh trở lại.
- **Cả hai đều khởi động lại container, chỉ khác tần suất kiểm tra** (Sai): Readiness không bao giờ khởi động lại container.
- **Readiness thất bại thì Pod bị xóa và tạo lại** (Sai): Pod vẫn tồn tại, chỉ không nhận traffic.
- **Liveness chỉ chạy một lần lúc khởi động, readiness chạy liên tục** (Sai): Cả hai đều chạy lặp lại; probe chạy lúc khởi động là startup probe.

---
id: quiz-docker-dockerfile-co-expose-3000-nhung-chay-docker-run-myapp-khong-kem-p-tu-may-host-co
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile có EXPOSE 3000 nhưng chạy docker run myapp không kèm -p. Từ máy host có mở được localhost:3000 không?

## Đáp án trắc nghiệm
- [ ] Không, và cũng không có cách nào truy cập vì EXPOSE đã chặn port khỏi bên ngoài
- [x] Không — EXPOSE chỉ là metadata mang tính tài liệu, không tự publish port
- [ ] Được, nhưng chỉ khi container chạy trên bridge network mặc định
- [ ] Được — EXPOSE tự động publish port ra host với đúng số hiệu đó

## Giải thích (VI)
Không. EXPOSE chỉ ghi lại "container này phục vụ ở port nào" như tài liệu cho người đọc và cho docker run -P. Nó không tạo ánh xạ port ra host. Muốn truy cập từ host phải publish rõ ràng bằng -p 3000:3000.

### Giải thích các phương án:
- **Không, và cũng không có cách nào truy cập vì EXPOSE đã chặn port khỏi bên ngoài** (Sai): EXPOSE không chặn gì cả — chỉ cần -p là truy cập được.
- **Không — EXPOSE chỉ là metadata mang tính tài liệu, không tự publish port** (Đúng): EXPOSE mang tính tài liệu; việc publish là của cờ -p 3000:3000 (hoặc -P để publish mọi port đã EXPOSE vào port ngẫu nhiên).
- **Được, nhưng chỉ khi container chạy trên bridge network mặc định** (Sai): Bridge mặc định cũng không tự publish port ra host.
- **Được — EXPOSE tự động publish port ra host với đúng số hiệu đó** (Sai): Đây là hiểu nhầm phổ biến nhất về EXPOSE.

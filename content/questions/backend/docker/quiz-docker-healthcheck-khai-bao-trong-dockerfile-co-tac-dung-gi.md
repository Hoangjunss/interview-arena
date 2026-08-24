---
id: quiz-docker-healthcheck-khai-bao-trong-dockerfile-co-tac-dung-gi
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HEALTHCHECK khai báo trong Dockerfile có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] HEALTHCHECK thay thế hoàn toàn liveness/readiness probe khi deploy lên Kubernetes
- [ ] HEALTHCHECK chỉ chạy đúng một lần lúc khởi động để xác nhận ứng dụng đã sẵn sàng
- [ ] Docker tự động restart container ngay khi health check thất bại lần đầu
- [x] Docker chạy lệnh kiểm tra định kỳ và gắn trạng thái healthy/unhealthy

## Giải thích (VI)
HEALTHCHECK cho Docker biết cách tự kiểm tra ứng dụng bên trong container còn phục vụ được không. Kết quả là trạng thái starting/healthy/unhealthy, thấy ở docker ps và docker inspect. Compose dùng nó cho condition: service_healthy. Engine không tự restart container unhealthy.

### Giải thích các phương án:
- **HEALTHCHECK thay thế hoàn toàn liveness/readiness probe khi deploy lên Kubernetes** (Sai): Kubernetes bỏ qua HEALTHCHECK của image và dùng probe khai báo trong pod spec.
- **HEALTHCHECK chỉ chạy đúng một lần lúc khởi động để xác nhận ứng dụng đã sẵn sàng** (Sai): Nó chạy lặp lại theo --interval suốt vòng đời container.
- **Docker tự động restart container ngay khi health check thất bại lần đầu** (Sai): Engine chỉ đánh dấu unhealthy sau đủ số lần retry; nó không tự restart container đơn lẻ.
- **Docker chạy lệnh kiểm tra định kỳ và gắn trạng thái healthy/unhealthy** (Đúng): HEALTHCHECK báo cáo trạng thái (hiện ở docker ps, dùng được cho depends_on: condition: service_healthy), nhưng Docker Engine không tự restart container chỉ vì nó unhealthy — hành động là việc của lớp điều phối bên trên.

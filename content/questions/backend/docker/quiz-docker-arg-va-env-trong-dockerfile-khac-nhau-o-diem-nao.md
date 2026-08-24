---
id: quiz-docker-arg-va-env-trong-dockerfile-khac-nhau-o-diem-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ARG và ENV trong Dockerfile khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [x] ARG chỉ tồn tại lúc build; ENV được ghi vào image nên runtime đọc được
- [ ] ARG và ENV giống hệt nhau, ARG chỉ là tên cũ đã bị loại bỏ
- [ ] ENV chỉ có tác dụng lúc build, còn ARG mới là biến môi trường lúc chạy
- [ ] Cả hai đều bị xóa khỏi image sau khi build nên không dùng để cấu hình runtime được

## Giải thích (VI)
ARG là biến build-time: truyền bằng --build-arg, không tồn tại trong container đang chạy. ENV được ghi vào image, tiến trình đọc được lúc runtime và ghi đè được bằng docker run -e. Cả hai đều KHÔNG dùng để chứa secret vì đều lộ qua docker history / docker inspect.

### Giải thích các phương án:
- **ARG chỉ tồn tại lúc build; ENV được ghi vào image nên runtime đọc được** (Đúng): Đúng phạm vi của hai lệnh: ARG truyền vào bằng --build-arg và biến mất sau build; ENV nằm trong image và có thể ghi đè bằng docker run -e.
- **ARG và ENV giống hệt nhau, ARG chỉ là tên cũ đã bị loại bỏ** (Sai): Cả hai đều còn dùng và có ngữ nghĩa khác nhau rõ ràng.
- **ENV chỉ có tác dụng lúc build, còn ARG mới là biến môi trường lúc chạy** (Sai): Ngược lại hoàn toàn — ENV mới là biến tồn tại khi container chạy.
- **Cả hai đều bị xóa khỏi image sau khi build nên không dùng để cấu hình runtime được** (Sai): ENV được lưu vào metadata của image và vẫn còn khi chạy container.

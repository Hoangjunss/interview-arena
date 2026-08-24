---
id: quiz-kubernetes-deployment-lam-gi-ma-tao-pod-truc-tiep-khong-lam-duoc
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deployment làm gì mà tạo Pod trực tiếp không làm được?

## Đáp án trắc nghiệm
- [ ] Nó cho phép Pod ghi dữ liệu bền vững ra đĩa
- [ ] Nó cấp cho Pod một địa chỉ IP cố định không đổi
- [x] Nó duy trì số bản sao mong muốn
- [ ] Nó tăng giới hạn CPU và bộ nhớ cho Pod

## Giải thích (VI)
Deployment giữ cho luôn có đủ số Pod mong muốn và tự tạo lại khi Pod chết. Nó cũng lo việc nâng cấp: đổi image thì Pod mới lên dần, Pod cũ rút dần, và rollback được nếu bản mới hỏng. Pod trần chết là hết.

### Giải thích các phương án:
- **Nó cho phép Pod ghi dữ liệu bền vững ra đĩa** (Sai): Lưu trữ bền vững do PersistentVolume đảm nhiệm.
- **Nó cấp cho Pod một địa chỉ IP cố định không đổi** (Sai): Địa chỉ ổn định là việc của Service.
- **Nó duy trì số bản sao mong muốn** (Đúng): Deployment là controller đối chiếu trạng thái thực với trạng thái mong muốn. Pod chết thì bộ điều khiển tự tạo lại mà không cần ai can thiệp.
- **Nó tăng giới hạn CPU và bộ nhớ cho Pod** (Sai): Giới hạn tài nguyên khai báo trong resources của container.

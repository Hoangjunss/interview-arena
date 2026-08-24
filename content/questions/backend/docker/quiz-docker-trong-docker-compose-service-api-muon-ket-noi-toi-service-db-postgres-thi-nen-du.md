---
id: quiz-docker-trong-docker-compose-service-api-muon-ket-noi-toi-service-db-postgres-thi-nen-du
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Docker Compose, service api muốn kết nối tới service db (Postgres) thì nên dùng địa chỉ nào?

## Đáp án trắc nghiệm
- [ ] Phải publish port của db ra host rồi api gọi vào IP của host thì mới kết nối được
- [x] Gọi qua tên service, host db port 5432 — cùng network thì phân giải bằng DNS nội bộ
- [ ] Gọi qua localhost:5432 vì các service chạy trên cùng một máy host
- [ ] Gọi qua 127.0.0.1 trong container api vì Compose gộp mọi service vào chung một network namespace

## Giải thích (VI)
Dùng tên service làm hostname: host là db, port 5432. Docker Compose tạo một network mặc định và cấp DNS nội bộ, nên các service cùng network phân giải nhau bằng service name. Không dùng localhost — mỗi service có network namespace riêng nên localhost trỏ về chính container đó. Không cần publish port của db để api gọi nội bộ.

### Giải thích các phương án:
- **Phải publish port của db ra host rồi api gọi vào IP của host thì mới kết nối được** (Sai): Không cần publish để giao tiếp nội bộ — publish chỉ cần khi truy cập từ ngoài network; nội bộ dùng service name là đủ.
- **Gọi qua tên service, host db port 5432 — cùng network thì phân giải bằng DNS nội bộ** (Đúng): Đúng: Compose tạo network mặc định và cấp DNS nội bộ, nên service name chính là hostname để các service gọi nhau.
- **Gọi qua localhost:5432 vì các service chạy trên cùng một máy host** (Sai): Hiểu nhầm phổ biến: mỗi service có network namespace riêng nên localhost trỏ về chính container api, không phải db.
- **Gọi qua 127.0.0.1 trong container api vì Compose gộp mọi service vào chung một network namespace** (Sai): Sai — Compose đặt các service vào chung một network nhưng mỗi service vẫn giữ network namespace riêng, không chia sẻ loopback.

---
id: quiz-docker-voi-lenh-duoi-day-client-tren-may-host-truy-cap-api-qua-port-nao-va-anh-xa-dien
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với lệnh dưới đây, client trên máy host truy cập API qua port nào, và ánh xạ diễn ra thế nào?

## Đáp án trắc nghiệm
- [ ] Host truy cập qua port 8000; số đầu là container port còn số sau là host port
- [ ] Không cần publish, container vẫn tự động mở port 8000 ra host vì chạy trên cùng một máy
- [ ] Cả 8080 và 8000 đều được mở trên host và cùng trỏ vào process trong container
- [x] Qua port 8080; -p theo định dạng host:container

## Giải thích (VI)
Host truy cập qua port 8080. Cú pháp -p là host:container, nên -p 8080:8000 nghĩa là host port 8080 chuyển tiếp tới container port 8000. Container có network namespace riêng: port process nghe bên trong (8000) không tự lộ ra host nếu không publish. Muốn host gọi được, phải publish port đó.

### Giải thích các phương án:
- **Host truy cập qua port 8000; số đầu là container port còn số sau là host port** (Sai): Đảo thứ tự: định dạng là host:container, số đầu (8080) mới là port trên host.
- **Không cần publish, container vẫn tự động mở port 8000 ra host vì chạy trên cùng một máy** (Sai): Hiểu nhầm về network namespace: container có namespace mạng riêng nên port bên trong không tự lộ ra host nếu không publish.
- **Cả 8080 và 8000 đều được mở trên host và cùng trỏ vào process trong container** (Sai): Chỉ 8080 được publish ra host; 8000 là port bên trong network namespace của container, không tự mở trên host.
- **Qua port 8080; -p theo định dạng host:container** (Đúng): Đúng: -p 8080:8000 mở 8080 trên host và chuyển tiếp tới port 8000 bên trong container.

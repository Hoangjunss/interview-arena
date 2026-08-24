---
id: quiz-linux-os-service-systemd-tu-chet-roi-khong-khoi-dong-lai-can-khai-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service systemd tự chết rồi không khởi động lại. Cần khai gì?

## Đáp án trắc nghiệm
- [ ] Type=simple để systemd theo dõi đúng tiến trình chính
- [x] Restart=always cùng RestartSec trong [Service]
- [ ] WantedBy=multi-user.target trong phần Install
- [ ] After=network.target để chờ mạng sẵn sàng

## Giải thích (VI)
Restart=always (hoặc on-failure) trong [Service], kèm RestartSec=5 để chờ giữa các lần thử. Mặc định là Restart=no — systemd chạy service một lần rồi để nó chết là chết luôn.

### Giải thích các phương án:
- **Type=simple để systemd theo dõi đúng tiến trình chính** (Sai): simple là mặc định và không bật cơ chế restart.
- **Restart=always cùng RestartSec trong [Service]** (Đúng): Mặc định là Restart=no nên systemd không tự khởi động lại.
- **WantedBy=multi-user.target trong phần Install** (Sai): Cái đó quyết định service có tự chạy khi boot, không phải restart khi chết.
- **After=network.target để chờ mạng sẵn sàng** (Sai): Quyết định thứ tự khởi động, không liên quan tới việc restart.

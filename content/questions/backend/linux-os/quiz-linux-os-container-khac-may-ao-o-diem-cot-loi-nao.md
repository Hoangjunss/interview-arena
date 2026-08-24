---
id: quiz-linux-os-container-khac-may-ao-o-diem-cot-loi-nao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container khác máy ảo ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] Container không dùng được với hệ điều hành Windows của Microsoft
- [x] Container dùng chung kernel host, VM có kernel riêng
- [ ] Container nhanh hơn vì được biên dịch sẵn cho từng máy
- [ ] VM cách ly tốt hơn vì có tường lửa riêng bên trong

## Giải thích (VI)
Container dùng chung kernel của host (cách ly bằng namespace và cgroup), còn VM chạy kernel riêng trên hypervisor. Vì thế container khởi động trong vài trăm ms và tốn ít RAM, nhưng cách ly yếu hơn VM.

### Giải thích các phương án:
- **Container không dùng được với hệ điều hành Windows của Microsoft** (Sai): Windows có container riêng, và Linux container chạy qua lớp ảo hoá.
- **Container dùng chung kernel host, VM có kernel riêng** (Đúng): Nhờ đó container khởi động trong tích tắc và tốn ít tài nguyên hơn.
- **Container nhanh hơn vì được biên dịch sẵn cho từng máy** (Sai): Không có bước biên dịch riêng nào cho từng máy.
- **VM cách ly tốt hơn vì có tường lửa riêng bên trong** (Sai): Cách ly của VM đến từ hypervisor, không phải tường lửa.

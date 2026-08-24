---
id: quiz-docker-container-khac-virtual-machine-o-diem-cot-loi-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container khác Virtual Machine ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [ ] Container là một VM được tối ưu, mỗi container vẫn boot một kernel riêng nhưng nhẹ hơn
- [ ] Container cô lập mạnh hơn VM vì mỗi container có một hypervisor riêng
- [ ] VM và container giống nhau về kích thước và tốc độ khởi động, chỉ khác định dạng file image
- [x] Container chia sẻ kernel host; VM ảo hoá phần cứng và chạy guest OS riêng

## Giải thích (VI)
VM ảo hóa phần cứng: mỗi VM chạy một guest OS đầy đủ với kernel riêng trên hypervisor. Container ảo hóa ở tầng OS: nhiều container chia sẻ chung kernel host, mỗi cái chỉ đóng gói app cùng userspace riêng. Hệ quả: container nhẹ (MB) và start mili-giây, mật độ cao hơn; VM nặng hơn nhưng cô lập mạnh hơn nhờ ranh giới kernel riêng.

### Giải thích các phương án:
- **Container là một VM được tối ưu, mỗi container vẫn boot một kernel riêng nhưng nhẹ hơn** (Sai): Hiểu nhầm phổ biến: container không boot kernel riêng — chúng dùng chung kernel host, đó là lý do khởi động tính bằng mili-giây.
- **Container cô lập mạnh hơn VM vì mỗi container có một hypervisor riêng** (Sai): Ngược lại: VM cô lập mạnh hơn nhờ ranh giới kernel riêng; container nhẹ hơn nhưng ranh giới yếu hơn vì chung kernel, và container không có hypervisor.
- **VM và container giống nhau về kích thước và tốc độ khởi động, chỉ khác định dạng file image** (Sai): Khác rõ rệt: image container tính bằng MB và start mili-giây; VM tính bằng GB và boot giây tới phút.
- **Container chia sẻ kernel host; VM ảo hoá phần cứng và chạy guest OS riêng** (Đúng): Đúng: điểm phân biệt là tầng ảo hoá — container ở tầng OS (chung kernel, chỉ đóng gói app cùng userspace), VM ở tầng phần cứng (kernel riêng trên hypervisor).

---
id: resource-requests-va-limits-trong-kubernetes-khac-nhau-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Resource requests và limits trong Kubernetes khác nhau thế nào?

## Question (EN)
What is the difference between resource requests and limits in Kubernetes?

## Đáp án chi tiết (VI)
Cả hai khai báo tài nguyên (CPU/memory) cho container nhưng có vai trò khác nhau:\
\
- **requests**: lượng tài nguyên **tối thiểu được đảm bảo**. **Scheduler** dùng con số này để chọn node đủ chỗ đặt pod. Đây cũng là cơ sở HPA tính % sử dụng.\
- **limits**: **trần tối đa** container được phép dùng. Vượt limit **CPU** → bị **throttle** (giảm tốc); vượt limit **memory** → container bị **OOMKilled** (kill vì hết bộ nhớ).\
\
Kết hợp requests/limits quyết định **QoS class** của pod:\
- **Guaranteed** (requests = limits cho mọi container),\
- **Burstable** (có requests \u003c limits),\
- **BestEffort** (không đặt gì) — bị evict trước khi node thiếu tài nguyên.\
\
Đặt requests quá thấp → node bị xếp quá nhiều pod và quá tải; quá cao → lãng phí. Đây là cân chỉnh quan trọng cho ổn định và chi phí.

## Detailed Answer (EN)
Both declare resources (CPU/memory) for a container but play different roles:\
\
- **requests**: the **guaranteed minimum**. The **scheduler** uses this to place the pod on a node with enough room. It is also the basis for HPA utilization %.\
- **limits**: the **hard ceiling** a container may use. Exceeding the **CPU** limit → the container is **throttled**; exceeding the **memory** limit → the container is **OOMKilled**.\
\
Together, requests/limits determine the pod's **QoS class**:\
- **Guaranteed** (requests = limits for every container),\
- **Burstable** (requests \u003c limits),\
- **BestEffort** (nothing set) — evicted first when a node runs low.\
\
Setting requests too low overpacks the node; too high wastes capacity. It is a key tuning knob for stability and cost.

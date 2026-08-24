---
id: taint-va-toleration-hoat-dong-nhu-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Taint và toleration hoạt động như thế nào?

## Question (EN)
How do taints and tolerations work?

## Đáp án chi tiết (VI)
**Taint** đặt trên node để *đẩy* Pod ra: theo mặc định Pod sẽ không được schedule lên node đó. **Toleration** đặt trên Pod để nói rằng nó *chấp nhận* một taint cụ thể, nhờ đó vẫn có thể lên node bị taint.\
\
Taint có dạng `key=value:effect` với ba effect:\
- **NoSchedule** — không schedule Pod mới không có toleration.\
- **PreferNoSchedule** — cố tránh, nhưng vẫn xếp lên nếu không còn chỗ khác.\
- **NoExecute** — vừa chặn Pod mới, vừa *đuổi* Pod đang chạy nếu chúng không tolerate.\
\
```bash\
kubectl taint nodes node1 gpu=true:NoSchedule\
```\
```yaml\
tolerations:\
  - key: \\"gpu\\"\
    operator: \\"Equal\\"\
    value: \\"true\\"\
    effect: \\"NoSchedule\\"\
```\
Điểm dễ nhầm: taint/toleration là cơ chế **loại trừ** (giữ Pod thường tránh xa node đặc biệt, ví dụ node GPU hoặc control plane). Nó chỉ cho phép Pod lên node, *không* hút Pod về node — muốn hút cần node affinity.

## Detailed Answer (EN)
A **taint** is placed on a node to *repel* Pods: by default Pods will not be scheduled onto that node. A **toleration** is placed on a Pod to say it *accepts* a specific taint, letting it land on the tainted node.\
\
A taint has the form `key=value:effect` with three effects:\
- **NoSchedule** — do not schedule new Pods that lack a matching toleration.\
- **PreferNoSchedule** — try to avoid, but still place a Pod if there is nowhere else.\
- **NoExecute** — block new Pods and also *evict* running Pods that do not tolerate it.\
\
```bash\
kubectl taint nodes node1 gpu=true:NoSchedule\
```\
```yaml\
tolerations:\
  - key: \\"gpu\\"\
    operator: \\"Equal\\"\
    value: \\"true\\"\
    effect: \\"NoSchedule\\"\
```\
Common confusion: taints/tolerations are an **exclusion** mechanism (keeping ordinary Pods away from special nodes, e.g. GPU nodes or control-plane nodes). They only *allow* a Pod onto a node; they do not attract Pods to it — for that you need node affinity.

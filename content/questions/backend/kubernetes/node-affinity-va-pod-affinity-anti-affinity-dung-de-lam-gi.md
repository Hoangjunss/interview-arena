---
id: node-affinity-va-pod-affinity-anti-affinity-dung-de-lam-gi
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node affinity và pod affinity/anti-affinity dùng để làm gì?

## Question (EN)
What are node affinity and pod affinity/anti-affinity for?

## Đáp án chi tiết (VI)
Đây là các luật *hút* Pod về đúng chỗ, bổ sung cho taint (vốn để đẩy ra).\
\
- **Node affinity** — chọn node theo *label của node*. Thay cho `nodeSelector` cứng, nó hỗ trợ điều kiện mềm/cứng. Ví dụ: chỉ chạy trên node `disktype=ssd`, hoặc *ưu tiên* vùng `zone=a`.\
- **Pod affinity** — đặt Pod *gần* Pod khác theo label. Ví dụ: xếp web Pod cùng node/zone với cache để giảm độ trễ.\
- **Pod anti-affinity** — đặt Pod *tránh xa* Pod khác. Ví dụ: trải các replica của cùng một app ra nhiều node/zone để một node chết không hạ cả service.\
\
Mỗi luật có hai mức:\
- **requiredDuringSchedulingIgnoredDuringExecution** — bắt buộc, không thỏa thì không schedule.\
- **preferredDuringSchedulingIgnoredDuringExecution** — ưu tiên, có trọng số, không thỏa vẫn xếp.\
\
`topologyKey` (ví dụ `kubernetes.io/hostname`, `topology.kubernetes.io/zone`) xác định phạm vi \\"gần/xa\\" là theo node hay theo zone. Anti-affinity theo `hostname` là cách phổ biến để đảm bảo high availability.

## Detailed Answer (EN)
$86

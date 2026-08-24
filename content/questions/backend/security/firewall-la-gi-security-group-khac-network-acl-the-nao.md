---
id: firewall-la-gi-security-group-khac-network-acl-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Firewall là gì? Security group khác Network ACL thế nào?

## Question (EN)
What is a firewall, and how do security groups differ from Network ACLs?

## Đáp án chi tiết (VI)
Firewall **kiểm soát traffic mạng** theo tập luật (cho phép/chặn dựa trên IP, port, protocol, hướng) — ranh giới giữa vùng tin cậy và không tin cậy.\
\
Trên AWS có hai lớp firewall ảo, hay bị hỏi so sánh:\
- **Security Group** (mức **instance**): **stateful** — nếu cho một kết nối vào thì chiều trả về tự động được phép. Chỉ có luật **allow** (không có deny tường minh). Đánh giá **tất cả luật** cùng lúc.\
- **Network ACL** (mức **subnet**): **stateless** — phải mở luật cho **cả hai chiều** vào và ra. Có cả **allow lẫn deny**, xét luật **theo số thứ tự** cho tới khi khớp.\
\
Mẹo nhớ: **SG stateful, quanh instance**; **NACL stateless, quanh subnet**. Thực tế dùng SG là chính, NACL cho lớp chặn thô ở biên subnet. Nguyên tắc: **default deny**, chỉ mở port cần thiết.

## Detailed Answer (EN)
A firewall **controls network traffic** by a rule set (allow/deny based on IP, port, protocol, direction) — a boundary between trusted and untrusted zones.\
\
On AWS there are two virtual-firewall layers, often compared:\
- **Security Group** (**instance** level): **stateful** — if inbound traffic is allowed, the return traffic is automatically allowed. It has only **allow** rules (no explicit deny) and evaluates **all rules** together.\
- **Network ACL** (**subnet** level): **stateless** — you must open rules for **both directions**, inbound and outbound. It has both **allow and deny**, evaluated **by rule number** until a match.\
\
Mnemonic: **SG stateful, around the instance**; **NACL stateless, around the subnet**. In practice SGs are the main tool, with NACLs for coarse subnet-edge blocking. Principle: **default deny**, open only the necessary ports.

---
id: 12-factor-app-la-gi-neu-vai-nguyen-tac-quan-trong
position: backend
technology: practices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
12-factor app là gì? Nêu vài nguyên tắc quan trọng.

## Question (EN)
What is the 12-factor app and some of its key principles?

## Đáp án chi tiết (VI)
12-factor là bộ **12 nguyên tắc thiết kế ứng dụng SaaS** để dễ **triển khai, scale ngang và portable** giữa các môi trường (nhất là trên cloud/container).\
\
Vài nguyên tắc hay được hỏi:\
- **Codebase**: một codebase trong version control, deploy nhiều môi trường.\
- **Dependencies**: khai báo tường minh, cô lập (không dựa vào package cài sẵn trên máy).\
- **Config**: cấu hình **để ở biến môi trường**, tách khỏi code (không hardcode secret).\
- **Backing services**: coi DB, cache, queue là **resource gắn kèm**, thay được qua config.\
- **Processes**: chạy **stateless** — không giữ state trong bộ nhớ process; state để ở backing service.\
- **Port binding**: app tự expose qua một port.\
- **Disposability**: khởi động nhanh, tắt lịch sự (graceful shutdown).\
- **Dev/prod parity**: giữ các môi trường giống nhau nhất có thể.\
\
Cốt lõi: **stateless + config qua env + tách backing service** → dễ scale và tự động hóa.

## Detailed Answer (EN)
The 12-factor app is a set of **12 design principles for SaaS apps** to make them easy to **deploy, scale horizontally and stay portable** across environments (especially on cloud/containers).\
\
Often-asked principles:\
- **Codebase**: one codebase in version control, many deploys.\
- **Dependencies**: explicitly declared and isolated (no reliance on system-wide packages).\
- **Config**: keep configuration **in environment variables**, separate from code (no hardcoded secrets).\
- **Backing services**: treat DB, cache, queue as **attached resources**, swappable via config.\
- **Processes**: run **stateless** — hold no state in process memory; state lives in a backing service.\
- **Port binding**: the app self-exposes via a port.\
- **Disposability**: fast startup, graceful shutdown.\
- **Dev/prod parity**: keep environments as similar as possible.\
\
Core idea: **stateless + config via env + detached backing services** → easy to scale and automate.

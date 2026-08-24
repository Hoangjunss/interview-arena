---
id: ung-dung-stateless-va-stateful-khac-nhau-the-nao-vi-sao-nen-thiet-ke-stateless
position: backend
technology: practices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng stateless và stateful khác nhau thế nào? Vì sao nên thiết kế stateless?

## Question (EN)
What is the difference between stateless and stateful applications, and why prefer stateless?

## Đáp án chi tiết (VI)
- **Stateless**: mỗi request **tự chứa đủ thông tin** để xử lý; app **không giữ state trong bộ nhớ tiến trình** giữa các request. Cần dữ liệu thì đọc từ **backing service** (DB, Redis, object storage). Vì mọi bản (instance) như nhau nên **dễ scale ngang, thay thế và load balance tùy ý**.\
- **Stateful**: **giữ state cục bộ** (session lưu trong RAM, dữ liệu trên đĩa local). Request thường phải quay về **đúng instance** đã giữ state (sticky session) → khó scale, khó thay thế, mất instance là mất state.\
\
Vì sao ưu tiên stateless (theo 12-factor): **scale, self-healing và deploy** trở nên đơn giản khi mọi instance có thể lên/xuống bất kỳ lúc nào. Cách làm: **đẩy state ra ngoài**. State vốn có (database) thì cô lập vào tầng stateful chuyên biệt — trên K8s là **StatefulSet + volume**.

## Detailed Answer (EN)
- **Stateless**: each request **carries enough information** to be processed; the app **holds no state in process memory** between requests. When it needs data, it reads from a **backing service** (DB, Redis, object storage). Because all instances are identical, it is **easy to scale out, replace and load-balance freely**.\
- **Stateful**: **keeps local state** (in-memory sessions, data on local disk). Requests often must return to the **same instance** that holds the state (sticky sessions) → hard to scale, hard to replace, losing the instance loses the state.\
\
Why prefer stateless (per 12-factor): **scaling, self-healing and deploys** become simple when any instance can come and go at any time. The technique: **push state out**. Inherent state (databases) is isolated into a dedicated stateful tier — on K8s a **StatefulSet + volumes**.

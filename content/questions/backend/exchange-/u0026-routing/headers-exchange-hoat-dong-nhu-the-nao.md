---
id: headers-exchange-hoat-dong-nhu-the-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Headers exchange hoạt động như thế nào?

## Question (EN)
How does a headers exchange work?

## Đáp án chi tiết (VI)
Headers exchange bỏ qua routing_key và định tuyến dựa trên header attributes của message. Khi bind, bạn chỉ định các header matching rule như \\"department: sales\\" và \\"urgent: true\\

## Detailed Answer (EN)
A headers exchange ignores routing keys and routes based on message header attributes. When binding, you specify matching rules like \\"department: sales\\" and \\"urgent: true\\" — messages only get routed if their headers match. More flexible than routing keys for complex logic but more expensive (header matching is slower than string comparison). Rarely used in practice.

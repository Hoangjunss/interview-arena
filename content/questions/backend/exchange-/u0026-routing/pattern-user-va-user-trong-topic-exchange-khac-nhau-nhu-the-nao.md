---
id: pattern-user-va-user-trong-topic-exchange-khac-nhau-nhu-the-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pattern \\"user.*\\" và \\"user.#\\" trong topic exchange khác nhau như thế nào?

## Question (EN)
What is the difference between topic exchange pattern \\"user.*\\" and \\"user.#\\"?

## Đáp án chi tiết (VI)
\\"user.*\\" khớp đúng một từ sau \\"user\\" — match \\"user.created\\

## Detailed Answer (EN)
\\"user.*\\" matches exactly one word after \\"user\\" — it matches \\"user.created\\" and \\"user.deleted\\" but NOT \\"user.profile.updated\\". \\"user.#\\" matches zero or more words — it matches \\"user.created\\

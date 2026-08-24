---
id: cat-he-thong-thanh-service-theo-tieu-chi-nao-bounded-context-nghia-la-gi-trong-t
position: system-design
technology: phân-rã-service
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cắt hệ thống thành service theo tiêu chí nào? \\"Bounded context\\" nghĩa là gì trong thực tế?

## Question (EN)
What criteria do you use to split a system into services? What does \\"bounded context\\" mean in practice?

## Đáp án chi tiết (VI)
Cắt theo **năng lực nghiệp vụ (business capability) / subdomain**, không cắt theo tầng kỹ thuật.\
\
**Bounded context** là phạm vi mà một mô hình dữ liệu có nghĩa **nhất quán**. Ví dụ chữ \\"Order\\":\
- Trong context **Bán hàng**: Order có giỏ hàng, khuyến mãi, tổng tiền.\
- Trong context **Kho vận**: Order chỉ là danh sách mặt hàng cần lấy và địa chỉ giao.\
\
Hai nơi cùng gọi là Order nhưng **không cùng một model**. Ranh giới giữa chúng chính là ranh giới service tự nhiên.\
\
**Dấu hiệu cắt đúng:**\
- Một yêu cầu nghiệp vụ điển hình chỉ sửa **một service**.\
- Service tự trả lời được phần lớn request bằng dữ liệu của chính nó, ít phải hỏi service khác.\
- Ranh giới trùng với ranh giới đội ngũ và ngôn ngữ của người dùng nghiệp vụ.\
\
**Cắt sai điển hình:** chia thành `user-service`, `db-service`, `validation-service` — đó là chia theo **tầng kỹ thuật**. Thêm một trường vào form sẽ phải sửa cả ba, deploy cả ba. Cắt quá nhỏ (\\"nano service\\") cũng sai: chi phí gọi mạng và vận hành lớn hơn phần logic bên trong.

## Detailed Answer (EN)
Split by **business capability / subdomain**, not by technical layer.\
\
A **bounded context** is the scope in which one data model has a **consistent** meaning. Take the word \\"Order\\":\
- In the **Sales** context an Order has a cart, promotions, and totals.\
- In the **Fulfilment** context an Order is just a pick list and a delivery address.\
\
Both are called Order but they are **not the same model**. The seam between them is a natural service boundary.\
\
**Signs the cut is right:**\
- A typical business change touches **one service**.\
- A service answers most requests from its own data, rarely asking others.\
- Boundaries line up with team boundaries and with the language business users actually speak.\
\
**Classic bad cut:** `user-service`, `db-service`, `validation-service` — that is splitting by **technical layer**. Adding one form field means changing and deploying all three. Cutting too fine (\\"nanoservices\\") is also wrong: network and operational cost exceeds the logic inside.

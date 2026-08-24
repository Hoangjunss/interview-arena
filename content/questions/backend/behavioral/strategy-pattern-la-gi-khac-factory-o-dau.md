---
id: strategy-pattern-la-gi-khac-factory-o-dau
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Strategy pattern là gì? Khác Factory ở đâu?

## Question (EN)
What is the Strategy pattern and how does it differ from Factory?

## Đáp án chi tiết (VI)
Strategy đóng gói **một họ thuật toán** có thể hoán đổi cho nhau vào các lớp riêng cùng một interface, để **chọn hành vi lúc chạy** mà không cần `if/else`/`switch` khổng lồ.\
\
Ví dụ: `PaymentStrategy` với `CreditCard`, `PayPal`, `Crypto`; hoặc `SortStrategy`, `CompressionStrategy`, `PricingStrategy`. Context giữ một tham chiếu tới strategy và ủy quyền công việc cho nó; muốn đổi cách làm chỉ cần **tráo strategy khác**.\
\
Lợi ích: tuân **Open/Closed** (thêm thuật toán mới không sửa context), loại bỏ điều kiện rẽ nhánh phức tạp, dễ test từng thuật toán.\
\
**Khác Factory**: Factory lo **tạo ra đối tượng nào**; Strategy lo **dùng hành vi/thuật toán nào** trên đối tượng đã có. Factory là creational, Strategy là behavioral — thường phối hợp: factory chọn và tạo strategy phù hợp.

## Detailed Answer (EN)
Strategy encapsulates **a family of interchangeable algorithms** into separate classes behind one interface, letting you **choose behavior at runtime** without a giant `if/else`/`switch`.\
\
Example: `PaymentStrategy` with `CreditCard`, `PayPal`, `Crypto`; or `SortStrategy`, `CompressionStrategy`, `PricingStrategy`. A context holds a reference to a strategy and delegates the work to it; to change behavior you just **swap in another strategy**.\
\
Benefits: honors **Open/Closed** (add a new algorithm without touching the context), removes complex branching, and makes each algorithm testable.\
\
**Vs Factory**: Factory decides **which object to create**; Strategy decides **which behavior/algorithm to use** on an existing object. Factory is creational, Strategy is behavioral — they often combine: a factory picks and creates the right strategy.

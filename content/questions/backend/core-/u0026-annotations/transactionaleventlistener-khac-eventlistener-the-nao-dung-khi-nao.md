---
id: transactionaleventlistener-khac-eventlistener-the-nao-dung-khi-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@TransactionalEventListener khác @EventListener thế nào? Dùng khi nào?

## Question (EN)
How does @TransactionalEventListener differ from @EventListener? When do you use it?

## Đáp án chi tiết (VI)
Cả hai lắng nghe `ApplicationEvent`, khác ở **thời điểm chạy** so với transaction.\
\
- **`@EventListener`** — chạy **ngay** khi publish, **trong cùng transaction**. Listener throw → transaction rollback toàn bộ.\
- **`@TransactionalEventListener`** — chạy **sau khi transaction commit thành công**. Transaction rollback → event bị bỏ qua.\
\
```java\
@Service\
class OrderService {\
  @Transactional\
  void placeOrder(Order order) {\
    orderRepo.save(order);\
    events.publishEvent(new OrderPlacedEvent(order.getId()));  // listener chạy SAU commit\
  }\
}\
\
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)\
void onOrderPlaced(OrderPlacedEvent e) { emailService.sendConfirmation(e.getOrderId()); }\
```\
\
**Phases:** `AFTER_COMMIT` (default), `AFTER_ROLLBACK`, `AFTER_COMPLETION`, `BEFORE_COMMIT`.\
\
**Vì sao quan trọng:** email/notification chỉ nên gửi khi data đã thực sự lưu. Dùng `@EventListener` gửi email trước commit → order rollback nhưng email đã gửi rồi.

## Detailed Answer (EN)
$82

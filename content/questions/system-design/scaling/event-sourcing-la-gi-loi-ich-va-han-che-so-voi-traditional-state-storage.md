---
id: event-sourcing-la-gi-loi-ich-va-han-che-so-voi-traditional-state-storage
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event Sourcing là gì? Lợi ích và hạn chế so với traditional state storage?

## Question (EN)
What is Event Sourcing? What are its benefits and limitations compared to traditional state storage?

## Đáp án chi tiết (VI)
Event Sourcing là pattern lưu trữ mọi thay đổi trạng thái của application dưới dạng chuỗi immutable events thay vì chỉ lưu trạng thái hiện tại – giống như transaction log của bank hơn là số dư hiện tại. \
\
**Ví dụ:** thay vì lưu `account.balance = 1000`, lưu [Deposited(500), Deposited(700), Withdrew(200)] – số dư là kết quả replay của events. \
\
**Lợi ích:** complete audit trail miễn phí, có thể rebuild state tại bất kỳ điểm nào trong lịch sử, time-travel debugging, dễ tích hợp với CQRS và projections, event stream là nguồn sự thật duy nhất. Hạn chế: querying current state cần replay (giải quyết bằng snapshots), event schema evolution phức tạp khi domain thay đổi, storage tốn hơn, learning curve cao. Phù hợp cho: banking/fintech (audit trail bắt buộc), booking systems, domain-driven design với complex business rules. EventStoreDB là database chuyên biệt cho Event Sourcing; có thể implement trên PostgreSQL, Kafka cũng được.

## Detailed Answer (EN)
$89

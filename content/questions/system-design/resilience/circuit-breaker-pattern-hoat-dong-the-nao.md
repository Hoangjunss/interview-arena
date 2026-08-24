---
id: circuit-breaker-pattern-hoat-dong-the-nao
position: system-design
technology: resilience
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit breaker pattern hoạt động thế nào?

## Question (EN)
How does the circuit breaker pattern work?

## Đáp án chi tiết (VI)
Circuit breaker ngăn **lỗi lan truyền (cascading failure)**: khi một dependency liên tục lỗi/timeout, thay vì cứ gọi và chờ, ta **\\"ngắt mạch\\"** để fail nhanh.\
\
Ba trạng thái:\
- **Closed**: request đi qua bình thường; đếm tỉ lệ lỗi.\
- **Open**: vượt ngưỡng lỗi → **chặn ngay**, trả lỗi/fallback tức thì mà không gọi dependency, cho nó thời gian hồi phục.\
- **Half-open**: sau thời gian chờ, cho **vài request thử**; nếu ổn → về Closed, nếu vẫn lỗi → quay lại Open.\
\
Lợi ích: bảo vệ tài nguyên (thread, connection), tránh sập dây chuyền, cho hệ downstream phục hồi. Thường đi kèm **timeout**, **fallback** và **bulkhead** (cô lập tài nguyên theo dependency).

## Detailed Answer (EN)
A circuit breaker prevents **cascading failures**: when a dependency keeps failing/timing out, instead of calling and waiting, you **\\"trip the circuit\\"** to fail fast.\
\
Three states:\
- **Closed**: requests pass normally; track the error rate.\
- **Open**: error threshold exceeded → **block immediately**, returning an error/fallback without calling the dependency, giving it time to recover.\
- **Half-open**: after a cooldown, let **a few trial requests** through; if healthy → back to Closed, if still failing → back to Open.\
\
Benefits: protects resources (threads, connections), avoids chain collapse, lets downstream recover. Usually paired with **timeouts**, a **fallback**, and the **bulkhead** pattern (isolating resources per dependency).

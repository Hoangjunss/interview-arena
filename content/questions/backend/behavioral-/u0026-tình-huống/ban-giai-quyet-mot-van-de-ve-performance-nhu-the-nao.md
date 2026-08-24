---
id: ban-giai-quyet-mot-van-de-ve-performance-nhu-the-nao
position: backend
technology: behavioral-\u0026-tình-huống
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn giải quyết một vấn đề về performance như thế nào?

## Question (EN)
How do you approach a performance problem?

## Đáp án chi tiết (VI)
**Nhà PV muốn nghe:** bạn đo trước khi sửa, tìm đúng bottleneck thay vì phỏng đoán.\
\
**Tránh:** \\"tôi tối ưu code\\" chung chung mà không có cách xác định nguyên nhân.\
\
**Trả lời mẫu (STAR):**\
\
- **Tình huống:** một trang load chậm bị khách phàn nàn.\
- **Hành động:** tôi profile bằng DevTools, xác định một API call là điểm nghẽn (chứ không phải render), thêm cache và gộp request.\
- **Kết quả:** trang nhanh hơn ~3 lần; tôi đặt thêm metric để theo dõi và phát hiện hồi quy sớm. Quy trình của tôi luôn là: đo → tìm nghẽn → sửa → đo lại.

## Detailed Answer (EN)
**What they're assessing:** that you measure before fixing and find the real bottleneck instead of guessing.\
\
**Avoid:** a generic \\"I optimize the code\\" with no method.\
\
**Sample answer (STAR):**\
\
- **Situation:** a page loaded slowly and customers complained.\
- **Action:** I profiled with DevTools, found a single API call was the bottleneck (not rendering), added caching and batched requests.\
- **Result:** the page got ~3x faster; I added a metric to track it and catch regressions early. My process is always: measure → find the bottleneck → fix → measure again.

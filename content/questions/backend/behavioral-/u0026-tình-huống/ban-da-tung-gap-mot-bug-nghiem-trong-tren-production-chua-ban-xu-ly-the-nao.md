---
id: ban-da-tung-gap-mot-bug-nghiem-trong-tren-production-chua-ban-xu-ly-the-nao
position: backend
technology: behavioral-\u0026-tình-huống
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn đã từng gặp một bug nghiêm trọng trên production chưa? Bạn xử lý thế nào?

## Question (EN)
Have you ever faced a critical production bug? How did you handle it?

## Đáp án chi tiết (VI)
**Nhà PV muốn nghe:** bạn giữ bình tĩnh, ưu tiên khôi phục dịch vụ trước, rồi mới tìm nguyên nhân gốc và rút bài học.\
\
**Tránh:** kể như một sự cố nghiêm trọng mà không có quy trình.\
\
**Trả lời mẫu (STAR):**\
\
- **Tình huống:** một truy vấn DB chậm khiến người dùng không load được dữ liệu trong giờ cao điểm.\
- **Hành động:** tôi giảm thiểu trước (bật cache tạm để khôi phục dịch vụ), sau đó tìm nguyên nhân là thiếu index và thêm vào.\
- **Kết quả:** khôi phục trong ~30 phút; sau đó tôi thêm cảnh báo monitor query chậm để bắt sớm lần sau. Bài học: luôn có alert cho slow query.

## Detailed Answer (EN)
**What they're assessing:** that you stay calm, restore service first, then find the root cause and learn.\
\
**Avoid:** telling it as a disaster with no process.\
\
**Sample answer (STAR):**\
\
- **Situation:** a slow DB query left users unable to load data at peak hours.\
- **Action:** I mitigated first (temporary cache to restore service), then traced it to a missing index and added it.\
- **Result:** recovered in ~30 minutes; afterward I added a slow-query monitor alert to catch it earlier. Lesson: always alert on slow queries.

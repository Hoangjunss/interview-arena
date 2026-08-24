---
id: trong-5-phut-dau-cua-buoi-thiet-ke-em-se-hoi-nhung-gi-de-lam-ro-de-bai
position: system-design
technology: requirements
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong 5 phút đầu của buổi thiết kế, em sẽ hỏi những gì để làm rõ đề bài?

## Question (EN)
In the first 5 minutes of a design round, what do you ask to clarify the problem?

## Đáp án chi tiết (VI)
Đề bài kiểu \\"thiết kế Twitter\\" cố ý mơ hồ — người phỏng vấn muốn xem bạn có tự thu hẹp phạm vi hay không. Bộ câu hỏi nên hỏi:\
\
**Về phạm vi**\
- Những tính năng nào nằm trong scope buổi này? (đăng bài, bảng tin, theo dõi — hay cả tìm kiếm, tin nhắn, quảng cáo?)\
- Có cần hỗ trợ ảnh/video không, hay chỉ text?\
- Web, mobile app, hay cả hai?\
\
**Về quy mô**\
- Bao nhiêu người dùng hoạt động hằng ngày? Tăng trưởng dự kiến?\
- Tỷ lệ đọc trên ghi khoảng bao nhiêu?\
- Dữ liệu giữ bao lâu?\
\
**Về chất lượng dịch vụ**\
- Mục tiêu độ trễ cho thao tác chính là bao nhiêu?\
- Dữ liệu trễ vài giây có chấp nhận được không, hay bắt buộc thấy ngay sau khi ghi?\
- Có yêu cầu triển khai nhiều vùng địa lý không?\
\
Cách làm đúng: nêu **giả định** thay vì chờ đáp án cho từng câu — \\"em giả định 10 triệu DAU, đọc gấp 100 lần ghi, được không ạ\\". Người phỏng vấn sẽ xác nhận hoặc chỉnh lại. Ghi các giả định đã chốt lên góc bảng để tham chiếu suốt buổi, tránh nửa buổi thiết kế lệch scope.

## Detailed Answer (EN)
A prompt like \\"design Twitter\\" is deliberately vague — the interviewer wants to see whether you narrow the scope yourself. Questions worth asking:\
\
**Scope**\
- Which features are in scope for this session? (posting, feed, following — or also search, DMs, ads?)\
- Do we support images/video, or text only?\
- Web, mobile app, or both?\
\
**Scale**\
- How many daily active users? Expected growth?\
- Roughly what read-to-write ratio?\
- How long is data retained?\
\
**Quality of service**\
- What is the latency target for the main operation?\
- Is a few seconds of staleness acceptable, or must a write be immediately visible?\
- Any multi-region requirement?\
\
The right technique is to **state assumptions** rather than wait for an answer to each question — \\"I will assume 10M DAU and a 100:1 read/write ratio, is that fine?\\". The interviewer confirms or corrects. Write the agreed assumptions in a corner of the board and refer back to them, so you do not drift out of scope halfway through.

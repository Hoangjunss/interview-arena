---
id: monitoring-logging-va-observability-khac-nhau-the-nao
position: backend
technology: observability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Monitoring, logging và observability khác nhau thế nào?

## Question (EN)
How do monitoring, logging and observability differ?

## Đáp án chi tiết (VI)
Ba khái niệm liên quan nhưng không đồng nghĩa:\
\
- **Logging**: ghi lại **sự kiện rời rạc** (dòng log có timestamp) — hữu ích để tra cứu \\"chuyện gì đã xảy ra\\" khi debug.\
- **Monitoring**: thu thập **metric** đã biết theo thời gian và **cảnh báo (alert)** khi vượt ngưỡng — trả lời câu hỏi **đã biết trước** (\\"CPU có cao không?\\

## Detailed Answer (EN)
Three related but not synonymous concepts:\
\
- **Logging**: records **discrete events** (timestamped log lines) — useful to look up \\"what happened\\" when debugging.\
- **Monitoring**: collects **known metrics** over time and **alerts** on thresholds — answers **predefined** questions (\\"is CPU high?\\

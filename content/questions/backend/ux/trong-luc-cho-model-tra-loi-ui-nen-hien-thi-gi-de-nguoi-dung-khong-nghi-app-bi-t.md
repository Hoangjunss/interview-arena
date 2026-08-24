---
id: trong-luc-cho-model-tra-loi-ui-nen-hien-thi-gi-de-nguoi-dung-khong-nghi-app-bi-t
position: backend
technology: ux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong lúc chờ model trả lời, UI nên hiển thị gì để người dùng không nghĩ app bị treo?

## Question (EN)
While waiting for the model, what should the UI show so the app does not feel frozen?

## Đáp án chi tiết (VI)
$7a

## Detailed Answer (EN)
Split the wait into **two phases** and render each differently.\
\
**Phase 1 — before the first token (TTFT).** Usually 0.5–3 seconds, longer with a big prompt or a retrieval step. Show a working indicator, and if the flow has stages, label them: \\"Searching documents\\" → \\"Writing answer\\". Stage labels make the wait feel shorter because progress is visible.\
\
**Phase 2 — streaming.** The text appearing *is* the progress indicator; drop the spinner, keep a blinking caret at the end and a **Stop button** always visible.\
\
Commonly missed details:\
- **Disable the send button** while a run is active, otherwise repeated clicks fire parallel requests and you pay several times.\
- **Scroll anchoring**: follow the new text, but stop auto-scrolling the moment the user scrolls up to re-read.\
- **Mid-stream errors**: keep the text already produced and offer retry — never wipe what the user was reading.\
\
Optimize **TTFT** ahead of total latency: perceived speed lives in the first token, not the last.

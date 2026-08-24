---
id: vi-sao-nen-noi-brute-force-truoc-du-biet-no-khong-toi-uu
position: backend
technology: brute-force-first
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên nói brute force trước dù biết nó không tối ưu?

## Question (EN)
Why state a brute-force solution first even when you know it is not optimal?

## Đáp án chi tiết (VI)
Brute force giống bản nháp: nó chứng minh bạn hiểu đề và cho cả hai người một mốc để cải tiến. Lợi ích cụ thể: (1) đảm bảo có một lời giải đúng trên bàn nếu hết giờ; (2) lộ ra bottleneck để bạn nhắm tối ưu đúng chỗ (\\"vòng lặp lồng này là O(n²), em sẽ thay tìm kiếm bằng hashmap\\"); (3) cho interviewer biết bạn không bị kẹt. Đừng cố nghĩ ra lời giải tối ưu hoàn hảo ngay từ đầu rồi ngồi im. Hãy nói baseline, ước lượng complexity của nó, rồi cải tiến từng bước. Nếu interviewer ổn với brute force, đôi khi họ chỉ muốn xem code sạch.

## Detailed Answer (EN)
Brute force is your draft: it proves you understand the problem and gives both of you a baseline to improve. It guarantees a correct solution on the board if time runs out, exposes the bottleneck so you optimize the right part, and signals you are not stuck. Do not freeze trying to invent the optimal answer immediately; state the baseline, estimate its complexity, then improve step by step.

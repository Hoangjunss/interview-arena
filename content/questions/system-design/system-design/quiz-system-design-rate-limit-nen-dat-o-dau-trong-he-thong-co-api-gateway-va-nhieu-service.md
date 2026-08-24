---
id: quiz-system-design-rate-limit-nen-dat-o-dau-trong-he-thong-co-api-gateway-va-nhieu-service
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limit nên đặt ở đâu trong hệ thống có API gateway và nhiều service?

## Đáp án trắc nghiệm
- [ ] Ở tầng CDN là đủ vì mọi request đều đi qua CDN
- [ ] Chỉ ở gateway, vì đó là điểm vào duy nhất của hệ thống
- [x] Ở gateway cho giới hạn chung, thêm ở service cho endpoint đắt
- [ ] Chỉ ở từng service, vì service hiểu tài nguyên của nó nhất

## Giải thích (VI)
Cả hai tầng. Gateway đặt giới hạn chung theo IP/token để chặn lạm dụng sớm; service đặt thêm giới hạn cho endpoint đắt (xuất báo cáo, gọi model AI, gửi mail). Một tầng duy nhất luôn thiếu một trong hai góc nhìn.

### Giải thích các phương án:
- **Ở tầng CDN là đủ vì mọi request đều đi qua CDN** (Sai): CDN chặn được tấn công thô nhưng không biết ngữ cảnh người dùng và quota theo tài khoản.
- **Chỉ ở gateway, vì đó là điểm vào duy nhất của hệ thống** (Sai): Gateway không biết một endpoint cụ thể nặng tới đâu, và lời gọi nội bộ đi vòng qua nó.
- **Ở gateway cho giới hạn chung, thêm ở service cho endpoint đắt** (Đúng): Gateway chặn được lạm dụng sớm, còn service biết endpoint nào thực sự tốn tài nguyên.
- **Chỉ ở từng service, vì service hiểu tài nguyên của nó nhất** (Sai): Để request rác đi sâu vào hệ thống mới chặn là quá muộn và tốn tài nguyên.

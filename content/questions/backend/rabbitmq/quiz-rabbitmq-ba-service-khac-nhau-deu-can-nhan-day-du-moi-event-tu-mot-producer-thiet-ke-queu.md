---
id: quiz-rabbitmq-ba-service-khac-nhau-deu-can-nhan-day-du-moi-event-tu-mot-producer-thiet-ke-queu
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ba service khác nhau đều cần nhận ĐẦY ĐỦ mọi event từ một producer. Thiết kế queue thế nào?

## Đáp án trắc nghiệm
- [ ] Cả ba service cùng consume một queue chung
- [ ] Mỗi service một exchange riêng, producer publish lần lượt cả ba
- [ ] Một queue chung, bật thuộc tính broadcast của queue
- [x] Mỗi service một queue riêng, cùng bind vào một fanout exchange

## Giải thích (VI)
Mỗi service một queue riêng , cả ba bind vào một fanout exchange — mỗi message được nhân bản vào cả ba queue. Quy tắc nền tảng: trong MỘT queue, các consumer chia nhau message (work queue); muốn ai cũng nhận đủ (pub/sub) thì tách queue. Trong một service vẫn scale nhiều instance cùng đọc chung queue của service đó.

### Giải thích các phương án:
- **Cả ba service cùng consume một queue chung** (Sai): Cùng queue nghĩa là competing consumers — ba service CHIA nhau message, mỗi bên chỉ nhận một phần.
- **Mỗi service một exchange riêng, producer publish lần lượt cả ba** (Sai): Producer phải biết và publish ba lần — đúng thứ mà exchange sinh ra để tránh.
- **Một queue chung, bật thuộc tính broadcast của queue** (Sai): Queue không có chế độ broadcast; nhân bản là việc của exchange.
- **Mỗi service một queue riêng, cùng bind vào một fanout exchange** (Đúng): Fanout nhân bản message tới cả ba queue; mỗi service đọc trọn vẹn dòng event của mình.

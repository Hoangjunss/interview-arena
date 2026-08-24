---
id: quiz-system-design-user-bam-nut-thanh-toan-hai-lan-do-mang-cham-chan-tru-tien-hai-lan-bang-cach-nao
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
User bấm nút thanh toán hai lần do mạng chậm. Chặn trừ tiền hai lần bằng cách nào?

## Đáp án trắc nghiệm
- [ ] Dùng transaction của DB cho toàn bộ luồng thanh toán
- [ ] Disable nút bấm sau lần click đầu tiên
- [ ] Kiểm tra xem đã có giao dịch nào trong 5 giây gần đây chưa
- [x] Client sinh idempotency key, server lưu kết quả theo key

## Giải thích (VI)
Idempotency key : client sinh một khoá duy nhất cho mỗi ý định thanh toán, gửi kèm request. Server lưu (key → kết quả); request sau cùng key trả về kết quả cũ mà không trừ tiền lần nữa.

### Giải thích các phương án:
- **Dùng transaction của DB cho toàn bộ luồng thanh toán** (Sai): Transaction bảo đảm atomic cho một request, không chống hai request.
- **Disable nút bấm sau lần click đầu tiên** (Sai): Giúp về UX nhưng không chặn được retry của client hay của proxy.
- **Kiểm tra xem đã có giao dịch nào trong 5 giây gần đây chưa** (Sai): Ngưỡng thời gian đoán được, và chặn oan giao dịch hợp lệ liền nhau.
- **Client sinh idempotency key, server lưu kết quả theo key** (Đúng): Request thứ hai cùng key trả về kết quả đã lưu chứ không thực hiện lại.

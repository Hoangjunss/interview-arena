---
id: quiz-system-design-gui-email-xac-nhan-sau-khi-dat-hang-nen-lam-dong-bo-trong-request-hay-day-qua-qu
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gửi email xác nhận sau khi đặt hàng nên làm đồng bộ trong request hay đẩy qua queue?

## Đáp án trắc nghiệm
- [ ] Đồng bộ, để chắc chắn user nhận được mail trước khi thấy kết quả đơn
- [ ] Đồng bộ nhưng bọc trong try-catch rồi bỏ qua lỗi
- [x] Qua queue — đơn hàng không nên thất bại vì mail lỗi
- [ ] Tuỳ tải hệ thống, lúc rảnh thì gửi đồng bộ

## Giải thích (VI)
Qua queue. Việc cốt lõi (ghi đơn hàng) và việc phụ (gửi mail) phải tách nhau: user nhận phản hồi ngay, mail được gửi bởi worker và retry được nếu SMTP lỗi. Đơn hàng không nên thất bại chỉ vì mail lỗi.

### Giải thích các phương án:
- **Đồng bộ, để chắc chắn user nhận được mail trước khi thấy kết quả đơn** (Sai): Kéo dài thời gian phản hồi và làm đơn hàng phụ thuộc vào một service không quan trọng.
- **Đồng bộ nhưng bọc trong try-catch rồi bỏ qua lỗi** (Sai): Không làm đơn thất bại nhưng mail lỗi là mất luôn, không retry được.
- **Qua queue — đơn hàng không nên thất bại vì mail lỗi** (Đúng): Người dùng nhận phản hồi nhanh, và việc gửi mail retry được độc lập.
- **Tuỳ tải hệ thống, lúc rảnh thì gửi đồng bộ** (Sai): Hành vi không nhất quán làm việc gỡ lỗi rất khó.

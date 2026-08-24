---
id: quiz-graphql-subscription-trong-graphql-phu-hop-voi-loai-d-lieu-nao
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Subscription trong GraphQL phù hợp với loại dữ liệu nào?

## Đáp án trắc nghiệm
- [ ] Dữ liệu chỉ đọc và hiếm khi thay đổi
- [x] Sự kiện xảy ra không đoán trước và cần đẩy ngay
- [ ] Dữ liệu lớn cần tải dần theo từng phần
- [ ] Mọi dữ liệu cần cập nhật thường xuyên trên giao diện

## Giải thích (VI)
Subscription hợp với sự kiện không đoán trước và cần đẩy ngay : tin nhắn mới, giá thay đổi, trạng thái đơn hàng. Với dữ liệu đổi đều đặn, hỏi lại theo lịch thường đơn giản và rẻ hơn nhiều về mặt vận hành.

### Giải thích các phương án:
- **Dữ liệu chỉ đọc và hiếm khi thay đổi** (Sai): Loại này hợp với truy vấn thường kèm bộ nhớ đệm.
- **Sự kiện xảy ra không đoán trước và cần đẩy ngay** (Đúng): Với dữ liệu đổi theo chu kỳ đều đặn, hỏi lại theo lịch thường đơn giản và rẻ hơn nhiều.
- **Dữ liệu lớn cần tải dần theo từng phần** (Sai): Tải dần cần cơ chế phân trang hoặc chỉ thị riêng.
- **Mọi dữ liệu cần cập nhật thường xuyên trên giao diện** (Sai): Nhiều trường hợp hỏi lại theo lịch là đủ và rẻ hơn về vận hành.

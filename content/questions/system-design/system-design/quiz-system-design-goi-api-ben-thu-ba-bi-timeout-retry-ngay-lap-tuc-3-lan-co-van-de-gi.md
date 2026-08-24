---
id: quiz-system-design-goi-api-ben-thu-ba-bi-timeout-retry-ngay-lap-tuc-3-lan-co-van-de-gi
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi API bên thứ ba bị timeout. Retry ngay lập tức 3 lần có vấn đề gì?

## Đáp án trắc nghiệm
- [x] Dồn thêm tải vào service đang quá tải nên làm nó tệ hơn
- [ ] Làm mất kết quả của lần gọi đầu tiên nếu nó đã thành công
- [ ] Vi phạm ngữ nghĩa HTTP nên không được phép retry
- [ ] Retry không bao giờ có tác dụng với lỗi timeout của mạng

## Giải thích (VI)
Retry ngay và dày sẽ dồn thêm tải vào service vốn đang quá tải, biến sự cố nhỏ thành sập kéo dài. Cần exponential backoff + jitter : mỗi lần chờ lâu hơn, cộng một khoảng ngẫu nhiên để nhiều client không đồng loạt retry cùng lúc.

### Giải thích các phương án:
- **Dồn thêm tải vào service đang quá tải nên làm nó tệ hơn** (Đúng): Cần backoff tăng dần cộng jitter để các client không cùng retry một lúc.
- **Làm mất kết quả của lần gọi đầu tiên nếu nó đã thành công** (Sai): Kết quả không mất; vấn đề là có thể thực hiện việc đó hai lần.
- **Vi phạm ngữ nghĩa HTTP nên không được phép retry** (Sai): HTTP cho phép retry, chỉ cần cẩn thận với thao tác không idempotent.
- **Retry không bao giờ có tác dụng với lỗi timeout của mạng** (Sai): Timeout do nghẽn tạm thời thì retry có tác dụng thật.

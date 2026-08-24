---
id: quiz-system-design-sticky-session-o-load-balancer-gay-han-che-gi
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sticky session ở load balancer gây hạn chế gì?

## Đáp án trắc nghiệm
- [x] Instance chết là user mất phiên, và tải phân bổ lệch
- [ ] Làm tăng độ trễ vì phải tra bảng định tuyến mỗi request
- [ ] Chỉ hoạt động khi có đúng hai instance phía sau
- [ ] Không thể dùng HTTPS vì phải đọc cookie mới định tuyến được

## Giải thích (VI)
Buộc một user vào một instance cụ thể: instance chết là mất phiên , deploy làm user bị đăng xuất, và tải lệch vì instance nào có nhiều user "dính" thì nặng hơn. Cách đúng là làm ứng dụng stateless.

### Giải thích các phương án:
- **Instance chết là user mất phiên, và tải phân bổ lệch** (Đúng): Lưu session ở nơi chia sẻ (Redis) hoặc dùng token tự chứa sẽ bỏ được ràng buộc này.
- **Làm tăng độ trễ vì phải tra bảng định tuyến mỗi request** (Sai): Chi phí tra bảng không đáng kể.
- **Chỉ hoạt động khi có đúng hai instance phía sau** (Sai): Không có ràng buộc về số instance.
- **Không thể dùng HTTPS vì phải đọc cookie mới định tuyến được** (Sai): Load balancer terminate TLS rồi đọc cookie bình thường.

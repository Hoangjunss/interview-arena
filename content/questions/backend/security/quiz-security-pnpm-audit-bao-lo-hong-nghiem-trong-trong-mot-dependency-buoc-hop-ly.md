---
id: quiz-security-pnpm-audit-bao-lo-hong-nghiem-trong-trong-mot-dependency-buoc-hop-ly
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
pnpm audit báo lỗ hổng nghiêm trọng trong một dependency. Bước hợp lý?

## Đáp án trắc nghiệm
- [ ] Thay thư viện đó bằng một thư viện khác có chức năng tương đương
- [ ] Bỏ qua nếu dự án chưa gặp vấn đề gì trong thực tế
- [ ] Nâng ngay mọi dependency lên phiên bản mới nhất
- [x] Xem lỗ hổng có ảnh hưởng cách mình dùng không rồi nâng bản

## Giải thích (VI)
Đọc mô tả lỗ hổng và xem nó có áp dụng với cách mình dùng không (nhiều lỗ hổng chỉ xảy ra ở tính năng bạn không dùng, hoặc chỉ ở dependency của dev), rồi nâng phiên bản có bản vá.

### Giải thích các phương án:
- **Thay thư viện đó bằng một thư viện khác có chức năng tương đương** (Sai): Quá nặng cho bước đầu; nâng phiên bản thường đã đủ.
- **Bỏ qua nếu dự án chưa gặp vấn đề gì trong thực tế** (Sai): Lỗ hổng chưa bị khai thác không có nghĩa là an toàn.
- **Nâng ngay mọi dependency lên phiên bản mới nhất** (Sai): Dễ kéo theo breaking change không liên quan tới lỗ hổng.
- **Xem lỗ hổng có ảnh hưởng cách mình dùng không rồi nâng bản** (Đúng): Nhiều báo cáo không áp dụng với cách dùng thực tế của dự án.

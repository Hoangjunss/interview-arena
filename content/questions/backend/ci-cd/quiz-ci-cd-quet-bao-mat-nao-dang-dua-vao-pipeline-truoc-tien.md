---
id: quiz-ci-cd-quet-bao-mat-nao-dang-dua-vao-pipeline-truoc-tien
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quét bảo mật nào đáng đưa vào pipeline trước tiên?

## Đáp án trắc nghiệm
- [ ] Quét lỗ hổng ứng dụng động bằng cách tấn công thử
- [ ] Quét image container sau khi đã deploy lên production
- [ ] Phân tích code tĩnh toàn diện cho mọi loại lỗ hổng
- [x] Quét dependency và quét secret vì nhanh, ít báo sai

## Giải thích (VI)
Hai thứ nhanh và rõ ràng nhất: quét dependency (lỗ hổng đã biết trong thư viện) và quét secret (khoá bị commit). Cả hai chạy trong giây, ít báo sai, và bắt được đúng loại sự cố hay xảy ra thật.

### Giải thích các phương án:
- **Quét lỗ hổng ứng dụng động bằng cách tấn công thử** (Sai): Cần môi trường chạy thật và mất nhiều thời gian, không hợp mỗi PR.
- **Quét image container sau khi đã deploy lên production** (Sai): Quá muộn: nên quét trước khi image được phát hành.
- **Phân tích code tĩnh toàn diện cho mọi loại lỗ hổng** (Sai): Giá trị cao nhưng nhiều báo sai nên dễ bị bỏ qua nếu bật ngay.
- **Quét dependency và quét secret vì nhanh, ít báo sai** (Đúng): Phân tích code tĩnh sâu thường chậm và nhiều báo sai nên đưa vào sau.

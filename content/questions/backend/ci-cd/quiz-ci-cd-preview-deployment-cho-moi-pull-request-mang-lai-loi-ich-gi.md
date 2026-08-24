---
id: quiz-ci-cd-preview-deployment-cho-moi-pull-request-mang-lai-loi-ich-gi
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Preview deployment cho mỗi pull request mang lại lợi ích gì?

## Đáp án trắc nghiệm
- [ ] Giúp pipeline chạy nhanh hơn vì build một lần dùng nhiều nơi
- [ ] Bảo đảm code hoạt động đúng như trên production
- [x] Người review xem được thay đổi chạy thật, không đọc code suông
- [ ] Thay thế được nhu cầu viết test tự động cho thay đổi đó

## Giải thích (VI)
Review được thứ đang chạy thay vì tưởng tượng từ diff — quan trọng nhất với thay đổi giao diện, và cho phép người không đọc code (thiết kế, sản phẩm) góp ý trực tiếp trên bản chạy.

### Giải thích các phương án:
- **Giúp pipeline chạy nhanh hơn vì build một lần dùng nhiều nơi** (Sai): Nó thêm một bước deploy nên không làm pipeline nhanh hơn.
- **Bảo đảm code hoạt động đúng như trên production** (Sai): Preview thường thiếu dữ liệu thật và tải thật nên không bảo đảm điều đó.
- **Người review xem được thay đổi chạy thật, không đọc code suông** (Đúng): Rất hiệu quả với thay đổi giao diện và luồng người dùng.
- **Thay thế được nhu cầu viết test tự động cho thay đổi đó** (Sai): Xem bằng mắt không lặp lại được và không chặn hồi quy.

---
id: quiz-network-http-header-cache-control-max-age3600-nghia-la-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Header Cache-Control: max-age=3600 nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Tài nguyên bị xóa khỏi cache sau 3600 giây
- [x] Tài nguyên được coi là còn mới trong 3600 giây
- [ ] Yêu cầu phải hoàn tất trong vòng 3600 giây
- [ ] Máy chủ giữ bản sao tài nguyên trong 3600 giây

## Giải thích (VI)
Tài nguyên được coi là còn mới trong 3600 giây : trong khoảng đó trình duyệt dùng thẳng bản trong cache, không gửi yêu cầu nào tới máy chủ. Hết hạn thì nó chuyển sang trạng thái cần kiểm chứng lại, chứ không phải bị xóa.

### Giải thích các phương án:
- **Tài nguyên bị xóa khỏi cache sau 3600 giây** (Sai): Hết hạn không đồng nghĩa với bị xóa; nó chuyển sang trạng thái cần kiểm chứng.
- **Tài nguyên được coi là còn mới trong 3600 giây** (Đúng): Trong khoảng đó client dùng bản cache mà không hỏi lại máy chủ.
- **Yêu cầu phải hoàn tất trong vòng 3600 giây** (Sai): Không liên quan tới thời gian chờ của yêu cầu.
- **Máy chủ giữ bản sao tài nguyên trong 3600 giây** (Sai): Header này nói về cache phía client và trung gian.

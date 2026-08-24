---
id: quiz-android-kotlin-nguoi-dung-tu-choi-quyen-hai-lan-tren-android-thi-loi-goi-xin-quyen-tiep-theo-ra
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Người dùng từ chối quyền hai lần trên Android thì lời gọi xin quyền tiếp theo ra sao?

## Đáp án trắc nghiệm
- [ ] Quyền được cấp tự động ở mức hạn chế
- [ ] Hộp thoại vẫn hiện kèm tuỳ chọn không hỏi lại
- [x] Không hiện hộp thoại, trả về từ chối ngay
- [ ] Ứng dụng bị hệ thống tạm khoá quyền trong một ngày

## Giải thích (VI)
Lời gọi trả về từ chối ngay mà không hiện hộp thoại . Ứng dụng phải nhận ra trạng thái này, giải thích vì sao cần quyền và đưa nút mở phần cài đặt ứng dụng, đồng thời vẫn cho dùng các phần không cần quyền đó.

### Giải thích các phương án:
- **Quyền được cấp tự động ở mức hạn chế** (Sai): Không có mức cấp tự động nào.
- **Hộp thoại vẫn hiện kèm tuỳ chọn không hỏi lại** (Sai): Tuỳ chọn đó thuộc các phiên bản Android cũ hơn.
- **Không hiện hộp thoại, trả về từ chối ngay** (Đúng): Đây là trạng thái từ chối vĩnh viễn, chỉ mở lại được trong phần cài đặt ứng dụng.
- **Ứng dụng bị hệ thống tạm khoá quyền trong một ngày** (Sai): Không có cơ chế khoá theo thời gian.

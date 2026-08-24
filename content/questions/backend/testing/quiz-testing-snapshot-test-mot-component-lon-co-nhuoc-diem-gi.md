---
id: quiz-testing-snapshot-test-mot-component-lon-co-nhuoc-diem-gi
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Snapshot test một component lớn có nhược điểm gì?

## Đáp án trắc nghiệm
- [ ] Không phát hiện được lỗi trong logic xử lý sự kiện
- [ ] Chạy chậm hơn nhiều so với các loại test khác trong bộ test
- [ ] Không chạy được trong môi trường CI không có giao diện
- [x] Đỏ với mọi thay đổi nhỏ nên người ta cập nhật theo phản xạ

## Giải thích (VI)
Snapshot lớn đỏ với mọi thay đổi nhỏ — đổi một class, thêm một thẻ bọc là diff hàng trăm dòng. Người ta chạy -u cho nhanh, và từ đó snapshot không còn phát hiện được gì.

### Giải thích các phương án:
- **Không phát hiện được lỗi trong logic xử lý sự kiện** (Sai): Đúng nhưng đó là giới hạn về phạm vi, không phải nhược điểm chính.
- **Chạy chậm hơn nhiều so với các loại test khác trong bộ test** (Sai): Snapshot test chạy khá nhanh, tốc độ không phải vấn đề chính.
- **Không chạy được trong môi trường CI không có giao diện** (Sai): Snapshot test chạy trong môi trường không giao diện bình thường.
- **Đỏ với mọi thay đổi nhỏ nên người ta cập nhật theo phản xạ** (Đúng): Khi đó snapshot không còn bảo vệ gì vì mọi thay đổi đều được duyệt qua.

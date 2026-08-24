---
id: quiz-android-kotlin-intent-tuong-minh-va-intent-ngam-dinh-khac-nhau-o-dau
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Intent tường minh và Intent ngầm định khác nhau ở đâu?

## Đáp án trắc nghiệm
- [ ] Tường minh chạy đồng bộ còn ngầm định chạy bất đồng bộ
- [x] Tường minh chỉ đích danh, ngầm định để hệ thống chọn
- [ ] Tường minh chỉ mở được thành phần trong cùng ứng dụng
- [ ] Ngầm định không truyền được dữ liệu kèm theo

## Giải thích (VI)
Intent tường minh chỉ đích danh thành phần cần mở, thường dùng trong nội bộ ứng dụng. Intent ngầm định mô tả hành động như chia sẻ hay mở liên kết, và hệ thống chọn ứng dụng khai báo xử lý được hành động đó.

### Giải thích các phương án:
- **Tường minh chạy đồng bộ còn ngầm định chạy bất đồng bộ** (Sai): Cả hai đều là yêu cầu bất đồng bộ tới hệ thống.
- **Tường minh chỉ đích danh, ngầm định để hệ thống chọn** (Đúng): Ngầm định mô tả hành động cần làm và hệ thống tìm ứng dụng khai báo xử lý được hành động đó.
- **Tường minh chỉ mở được thành phần trong cùng ứng dụng** (Sai): Nó mở được thành phần của ứng dụng khác nếu biết chính xác tên.
- **Ngầm định không truyền được dữ liệu kèm theo** (Sai): Cả hai đều truyền được dữ liệu.

---
id: quiz-kafka-cleanuppolicycompact-gi-lai-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
cleanup.policy=compact giữ lại gì?

## Đáp án trắc nghiệm
- [x] Bản ghi mới nhất của mỗi key
- [ ] Các bản ghi trong khoảng thời gian giữ gần nhất
- [ ] Bản ghi đầu tiên của mỗi key làm mốc
- [ ] Toàn bộ bản ghi nhưng nén lại bằng gzip cho nhỏ

## Giải thích (VI)
Bản ghi mới nhất của mỗi key ; các bản cũ hơn cùng key bị dọn dần. Log trở thành trạng thái hiện tại chứ không phải lịch sử — dùng cho topic kiểu bảng: thông tin user, cấu hình, tồn kho.

### Giải thích các phương án:
- **Bản ghi mới nhất của mỗi key** (Đúng): Log trở thành ảnh chụp trạng thái hiện tại thay vì toàn bộ lịch sử thay đổi.
- **Các bản ghi trong khoảng thời gian giữ gần nhất** (Sai): Đó là cleanup.policy=delete, chính sách mặc định.
- **Bản ghi đầu tiên của mỗi key làm mốc** (Sai): Compaction giữ giá trị mới nhất, không giữ giá trị đầu.
- **Toàn bộ bản ghi nhưng nén lại bằng gzip cho nhỏ** (Sai): Nén dữ liệu là compression.type, khác hoàn toàn với compaction.

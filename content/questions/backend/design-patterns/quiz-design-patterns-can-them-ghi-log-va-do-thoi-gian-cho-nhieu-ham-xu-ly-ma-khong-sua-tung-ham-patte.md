---
id: quiz-design-patterns-can-them-ghi-log-va-do-thoi-gian-cho-nhieu-ham-xu-ly-ma-khong-sua-tung-ham-patte
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần thêm ghi log và đo thời gian cho nhiều hàm xử lý mà không sửa từng hàm. Pattern nào?

## Đáp án trắc nghiệm
- [ ] Strategy để chọn cách xử lý tuỳ theo hàm
- [x] Decorator: bọc hàm gốc để thêm hành vi
- [ ] Adapter để chuẩn hoá chữ ký của các hàm xử lý
- [ ] Template method để định nghĩa một khung xử lý chung cho cả nhóm

## Giải thích (VI)
Decorator : withLogging(withTiming(handler)) — mỗi lớp bọc thêm một mối quan tâm mà hàm gốc không biết gì. Trong JS đây là hàm bậc cao, và middleware của Express hay Next chính là mẫu này.

### Giải thích các phương án:
- **Strategy để chọn cách xử lý tuỳ theo hàm** (Sai): Strategy chọn giữa các hành vi, không bổ sung hành vi.
- **Decorator: bọc hàm gốc để thêm hành vi** (Đúng): Hàm gốc không đổi, và các decorator xếp lớp lên nhau được.
- **Adapter để chuẩn hoá chữ ký của các hàm xử lý** (Sai): Adapter chuyển đổi interface, không thêm hành vi.
- **Template method để định nghĩa một khung xử lý chung cho cả nhóm** (Sai): Cần lớp cha và thừa kế, nặng hơn cho nhu cầu này.

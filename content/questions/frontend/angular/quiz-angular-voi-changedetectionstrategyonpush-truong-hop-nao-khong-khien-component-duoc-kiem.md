---
id: quiz-angular-voi-changedetectionstrategyonpush-truong-hop-nao-khong-khien-component-duoc-kiem
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với ChangeDetectionStrategy.OnPush, trường hợp nào KHÔNG khiến component được kiểm tra lại?

## Đáp án trắc nghiệm
- [ ] Một @Input() nhận tham chiếu mới (so sánh bằng ===)
- [ ] Sự kiện DOM phát ra từ chính template của component (ví dụ (click))
- [x] Mutate một thuộc tính bên trong object đã truyền qua input mà không tạo object mới
- [ ] Signal được đọc trong template thay đổi giá trị, hoặc async pipe nhận giá trị mới

## Giải thích (VI)
OnPush khiến Angular chỉ kiểm tra component khi: input nhận tham chiếu mới, sự kiện phát ra từ template của component, signal đọc trong template đổi giá trị, hoặc async pipe phát giá trị mới. Sửa trực tiếp bên trong object đã truyền vào (giữ nguyên tham chiếu) sẽ không kích hoạt kiểm tra — đó là lý do OnPush đi kèm với dữ liệu bất biến.

### Giải thích các phương án:
- **Một @Input() nhận tham chiếu mới (so sánh bằng ===)** (Sai): Có kích hoạt: OnPush so sánh tham chiếu, nên object mới được tính là đổi.
- **Sự kiện DOM phát ra từ chính template của component (ví dụ (click))** (Sai): Có kích hoạt: event binding trong template đánh dấu component cần kiểm tra lại.
- **Mutate một thuộc tính bên trong object đã truyền qua input mà không tạo object mới** (Đúng): Đây là chỗ không kích hoạt: tham chiếu không đổi nên OnPush bỏ qua — lỗi kinh điển khi bật OnPush.
- **Signal được đọc trong template thay đổi giá trị, hoặc async pipe nhận giá trị mới** (Sai): Có kích hoạt: cả signal lẫn async pipe đều báo cho Angular biết view này cần cập nhật.

---
id: quiz-design-patterns-don-hang-co-nhieu-trang-thai-voi-quy-tac-chuyen-doi-phuc-tap-pattern-nao-phu-hop
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đơn hàng có nhiều trạng thái với quy tắc chuyển đổi phức tạp. Pattern nào phù hợp?

## Đáp án trắc nghiệm
- [x] State machine: khai tường minh trạng thái và chuyển đổi hợp lệ
- [ ] Observer để thông báo khi trạng thái đơn thay đổi
- [ ] Strategy để chọn cách xử lý theo từng trạng thái
- [ ] Command để đóng gói mỗi thao tác thành một đối tượng riêng

## Giải thích (VI)
State machine : khai một bảng trạng thái và các chuyển đổi được phép (pending → paid → shipped), và mọi thay đổi phải đi qua một hàm kiểm tra bảng đó. Chuyển đổi sai bị chặn ở một chỗ duy nhất.

### Giải thích các phương án:
- **State machine: khai tường minh trạng thái và chuyển đổi hợp lệ** (Đúng): Chuyển đổi không hợp lệ bị chặn ở một chỗ thay vì rải if khắp code.
- **Observer để thông báo khi trạng thái đơn thay đổi** (Sai): Cần cho việc thông báo nhưng không kiểm soát chuyển đổi.
- **Strategy để chọn cách xử lý theo từng trạng thái** (Sai): Gần đúng nhưng thiếu phần định nghĩa chuyển đổi hợp lệ.
- **Command để đóng gói mỗi thao tác thành một đối tượng riêng** (Sai): Hữu ích cho undo và hàng đợi thao tác, không quản trạng thái.

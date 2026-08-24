---
id: quiz-testing-nen-test-ham-private-cua-mot-class-khong
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nên test hàm private của một class không?

## Đáp án trắc nghiệm
- [x] Không — test qua API công khai vì private là chi tiết
- [ ] Không, vì ngôn ngữ không cho phép gọi hàm private từ test
- [ ] Có, để chắc chắn mọi hàm trong class đều được kiểm tra kỹ
- [ ] Có, nếu hàm private đó chứa logic phức tạp

## Giải thích (VI)
Không. Test qua API công khai — private là chi tiết cài đặt, và test bám vào nó sẽ đỏ mỗi lần refactor dù hành vi bên ngoài không đổi. Nếu một hàm private phức tạp đến mức muốn test riêng, đó là dấu hiệu nó nên trở thành một đơn vị độc lập.

### Giải thích các phương án:
- **Không — test qua API công khai vì private là chi tiết** (Đúng): Test bám vào private sẽ đỏ mỗi lần refactor dù hành vi không đổi.
- **Không, vì ngôn ngữ không cho phép gọi hàm private từ test** (Sai): Nhiều ngôn ngữ vẫn cho gọi được; vấn đề là có nên hay không.
- **Có, để chắc chắn mọi hàm trong class đều được kiểm tra kỹ** (Sai): Ràng buộc test vào cài đặt nội bộ và cản trở việc refactor.
- **Có, nếu hàm private đó chứa logic phức tạp** (Sai): Logic phức tạp là dấu hiệu nên tách nó thành đơn vị công khai riêng.

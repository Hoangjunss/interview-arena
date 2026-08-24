---
id: quiz-angular-defer-trong-template-angular-lam-gi
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@defer trong template Angular làm gì?

## Đáp án trắc nghiệm
- [ ] Thay thế cho lazy loading route — dùng @defer thì không cần chia route nữa
- [ ] Khối @defer vẫn nằm trong bundle ban đầu, chỉ hoãn việc render ra DOM
- [ ] @defer chỉ kích hoạt được thủ công bằng cách gọi hàm trong class
- [x] Tách phần template kèm phụ thuộc ra khỏi bundle ban đầu, chỉ tải khi cần

## Giải thích (VI)
@defer chia một phần template và phụ thuộc của nó thành chunk riêng, chỉ tải khi trigger xảy ra: on idle (mặc định), on viewport, on interaction, on hover, on timer, hoặc when <điều kiện>. Đi kèm là @placeholder (hiện trước khi tải), @loading (trong lúc tải) và @error. Dùng cho khối nặng và không quan trọng ngay: biểu đồ, editor, phần bình luận.

### Giải thích các phương án:
- **Thay thế cho lazy loading route — dùng @defer thì không cần chia route nữa** (Sai): Hai cơ chế bổ sung cho nhau: route chia theo trang, @defer chia trong một trang.
- **Khối @defer vẫn nằm trong bundle ban đầu, chỉ hoãn việc render ra DOM** (Sai): Ngược lại — phần bị hoãn được tách hẳn khỏi bundle ban đầu, đó mới là chỗ tiết kiệm.
- **@defer chỉ kích hoạt được thủ công bằng cách gọi hàm trong class** (Sai): Nó có sẵn các trigger khai báo trong template: on viewport, on interaction, on idle, on timer.
- **Tách phần template kèm phụ thuộc ra khỏi bundle ban đầu, chỉ tải khi cần** (Đúng): Đúng: đây là lazy load ở mức template chứ không chỉ mức route, nên giảm JavaScript phải tải lúc vào trang. Trigger có sẵn gồm on viewport, on interaction, on idle, on timer.

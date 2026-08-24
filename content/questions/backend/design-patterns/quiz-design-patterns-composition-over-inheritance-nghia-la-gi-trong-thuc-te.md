---
id: quiz-design-patterns-composition-over-inheritance-nghia-la-gi-trong-thuc-te
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composition over inheritance nghĩa là gì trong thực tế?

## Đáp án trắc nghiệm
- [ ] Chia một lớp lớn thành nhiều lớp nhỏ hơn theo từng chức năng
- [ ] Dùng interface thay cho lớp abstract ở mọi nơi
- [x] Ghép các thành phần nhỏ thay vì cây thừa kế sâu
- [ ] Không bao giờ dùng thừa kế trong bất kỳ trường hợp nào

## Giải thích (VI)
Ưu tiên ghép các thành phần nhỏ có trách nhiệm rõ (một object chứa các collaborator) thay vì thừa kế nhiều tầng. Thừa kế buộc bạn nhận cả hành vi của cha, kể cả phần không cần.

### Giải thích các phương án:
- **Chia một lớp lớn thành nhiều lớp nhỏ hơn theo từng chức năng** (Sai): Gần với SRP, chưa nói tới cách ghép các phần lại.
- **Dùng interface thay cho lớp abstract ở mọi nơi** (Sai): Là một cách thể hiện, không phải nội dung của nguyên tắc.
- **Ghép các thành phần nhỏ thay vì cây thừa kế sâu** (Đúng): Cây thừa kế sâu làm thay đổi ở lớp cha ảnh hưởng khó lường tới lớp con.
- **Không bao giờ dùng thừa kế trong bất kỳ trường hợp nào** (Sai): Thừa kế vẫn hợp lý khi quan hệ là-một thật sự và ổn định.

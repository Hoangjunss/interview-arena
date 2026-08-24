---
id: quiz-cpp-vi-sao-tep-tieu-de-can-co-che-chong-nhung-nhieu-lan
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao tệp tiêu đề cần cơ chế chống nhúng nhiều lần?

## Đáp án trắc nghiệm
- [ ] Ngăn tệp tiêu đề bị sửa từ nhiều tệp nguồn
- [x] Tránh khai báo trùng khi tệp được nhúng nhiều lần
- [ ] Bảo đảm thứ tự nhúng các tệp là cố định
- [ ] Giảm thời gian biên dịch bằng cách nén nội dung

## Giải thích (VI)
Bộ tiền xử lý chèn nguyên nội dung tệp vào chỗ nhúng, nên cùng một tiêu đề vào hai lần sẽ khai báo lại mọi thứ và gây lỗi trùng. Cơ chế chống nhúng nhiều lần đảm bảo nội dung chỉ được xử lý một lần cho mỗi tệp nguồn.

### Giải thích các phương án:
- **Ngăn tệp tiêu đề bị sửa từ nhiều tệp nguồn** (Sai): Không liên quan tới việc chỉnh sửa tệp.
- **Tránh khai báo trùng khi tệp được nhúng nhiều lần** (Đúng): Bộ tiền xử lý chèn nguyên nội dung, nên cùng một tiêu đề vào hai lần sẽ khai báo lại mọi thứ.
- **Bảo đảm thứ tự nhúng các tệp là cố định** (Sai): Thứ tự nhúng vẫn do người viết quyết định.
- **Giảm thời gian biên dịch bằng cách nén nội dung** (Sai): Không có bước nén nào và tác động tới thời gian là gián tiếp.

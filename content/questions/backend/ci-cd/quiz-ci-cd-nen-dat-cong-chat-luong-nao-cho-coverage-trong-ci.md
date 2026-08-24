---
id: quiz-ci-cd-nen-dat-cong-chat-luong-nao-cho-coverage-trong-ci
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nên đặt cổng chất lượng nào cho coverage trong CI?

## Đáp án trắc nghiệm
- [ ] Không cần cổng nào vì coverage không đo được chất lượng
- [ ] Đặt ngưỡng 80% vì đây được coi là con số tiêu chuẩn ngành
- [x] Không cho coverage giảm so với nhánh chính
- [ ] Bắt buộc đạt 100% coverage cho mọi thay đổi

## Giải thích (VI)
Thực dụng nhất là không cho tụt : coverage của PR không được thấp hơn nhánh chính. Nó chặn việc thêm code không test mà không tạo áp lực viết test hình thức để đạt một con số tuyệt đối.

### Giải thích các phương án:
- **Không cần cổng nào vì coverage không đo được chất lượng** (Sai): Đúng là nó không đo chất lượng, nhưng vẫn hữu ích để chặn việc tụt dần.
- **Đặt ngưỡng 80% vì đây được coi là con số tiêu chuẩn ngành** (Sai): Không có con số chuẩn nào đúng cho mọi dự án.
- **Không cho coverage giảm so với nhánh chính** (Đúng): Ngưỡng tuyệt đối cao dễ dẫn tới test viết cho đủ số chứ không để bắt lỗi.
- **Bắt buộc đạt 100% coverage cho mọi thay đổi** (Sai): Tạo ra test hình thức và làm chậm mọi pull request.

---
id: quiz-design-patterns-khi-nao-khong-nen-ap-dung-design-pattern
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào KHÔNG nên áp dụng design pattern?

## Đáp án trắc nghiệm
- [ ] Khi dự án đang dùng ngôn ngữ hàm thay vì hướng đối tượng
- [x] Khi vấn đề mà pattern giải quyết chưa xuất hiện
- [ ] Khi nhóm chưa quen với pattern đó từ trước
- [ ] Khi codebase hiện tại còn nhỏ hơn 10 nghìn dòng code

## Giải thích (VI)
Khi vấn đề mà pattern giải quyết chưa tồn tại . Một interface với đúng một cài đặt, một factory tạo đúng một loại, một event bus cho hai module — đều là abstraction trả trước cho nhu cầu có thể không bao giờ tới.

### Giải thích các phương án:
- **Khi dự án đang dùng ngôn ngữ hàm thay vì hướng đối tượng** (Sai): Phần lớn pattern vẫn áp dụng được, chỉ khác cách thể hiện.
- **Khi vấn đề mà pattern giải quyết chưa xuất hiện** (Đúng): Thêm tầng abstraction cho nhu cầu chưa có làm code khó đọc mà không đổi lấy gì.
- **Khi nhóm chưa quen với pattern đó từ trước** (Sai): Chưa quen thì học được; đó không phải lý do quyết định.
- **Khi codebase hiện tại còn nhỏ hơn 10 nghìn dòng code** (Sai): Kích thước không phải tiêu chí; vấn đề thực tế mới là tiêu chí.

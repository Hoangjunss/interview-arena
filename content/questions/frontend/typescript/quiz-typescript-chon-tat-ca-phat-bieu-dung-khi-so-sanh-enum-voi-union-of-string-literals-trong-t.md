---
id: quiz-typescript-chon-tat-ca-phat-bieu-dung-khi-so-sanh-enum-voi-union-of-string-literals-trong-t
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn TẤT CẢ phát biểu đúng khi so sánh enum với union of string literals trong TypeScript.

## Đáp án trắc nghiệm
- [ ] Union of string literals có thể iterate tại runtime để lấy danh sách giá trị
- [ ] String enum tự động gán giá trị tăng dần 0, 1, 2 như numeric enum
- [x] Numeric enum có reverse lookup: Direction[0] trả về tên member "Up"

## Giải thích (VI)
Enum sinh object JavaScript thật tại runtime (numeric enum còn có reverse lookup), trong khi union of literals bị xoá hoàn toàn khi compile — nhẹ hơn nhưng không iterate được. Xu hướng hiện nay: dùng const object + as const để có cả union type lẫn giá trị runtime, tree-shaking tốt hơn enum.

### Giải thích các phương án:
- **Union of string literals có thể iterate tại runtime để lấy danh sách giá trị** (Sai): Union chỉ là type, bị xoá khi compile — muốn iterate phải có mảng/object giá trị thật (ví dụ as const array).
- **String enum tự động gán giá trị tăng dần 0, 1, 2 như numeric enum** (Sai): String enum bắt buộc gán giá trị chuỗi tường minh cho từng member; auto-increment chỉ có ở numeric enum.
- **Numeric enum có reverse lookup: Direction[0] trả về tên member "Up"** (Đúng): Numeric enum sinh object hai chiều (name→value và value→name); string enum thì không có reverse lookup.

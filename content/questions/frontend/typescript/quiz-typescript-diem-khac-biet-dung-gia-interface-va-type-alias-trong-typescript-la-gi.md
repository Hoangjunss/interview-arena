---
id: quiz-typescript-diem-khac-biet-dung-gia-interface-va-type-alias-trong-typescript-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điểm khác biệt đúng giữa interface và type alias trong TypeScript là gì?

## Đáp án trắc nghiệm
- [ ] type không thể tham gia extends, muốn kế thừa bắt buộc dùng interface
- [ ] type chỉ dùng cho primitive, interface chỉ dùng cho object
- [x] interface hỗ trợ declaration merging (khai báo trùng tên sẽ được gộp), còn type alias thì không
- [ ] interface được check tại runtime, type chỉ check tại compile time

## Giải thích (VI)
interface có declaration merging và chỉ mô tả object shape; type alias linh hoạt hơn (union, intersection, tuple, primitive, conditional type) nhưng không merge. Quy tắc phổ biến: interface cho public API cần mở rộng, type cho union và các kiểu nâng cao.

### Giải thích các phương án:
- **type không thể tham gia extends, muốn kế thừa bắt buộc dùng interface** (Sai): type kết hợp bằng intersection (A & B) và interface còn có thể extends một type alias mô tả object.
- **type chỉ dùng cho primitive, interface chỉ dùng cho object** (Sai): type mô tả được cả object shape, union, tuple, primitive; giới hạn nằm ở interface (chỉ object shape), không phải type.
- **interface hỗ trợ declaration merging (khai báo trùng tên sẽ được gộp), còn type alias thì không** (Đúng): Hai interface cùng tên tự động gộp thành một; khai báo hai type cùng tên là lỗi compile. Đây là khác biệt hành vi rõ nhất.
- **interface được check tại runtime, type chỉ check tại compile time** (Sai): Cả hai đều bị xoá hoàn toàn khi compile (type erasure) — không có kiểm tra runtime nào.

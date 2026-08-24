---
id: quiz-typescript-kieu-duoc-suy-ra-cua-dirs-trong-doan-code-sau-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu được suy ra của dirs trong đoạn code sau là gì?

## Đáp án trắc nghiệm
- [x] readonly ['left', 'right'] — tuple readonly với đúng hai literal type theo thứ tự
- [ ] ('left' | 'right')[] — array độ dài bất kỳ chứa hai giá trị đó
- [ ] string[] — array của string như khi không có as const
- [ ] ['left', 'right'] — tuple nhưng vẫn mutate được bằng push/pop

## Giải thích (VI)
Kiểu là readonly ['left', 'right'] — tuple readonly, mỗi phần tử là literal type. Không có as const, TypeScript widen thành string[]. Const assertion giữ kiểu hẹp nhất: hữu ích để tạo hằng số strongly-typed và lấy union từ đó bằng typeof dirs[number].

### Giải thích các phương án:
- **readonly ['left', 'right'] — tuple readonly với đúng hai literal type theo thứ tự** (Đúng): as const chọn kiểu hẹp nhất: array literal thành readonly tuple, mỗi phần tử giữ literal type thay vì widen lên string.
- **('left' | 'right')[] — array độ dài bất kỳ chứa hai giá trị đó** (Sai): Gần đúng về literal nhưng sai về cấu trúc: as const cho tuple cố định độ dài 2 và readonly, không phải array tự do.
- **string[] — array của string như khi không có as const** (Sai): Đó là kiểu khi KHÔNG có as const; const assertion tồn tại chính là để chặn widening này.
- **['left', 'right'] — tuple nhưng vẫn mutate được bằng push/pop** (Sai): as const luôn kèm readonly — các method mutate như push không tồn tại trên kiểu này.

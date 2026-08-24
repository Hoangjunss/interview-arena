---
id: quiz-javascript-typeof-null-nan-va-so-thuc-doan-code-sau-in-ra-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
typeof null, NaN và số thực — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] object number false
- [ ] object NaN false
- [ ] object number true
- [ ] null NaN true

## Giải thích (VI)
Kết quả: object, number, false. typeof null trả "object" (một bug lịch sử được giữ lại vì tương thích ngược). NaN là giá trị đặc biệt thuộc kiểu number. 0.1 + 0.2 cho 0.30000000000000004 do biểu diễn dấu chấm động IEEE-754, nên === 0.3 là false.

### Giải thích các phương án:
- **object number false** (Đúng): typeof null là "object" (bug lịch sử), NaN thuộc kiểu number, và 0.1 + 0.2 ≈ 0.30000000000000004 nên khác 0.3.
- **object NaN false** (Sai): typeof NaN là "number" chứ không phải "NaN"; NaN là một giá trị đặc biệt thuộc kiểu number.
- **object number true** (Sai): Sai dòng cuối: do sai số dấu chấm động IEEE-754, 0.1 + 0.2 cho 0.30000000000000004 nên so sánh ra false.
- **null NaN true** (Sai): typeof trả về chuỗi tên kiểu chứ không phải chính giá trị; và phép cộng float không bằng đúng 0.3.

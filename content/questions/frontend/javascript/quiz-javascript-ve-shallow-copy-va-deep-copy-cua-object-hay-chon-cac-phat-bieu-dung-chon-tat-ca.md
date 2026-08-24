---
id: quiz-javascript-ve-shallow-copy-va-deep-copy-cua-object-hay-chon-cac-phat-bieu-dung-chon-tat-ca
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Về shallow copy và deep copy của object, hãy chọn các phát biểu ĐÚNG. (chọn tất cả đáp án đúng)

## Đáp án trắc nghiệm
- [x] Shallow copy chỉ sao chép cấp một; các thuộc tính lồng nhau (object/array con) vẫn chia sẻ tham chiếu với bản gốc
- [ ] JSON.parse(JSON.stringify(obj)) là cách deep copy an toàn cho mọi kiểu dữ liệu

## Giải thích (VI)
Shallow copy (spread {...obj}, Object.assign) chỉ sao chép cấp một; object/array lồng bên trong vẫn dùng chung tham chiếu . Deep copy (ưu tiên structuredClone) nhân bản đệ quy nên độc lập hoàn toàn. Lưu ý JSON.parse(JSON.stringify()) mất function/undefined/Date/Map và hỏng với circular reference.

### Giải thích các phương án:
- **Shallow copy chỉ sao chép cấp một; các thuộc tính lồng nhau (object/array con) vẫn chia sẻ tham chiếu với bản gốc** (Đúng): Đúng: shallow copy chỉ tách rời cấp một, còn object con bên trong vẫn dùng chung tham chiếu với bản gốc.
- **JSON.parse(JSON.stringify(obj)) là cách deep copy an toàn cho mọi kiểu dữ liệu** (Sai): Sai: cách này mất function, undefined, biến Date thành chuỗi, không xử lý Map/Set, và ném lỗi với circular reference.

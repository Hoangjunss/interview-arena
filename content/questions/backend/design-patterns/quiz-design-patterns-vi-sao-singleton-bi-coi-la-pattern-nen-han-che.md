---
id: quiz-design-patterns-vi-sao-singleton-bi-coi-la-pattern-nen-han-che
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Singleton bị coi là pattern nên hạn chế?

## Đáp án trắc nghiệm
- [ ] Nó không hoạt động được trong môi trường có nhiều luồng chạy
- [ ] Nó tốn bộ nhớ vì đối tượng không bao giờ được giải phóng
- [ ] Nó vi phạm nguyên tắc đơn nhiệm của một lớp
- [x] Nó là trạng thái toàn cục ẩn nên khó test

## Giải thích (VI)
Nó là trạng thái toàn cục ẩn : hàm dùng singleton không khai phụ thuộc đó trong tham số, nên đọc chữ ký hàm không biết nó phụ thuộc gì. Test cũng khó vì trạng thái còn sót từ test trước.

### Giải thích các phương án:
- **Nó không hoạt động được trong môi trường có nhiều luồng chạy** (Sai): Có thể làm đúng với đồng bộ hoá, và không phải lý do chính.
- **Nó tốn bộ nhớ vì đối tượng không bao giờ được giải phóng** (Sai): Một đối tượng sống lâu không phải vấn đề đáng kể.
- **Nó vi phạm nguyên tắc đơn nhiệm của một lớp** (Sai): Có phần đúng (lớp tự quản vòng đời của mình) nhưng không phải vấn đề lớn nhất.
- **Nó là trạng thái toàn cục ẩn nên khó test** (Đúng): Test này ảnh hưởng test khác qua trạng thái dùng chung, và phụ thuộc bị che đi.

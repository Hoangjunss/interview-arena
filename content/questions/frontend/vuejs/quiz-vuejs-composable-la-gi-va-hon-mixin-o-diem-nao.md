---
id: quiz-vuejs-composable-la-gi-va-hon-mixin-o-diem-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composable là gì và hơn mixin ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Composable là một component không có phần template
- [ ] Composable chỉ chứa được hàm thuần, không giữ được state
- [x] Hàm đóng gói logic có state; nguồn gốc mỗi biến rõ ràng tại chỗ gọi
- [ ] Mixin an toàn hơn vì Vue tự cảnh báo mỗi khi có trùng tên thuộc tính

## Giải thích (VI)
Composable là hàm dùng Composition API để gói một mảng logic có state (useCounter, useFetch, useLocalStorage) và trả về những gì component cần. Khác mixin: mọi thứ đến từ chỗ gọi tường minh (const { count } = useCounter()), đổi tên được khi trùng, nhận tham số, và gọi nhiều lần cho nhiều instance độc lập.

### Giải thích các phương án:
- **Composable là một component không có phần template** (Sai): Composable là hàm thường, không phải component.
- **Composable chỉ chứa được hàm thuần, không giữ được state** (Sai): Composable giữ state bằng ref/reactive — đó là mục đích chính.
- **Hàm đóng gói logic có state; nguồn gốc mỗi biến rõ ràng tại chỗ gọi** (Đúng): Đúng: composable là hàm dùng Composition API, trả về đúng những gì cần. Khác mixin, nguồn gốc của mỗi biến tường minh tại chỗ gọi, đổi tên được khi destructure nên không có xung đột tên ngầm.
- **Mixin an toàn hơn vì Vue tự cảnh báo mỗi khi có trùng tên thuộc tính** (Sai): Trùng tên trong mixin bị gộp theo quy tắc merge, thường im lặng và khó lần ra.

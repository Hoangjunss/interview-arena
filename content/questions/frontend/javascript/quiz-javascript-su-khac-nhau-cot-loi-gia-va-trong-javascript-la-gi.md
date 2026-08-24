---
id: quiz-javascript-su-khac-nhau-cot-loi-gia-va-trong-javascript-la-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau cốt lõi giữa == và === trong JavaScript là gì?

## Đáp án trắc nghiệm
- [ ] Không có khác biệt, chỉ là hai cách viết của cùng một phép toán
- [ ] === nhanh hơn nên luôn cho kết quả khác ==
- [ ] == so sánh tham chiếu, === so sánh giá trị
- [x] == so sánh có ép kiểu, === so sánh cả giá trị lẫn kiểu

## Giải thích (VI)
== ép kiểu hai toán hạng về cùng kiểu rồi mới so sánh (0 == "" → true), còn === so sánh nghiêm ngặt cả giá trị lẫn kiểu, không ép kiểu (0 === "" → false). Thực hành phổ biến là ưu tiên === để tránh kết quả bất ngờ.

### Giải thích các phương án:
- **Không có khác biệt, chỉ là hai cách viết của cùng một phép toán** (Sai): 0 == "" là true nhưng 0 === "" là false — chúng khác nhau rõ rệt.
- **=== nhanh hơn nên luôn cho kết quả khác ==** (Sai): Tốc độ không phải khác biệt ngữ nghĩa; với hai toán hạng cùng kiểu, == và === cho cùng kết quả.
- **== so sánh tham chiếu, === so sánh giá trị** (Sai): Cả hai đều so sánh giá trị với primitive và tham chiếu với object; điểm khác biệt là ép kiểu, không phải reference vs value.
- **== so sánh có ép kiểu, === so sánh cả giá trị lẫn kiểu** (Đúng): == chuyển hai toán hạng về cùng kiểu trước khi so sánh; === yêu cầu cùng kiểu và cùng giá trị, không ép kiểu. Vì vậy '1' == 1 cho true còn '1' === 1 cho false.

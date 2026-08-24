---
id: quiz-typescript-khai-bao-const-pair-string-number-khac-gi-so-voi-const-arr-string-number
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo const pair: [string, number] khác gì so với const arr: (string | number)[]?

## Đáp án trắc nghiệm
- [x] Tuple cố định số lượng và kiểu theo từng vị trí; array thì không
- [ ] Tuple là cấu trúc dữ liệu riêng tại runtime, không phải array JavaScript
- [ ] Hai cách viết tương đương — tuple chỉ là cú pháp gọn hơn cho array của union
- [ ] Tuple bắt buộc mọi phần tử cùng kiểu, array mới cho phép trộn kiểu

## Giải thích (VI)
Tuple [string, number] cố định độ dài 2 và kiểu theo từng vị trí: index 0 là string, index 1 là number — sai thứ tự hoặc thừa phần tử đều lỗi compile. Array (string | number)[] nhận độ dài bất kỳ, mỗi phần tử là một trong hai kiểu. Tuple hợp cho cặp giá trị có cấu trúc: toạ độ, cặp key-value, return của useState.

### Giải thích các phương án:
- **Tuple cố định số lượng và kiểu theo từng vị trí; array thì không** (Đúng): Array nhận số lượng bất kỳ, mỗi phần tử là string hoặc number tuỳ ý. Tuple là "array có cấu trúc": đúng độ dài, đúng kiểu theo vị trí — [25, "age"] hay ["age", 25, true] đều lỗi. Array chỉ ràng buộc kiểu phần tử, không ràng buộc vị trí hay độ dài. Mảng nhận số lượng phần tử bất kỳ và mỗi phần tử chỉ cần thuộc union các kiểu đã khai báo.
- **Tuple là cấu trúc dữ liệu riêng tại runtime, không phải array JavaScript** (Sai): Tuple chỉ tồn tại ở type level; sau khi compile nó là array JavaScript bình thường — JS không có khái niệm tuple.
- **Hai cách viết tương đương — tuple chỉ là cú pháp gọn hơn cho array của union** (Sai): Không tương đương: gán ["age", 25] đảo thành [25, "age"] hợp lệ với array nhưng lỗi với tuple vì sai kiểu theo vị trí.
- **Tuple bắt buộc mọi phần tử cùng kiểu, array mới cho phép trộn kiểu** (Sai): Ngược lại — điểm mạnh của tuple chính là mỗi vị trí một kiểu khác nhau ([string, number]); array đồng nhất mới ràng mọi phần tử về một kiểu.

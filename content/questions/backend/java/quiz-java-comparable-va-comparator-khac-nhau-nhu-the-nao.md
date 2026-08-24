---
id: quiz-java-comparable-va-comparator-khac-nhau-nhu-the-nao
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Comparable và Comparator khác nhau như thế nào?

## Đáp án trắc nghiệm
- [ ] Class đã implement Comparable thì không thể sắp xếp bằng Comparator được nữa
- [x] Comparable: compareTo() bên trong class, một thứ tự tự nhiên; Comparator: định nghĩa bên ngoài
- [ ] Comparator phải được implement bên trong class cần sắp xếp, còn Comparable truyền từ ngoài vào dưới dạng lambda
- [ ] Collections.sort(list) hoạt động với mọi kiểu phần tử, kể cả khi không có Comparable lẫn Comparator

## Giải thích (VI)
Comparable: implement compareTo() ngay trong class, cho MỘT thứ tự tự nhiên (String, Integer, LocalDate đều có). Comparator: định nghĩa bên ngoài qua class riêng hoặc lambda, cho NHIỀU thứ tự tuỳ ngữ cảnh, dùng được cả khi không sửa được class gốc. Comparator ghi đè được thứ tự tự nhiên: list.sort(comparator). Java 8+ có helper chain: comparing(), thenComparing(), reversed().

### Giải thích các phương án:
- **Class đã implement Comparable thì không thể sắp xếp bằng Comparator được nữa** (Sai): Comparator luôn dùng được để GHI ĐÈ thứ tự tự nhiên — list.sort(comparator) bỏ qua compareTo; hai cơ chế bổ sung nhau chứ không loại trừ.
- **Comparable: compareTo() bên trong class, một thứ tự tự nhiên; Comparator: định nghĩa bên ngoài** (Đúng): Đúng: Comparable = "class tự biết thứ tự của mình" (String, Integer, LocalDate); Comparator = strategy truyền từ ngoài (class riêng hoặc lambda), cho nhiều cách sắp xếp mà không sửa class gốc.
- **Comparator phải được implement bên trong class cần sắp xếp, còn Comparable truyền từ ngoài vào dưới dạng lambda** (Sai): Phát biểu hoán đổi vai trò hai interface: compareTo() của Comparable mới nằm trong class; Comparator mới là bên thứ ba truyền vào (thường là lambda).
- **Collections.sort(list) hoạt động với mọi kiểu phần tử, kể cả khi không có Comparable lẫn Comparator** (Sai): Collections.sort(list) không tham số yêu cầu phần tử implement Comparable — kiểu không có thứ tự tự nhiên sẽ không biên dịch được lời gọi này.

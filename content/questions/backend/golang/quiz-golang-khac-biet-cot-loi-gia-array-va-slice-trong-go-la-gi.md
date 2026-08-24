---
id: quiz-golang-khac-biet-cot-loi-gia-array-va-slice-trong-go-la-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa array và slice trong Go là gì?

## Đáp án trắc nghiệm
- [x] Array có độ dài cố định thuộc về kiểu; slice là view động trên mảng nền
- [ ] Slice có độ dài cố định còn array thì co giãn được
- [ ] Array và slice giống hệt nhau, chỉ khác tên gọi
- [ ] Array được cấp phát trên heap còn slice luôn nằm trên stack

## Giải thích (VI)
Array [N]T có độ dài N là một phần của kiểu, được copy theo giá trị khi gán/truyền hàm. Slice là struct nhẹ gồm con trỏ tới backing array, len và cap; nó là "cửa sổ" động tham chiếu, co giãn qua append và chia sẻ dữ liệu với slice khác cùng backing array. Trong thực tế Go dùng slice gần như mọi lúc.

### Giải thích các phương án:
- **Array có độ dài cố định thuộc về kiểu; slice là view động trên mảng nền** (Đúng): [3]int và [4]int là hai kiểu khác nhau; gán/truyền array là copy toàn bộ. Slice là struct gồm pointer, length, capacity trỏ vào backing array, nên chia sẻ dữ liệu và co giãn được. Slice gồm pointer + len + cap nên chia sẻ dữ liệu và co giãn được, còn array bị copy theo giá trị.
- **Slice có độ dài cố định còn array thì co giãn được** (Sai): Ngược lại: array cố định độ dài (thuộc kiểu), còn slice mới là thứ co giãn được qua append.
- **Array và slice giống hệt nhau, chỉ khác tên gọi** (Sai): Chúng khác nhau căn bản: array cố định độ dài và copy theo giá trị; slice là tham chiếu động vào backing array.
- **Array được cấp phát trên heap còn slice luôn nằm trên stack** (Sai): Nơi cấp phát do escape analysis quyết định, không phải quy tắc cố định; cả array lẫn backing array của slice đều có thể nằm stack hoặc heap tuỳ trường hợp.

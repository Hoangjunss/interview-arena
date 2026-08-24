---
id: quiz-java-phat-bieu-nao-sau-day-sai-ve-cach-hashmap-hoat-dong-ben-trong
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về cách HashMap hoạt động bên trong?

## Đáp án trắc nghiệm
- [ ] Từ Java 8, bucket dài quá ngưỡng 8 được chuyển thành red-black tree
- [ ] Vượt capacity × load factor (0.75) thì mảng bucket được nhân đôi
- [ ] Entry vào bucket theo hashCode(); cùng bucket thì so equals() để phân biệt
- [ ] Sửa field của key làm đổi hashCode sau khi put thì gần như không tìm lại được entry
- [x] HashMap bảo đảm duyệt các key theo đúng thứ tự chúng được put vào

## Giải thích (VI)
HashMap dùng mảng bucket: hashCode() của key định vị bucket, collision được giải quyết bằng linked list và so equals(). Java 8+ chuyển list dài quá 8 thành red-black tree (O(log n)). Vượt capacity × 0.75 thì mảng nhân đôi và phân bổ lại. HashMap không giữ thứ tự chèn, và key bị sửa đổi hashCode sau khi put sẽ làm entry thất lạc — key nên immutable.

### Giải thích các phương án:
- **Từ Java 8, bucket dài quá ngưỡng 8 được chuyển thành red-black tree** (Sai): Phát biểu đúng: treeify là cải tiến của Java 8, cho lookup worst case O(log n).
- **Vượt capacity × load factor (0.75) thì mảng bucket được nhân đôi** (Sai): Phát biểu đúng: resize giữ tỉ lệ lấp đầy thấp để collision hiếm.
- **Entry vào bucket theo hashCode(); cùng bucket thì so equals() để phân biệt** (Sai): Phát biểu đúng: hashCode() định vị bucket, equals() tìm đúng entry trong bucket.
- **Sửa field của key làm đổi hashCode sau khi put thì gần như không tìm lại được entry** (Sai): Phát biểu đúng: entry vẫn nằm ở bucket cũ trong khi lookup lại tính ra bucket mới.
- **HashMap bảo đảm duyệt các key theo đúng thứ tự chúng được put vào** (Đúng): Đây là chỗ sai: HashMap không có thứ tự duyệt xác định — muốn giữ thứ tự chèn phải dùng LinkedHashMap.

---
id: quiz-html-css-voi-ba-the-script-sau-trong-head-phat-bieu-nao-dung
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với ba thẻ script sau trong <head>, phát biểu nào đúng?

## Đáp án trắc nghiệm
- [ ] defer khiến script chỉ chạy sau sự kiện load của window (mọi ảnh/CSS đã tải xong)
- [x] b.js và c.js chạy đúng thứ tự sau khi parse xong; a.js chạy ngay khi tải xong
- [ ] Cả ba đều chặn (block) việc parse HTML cho đến khi tải và chạy xong
- [ ] Cả ba luôn chạy theo đúng thứ tự xuất hiện: a → b → c

## Giải thích (VI)
Cả async và defer đều tải song song, không chặn parse HTML. Khác nhau ở thời điểm chạy: async chạy ngay khi tải xong (thứ tự không đảm bảo — hợp cho analytics độc lập); defer chờ HTML parse xong, chạy trước DOMContentLoaded và giữ đúng thứ tự các thẻ — nên b.js luôn chạy trước c.js. Cả hai chỉ có tác dụng với script external.

### Giải thích các phương án:
- **defer khiến script chỉ chạy sau sự kiện load của window (mọi ảnh/CSS đã tải xong)** (Sai): Script defer chạy sau khi parse xong DOM và trước DOMContentLoaded, không đợi tới load (sự kiện chờ toàn bộ tài nguyên).
- **b.js và c.js chạy đúng thứ tự sau khi parse xong; a.js chạy ngay khi tải xong** (Đúng): defer xếp hàng theo thứ tự tài liệu và chờ parse xong; async thực thi ngay lúc tải xong nên có thể chen vào bất kỳ thời điểm nào. Hai script defer chạy trước DOMContentLoaded, còn async không đảm bảo thời điểm.
- **Cả ba đều chặn (block) việc parse HTML cho đến khi tải và chạy xong** (Sai): Chặn parse là hành vi của script thường không thuộc tính; cả async lẫn defer đều tải song song với parse, không chặn tải.
- **Cả ba luôn chạy theo đúng thứ tự xuất hiện: a → b → c** (Sai): async không tham gia hàng đợi thứ tự — a.js có thể chạy trước, giữa, hoặc sau cặp defer tùy tốc độ tải.

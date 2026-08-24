---
id: quiz-php-goi-cachegetkey-trong-laravel-cache-thuc-chat-la-gi
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi Cache::get('key') trong Laravel — Cache thực chất là gì?

## Đáp án trắc nghiệm
- [ ] Class chứa các method static thao tác cache trực tiếp
- [x] Facade — proxy tĩnh tới service cache trong container
- [ ] Helper function toàn cục được alias thành cú pháp class
- [ ] Trait được mixin vào mọi class của ứng dụng

## Giải thích (VI)
Facade là proxy tĩnh tới một service trong container. Cache::get() không phải static method thật: magic method __callStatic bắt lời gọi, resolve service cache từ container (qua key trong getFacadeAccessor()), rồi gọi get() trên instance đó. Cú pháp trông static nhưng phía dưới là object bình thường.

### Giải thích các phương án:
- **Class chứa các method static thao tác cache trực tiếp** (Sai): Facade không chứa logic; method static thật sẽ khó swap khi test.
- **Facade — proxy tĩnh tới service cache trong container** (Đúng): callStatic chuyển lời gọi tới instance được resolve từ container.
- **Helper function toàn cục được alias thành cú pháp class** (Sai): Facade là class thật kế thừa lớp Facade cơ sở, không phải alias hàm.
- **Trait được mixin vào mọi class của ứng dụng** (Sai): Không có cơ chế mixin toàn cục nào như vậy trong Laravel.

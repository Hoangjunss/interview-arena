---
id: quiz-vuejs-phat-bieu-nao-sau-day-sai-ve-ref-va-reactive
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về ref và reactive?

## Đáp án trắc nghiệm
- [ ] Destructure object reactive lấy primitive sẽ mất reactive, trừ khi dùng toRefs
- [ ] reactive chỉ nhận object/array/Map/Set, không dùng được cho số hay chuỗi
- [ ] ref dùng được cho cả primitive lẫn object, truy cập qua .value trong script
- [x] Trong template thì vẫn phải viết .value mỗi khi đọc giá trị của một ref

## Giải thích (VI)
ref bọc mọi loại giá trị và truy cập bằng .value trong script (template tự bóc ở cấp cao nhất). reactive chỉ nhận object và trả về proxy sâu, không cần .value. Điểm dễ vấp: gán lại toàn bộ một object reactive (state = {...}) làm mất kết nối, và destructuring trường primitive cũng mất reactivity — dùng toRefs() khi cần tách.

### Giải thích các phương án:
- **Destructure object reactive lấy primitive sẽ mất reactive, trừ khi dùng toRefs** (Sai): Phát biểu đúng: giá trị được sao chép ra biến thường, không còn liên hệ với proxy.
- **reactive chỉ nhận object/array/Map/Set, không dùng được cho số hay chuỗi** (Sai): Phát biểu đúng: Proxy cần một object để bọc nên reactive không nhận primitive.
- **ref dùng được cho cả primitive lẫn object, truy cập qua .value trong script** (Sai): Phát biểu đúng: ref bọc giá trị trong một object có getter/setter value.
- **Trong template thì vẫn phải viết .value mỗi khi đọc giá trị của một ref** (Đúng): Đây là chỗ sai: ref ở cấp cao nhất được tự bóc trong template — viết {{ count }} là đủ.

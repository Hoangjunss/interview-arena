---
id: quiz-react-input-trong-component-sau-la-controlled-hay-uncontrolled-va-vi-sao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Input trong component sau là controlled hay uncontrolled, và vì sao?

## Đáp án trắc nghiệm
- [ ] Chỉ được coi là controlled khi input nằm trong thẻ form có onSubmit
- [ ] Uncontrolled — vì người dùng vẫn gõ trực tiếp vào DOM input như HTML thường
- [x] Controlled — giá trị hiển thị do React state quyết định qua prop value
- [ ] Uncontrolled — vì component không dùng ref để đọc giá trị input

## Giải thích (VI)
Đây là controlled component: prop value gắn giá trị hiển thị vào React state, và onChange là con đường duy nhất cập nhật nó — state là nguồn sự thật. Uncontrolled thì ngược lại: DOM tự giữ giá trị, React chỉ đọc ra khi cần qua ref (thường kết hợp defaultValue).

### Giải thích các phương án:
- **Chỉ được coi là controlled khi input nằm trong thẻ form có onSubmit** (Sai): Controlled/uncontrolled là thuộc tính của từng input (value + onChange), không phụ thuộc việc có thẻ form bọc ngoài hay không.
- **Uncontrolled — vì người dùng vẫn gõ trực tiếp vào DOM input như HTML thường** (Sai): Việc user gõ vào đâu không quyết định — điểm mấu chốt là giá trị hiển thị lấy từ state (value={query}), nên đây là controlled.
- **Controlled — giá trị hiển thị do React state quyết định qua prop value** (Đúng): DOM không tự giữ giá trị riêng, mọi thay đổi phải đi qua onChange → setQuery. Đúng: cặp value + onChange đưa React state thành nguồn sự thật duy nhất của input — định nghĩa của controlled component. DOM không tự giữ giá trị riêng: mọi thay đổi phải đi qua onChange rồi setQuery.
- **Uncontrolled — vì component không dùng ref để đọc giá trị input** (Sai): Ngược lại: uncontrolled mới cần ref để đọc giá trị từ DOM; controlled đọc thẳng từ state nên không cần ref.

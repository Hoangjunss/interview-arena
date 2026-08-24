---
id: quiz-vuejs-trong-template-duoi-day-moi-directive-lam-gi
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong template dưới đây, mỗi directive làm gì?

## Đáp án trắc nghiệm
- [ ] : và @ là cú pháp riêng của JSX, Vue không hỗ trợ
- [ ] v-model chỉ đọc giá trị từ state ra input chứ không ghi ngược lại vào state
- [ ] v-if chỉ ẩn phần tử bằng CSS, phần tử vẫn nằm trong DOM
- [x] : = v-bind, @ = v-on, v-model two-way, v-if render có điều kiện

## Giải thích (VI)
v-bind (rút gọn :) gán giá trị JavaScript vào attribute hoặc prop. v-on (rút gọn @) lắng nghe sự kiện. v-model là hai chiều cho input và component. v-if/v-else render có điều kiện, v-show chỉ bật tắt display. v-for lặp danh sách và cần :key.

### Giải thích các phương án:
- **: và @ là cú pháp riêng của JSX, Vue không hỗ trợ** (Sai): Đây là cú pháp rút gọn chuẩn của Vue cho v-bind và v-on.
- **v-model chỉ đọc giá trị từ state ra input chứ không ghi ngược lại vào state** (Sai): v-model là hai chiều: gõ vào input sẽ cập nhật state.
- **v-if chỉ ẩn phần tử bằng CSS, phần tử vẫn nằm trong DOM** (Sai): Đó là v-show; v-if thực sự thêm/bớt phần tử khỏi DOM.
- **: = v-bind, @ = v-on, v-model two-way, v-if render có điều kiện** (Đúng): Đúng: bốn directive nền tảng và hai dạng rút gọn quen thuộc — v-bind gán giá trị vào attribute/prop, v-on lắng nghe sự kiện.

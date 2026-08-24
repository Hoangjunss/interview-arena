---
id: quiz-vuejs-trong-composition-api-created-va-beforecreate-tuong-ung-voi-cai-gi
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Composition API, created và beforeCreate tương ứng với cái gì?

## Đáp án trắc nghiệm
- [ ] onCreated và onBeforeCreate — chỉ đổi tên có tiền tố on
- [ ] onMounted — vì mount xảy ra ngay sau created
- [x] Chính phần thân của setup, chạy ở thời điểm tương đương nên không có hook riêng
- [ ] Không có gì tương ứng; phải quay lại Options API nếu cần chạy code lúc khởi tạo component

## Giải thích (VI)
Thân hàm setup chạy đúng ở giai đoạn của beforeCreate/created, nên hai hook đó không có bản on*. Các hook khác thêm tiền tố on: onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, cùng onErrorCaptured. Chúng phải được gọi đồng bộ ở cấp cao nhất của setup để Vue biết gắn vào component nào.

### Giải thích các phương án:
- **onCreated và onBeforeCreate — chỉ đổi tên có tiền tố on** (Sai): Vue không cung cấp hai hook này trong Composition API.
- **onMounted — vì mount xảy ra ngay sau created** (Sai): onMounted chạy sau khi DOM đã gắn, muộn hơn created đáng kể.
- **Chính phần thân của setup, chạy ở thời điểm tương đương nên không có hook riêng** (Đúng): Đúng: setup chạy trước khi tạo instance hoàn chỉnh nên thay vai trò của cả hai hook đó. Các hook còn lại đổi tên thành onMounted, onUpdated, onUnmounted...
- **Không có gì tương ứng; phải quay lại Options API nếu cần chạy code lúc khởi tạo component** (Sai): Không cần: code ở thân setup chính là chỗ đó.

---
id: quiz-vuejs-v-model-tren-mot-component-tu-viet-duoc-bien-dich-thanh-gi
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
v-model trên một component tự viết được biên dịch thành gì?

## Đáp án trắc nghiệm
- [ ] Một tham chiếu chung khiến cha và con cùng trỏ tới một biến, sửa bên nào cũng đổi
- [ ] Một store toàn cục ngầm do Vue tạo ra cho mỗi component
- [ ] Một lời gọi trực tiếp tới document.querySelector để đọc giá trị input
- [x] Một prop modelValue truyền xuống cộng sự kiện update:modelValue phát lên

## Giải thích (VI)
v-model trên component là đường cú pháp cho prop modelValue và sự kiện update:modelValue. Con nhận giá trị qua prop và gọi emit("update:modelValue", giá trị mới) khi muốn đổi. Nhiều v-model trên cùng component thì đặt tên: v-model:title ứng với prop title và sự kiện update:title. Vue 3.4 trở đi có macro defineModel() viết gọn hơn.

### Giải thích các phương án:
- **Một tham chiếu chung khiến cha và con cùng trỏ tới một biến, sửa bên nào cũng đổi** (Sai): Không có biến dùng chung; dữ liệu vẫn đi một chiều xuống và sự kiện đi lên.
- **Một store toàn cục ngầm do Vue tạo ra cho mỗi component** (Sai): Không có store nào được tạo; đây thuần là prop và event.
- **Một lời gọi trực tiếp tới document.querySelector để đọc giá trị input** (Sai): v-model không thao tác DOM trực tiếp như vậy.
- **Một prop modelValue truyền xuống cộng sự kiện update:modelValue phát lên** (Đúng): Đúng: two-way binding chỉ là đường cú pháp của cặp prop + event — component con nhận giá trị qua prop và tự emit khi muốn đổi.

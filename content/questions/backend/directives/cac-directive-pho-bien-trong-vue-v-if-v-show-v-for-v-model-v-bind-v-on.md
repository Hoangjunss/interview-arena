---
id: cac-directive-pho-bien-trong-vue-v-if-v-show-v-for-v-model-v-bind-v-on
position: backend
technology: directives
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các directive phổ biến trong Vue: v-if, v-show, v-for, v-model, v-bind, v-on?

## Question (EN)
Common Vue directives: v-if, v-show, v-for, v-model, v-bind, v-on?

## Đáp án chi tiết (VI)
Vue directives là các HTML attribute đặc biệt gắn kết reactive behavior vào DOM. Phổ biến nhất: `v-if`/`v-else`/`v-else-if`: điều kiện render, xóa/tạo DOM thật. `v-show`: ẩn bằng `display:none`, DOM vẫn tồn tại. `v-for`: loop render, luôn cần `:key`. `v-model`: two-way binding cho input. `v-bind` (`:attr`): bind attribute động. `v-on` (`@event`): gắn event listener. Lưu ý: v-if và v-for không nên dùng trên cùng element — v-if ưu tiên cao hơn v-for trong Vue 3 (ngược với Vue 2), dùng `\u003ctemplate v-for\u003e` bọc bên ngoài.

## Detailed Answer (EN)
Vue directives are special HTML attributes that bind reactive behavior to the DOM. Commonly used: `v-if`/`v-else`/`v-else-if`: conditional render, creates/destroys DOM. `v-show`: hides via `display:none`, DOM stays. `v-for`: loop render, always requires `:key`. `v-model`: two-way binding for inputs. `v-bind` (`:attr`): dynamic attribute binding. `v-on` (`@event`): attaches event listeners. Pitfall: never use `v-if` and `v-for` on the same element — in Vue 3 `v-if` has higher priority (opposite of Vue 2); wrap with `\u003ctemplate v-for\u003e` instead.

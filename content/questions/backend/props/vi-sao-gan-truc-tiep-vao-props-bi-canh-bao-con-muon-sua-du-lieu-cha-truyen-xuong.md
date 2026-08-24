---
id: vi-sao-gan-truc-tiep-vao-props-bi-canh-bao-con-muon-sua-du-lieu-cha-truyen-xuong
position: backend
technology: props
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao gán trực tiếp vào `props` bị cảnh báo? Con muốn sửa dữ liệu cha truyền xuống thì làm thế nào?

## Question (EN)
Why does assigning to a `prop` trigger a warning? How should a child modify data passed from the parent?

## Đáp án chi tiết (VI)
Vue áp dụng **one-way data flow**: props chỉ chảy từ cha xuống con. Gán `props.title = ...` sẽ bị Vue cảnh báo (và ở chế độ dev là lỗi) vì mỗi lần cha re-render, giá trị đó bị ghi đè lại — sửa ở con là thay đổi sẽ mất và luồng dữ liệu trở nên khó truy vết.\
\
Ba cách xử lý tuỳ mục đích:\
\
```js\
const props = defineProps({ title: String, items: Array })\
const emit = defineEmits(['update:title'])\
\
// 1. prop chỉ là giá trị khởi tạo → copy sang local state\
const draft = ref(props.title)\
\
// 2. cần biến đổi để hiển thị → computed\
const upper = computed(() =\u003e props.title.toUpperCase())\
\
// 3. cần cha đổi theo → emit ngược lên (v-model pattern)\
function rename(next) { emit('update:title', next) }\
```\
\
**Lưu ý:** với prop là object/array, Vue chỉ chặn gán lại chính prop đó, **không** chặn sửa thuộc tính bên trong (`props.items.push(x)` vẫn chạy). Nhưng đó là mutate state của cha từ xa — nên tránh, thay bằng `emit` để cha tự quyết định.

## Detailed Answer (EN)
Vue enforces **one-way data flow**: props travel from parent to child only. Assigning `props.title = ...` triggers a Vue warning (a dev-mode error) because every parent re-render overwrites the value — the child's change is lost and the data flow becomes hard to trace.\
\
Three approaches depending on intent:\
\
```js\
const props = defineProps({ title: String, items: Array })\
const emit = defineEmits(['update:title'])\
\
// 1. prop is just an initial value → copy into local state\
const draft = ref(props.title)\
\
// 2. need a derived view of it → computed\
const upper = computed(() =\u003e props.title.toUpperCase())\
\
// 3. parent must follow the change → emit upward (v-model pattern)\
function rename(next) { emit('update:title', next) }\
```\
\
**Note:** for object/array props, Vue only blocks reassigning the prop itself, **not** mutating its contents (`props.items.push(x)` still runs). But that mutates the parent's state remotely — avoid it and `emit` instead so the parent decides.

---
id: debounce-va-throttle-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Debounce và throttle khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do debounce and throttle differ? When do you use each?

## Đáp án chi tiết (VI)
Cả hai giới hạn tần suất chạy một hàm bị kích hoạt liên tục, nhưng theo cách khác nhau:\
\
- **Debounce**: gom nhiều lần gọi thành một — **chỉ chạy sau khi ngừng kích hoạt** một khoảng `wait`. Mỗi lần gọi mới sẽ reset đồng hồ.\
  - Dùng cho: ô search gõ phím (chờ người dùng ngừng gõ), validate form, auto-save, xử lý `resize` khi hoàn tất.\
- **Throttle**: **chạy tối đa một lần mỗi khoảng thời gian**, dù kích hoạt bao nhiêu lần.\
  - Dùng cho: `scroll`, `mousemove`, kéo-thả, bắn sự kiện theo nhịp đều.\
\
Mẹo nhớ: *debounce* = \\"chờ yên rồi mới làm\\"; *throttle* = \\"làm đều tay theo nhịp\\".\
\
```js\
function debounce(fn, wait) {\
  let timer\
  return (...args) =\u003e {\
    clearTimeout(timer)\
    timer = setTimeout(() =\u003e fn(...args), wait)\
  }\
}\
```\
\
Cả hai đều dựa trên closure giữ `timer`. Nên có `cancel()` để dọn timer khi component unmount, tránh gọi trên state đã hủy.

## Detailed Answer (EN)
Both limit how often a rapidly-triggered function runs, but differently:\
\
- **Debounce**: collapse many calls into one — **run only after triggering stops** for `wait` ms. Each new call resets the timer.\
  - Use for: search-as-you-type (wait until the user pauses), form validation, auto-save, handling `resize` after it settles.\
- **Throttle**: **run at most once per interval**, no matter how often it fires.\
  - Use for: `scroll`, `mousemove`, drag, emitting events at a steady rate.\
\
Memory hook: *debounce* = \\"wait for quiet, then act\\"; *throttle* = \\"act at a steady beat\\".\
\
```js\
function debounce(fn, wait) {\
  let timer\
  return (...args) =\u003e {\
    clearTimeout(timer)\
    timer = setTimeout(() =\u003e fn(...args), wait)\
  }\
}\
```\
\
Both rely on a closure holding a `timer`. Provide a `cancel()` to clear the timer on component unmount and avoid acting on discarded state.

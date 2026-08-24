---
id: process-nexttick-khac-setimmediate-nhu-the-nao
position: backend
technology: async-\u0026-event-loop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
process.nextTick() khác setImmediate() như thế nào?

## Question (EN)
How does process.nextTick() differ from setImmediate()?

## Đáp án chi tiết (VI)
process.nextTick() chạy trước cả Promise microtasks (không thuộc event loop phase) — recursive nextTick sẽ starve I/O; dùng setImmediate() trong hầu hết cases. process.nextTick() không thuộc bất kỳ phase nào của event loop — callbacks được đặt vào nextTick queue và chạy ngay sau synchronous code hiện tại kết thúc, trước khi event loop tiếp tục phase tiếp theo (kể cả trước Promise microtasks). setImmediate() thuộc check phase. Thứ tự ưu tiên: synchronous code → nextTick queue → Promise microtasks → event loop phases (timers → poll → check/setImmediate). Starvation danger: recursive `process.nextTick()` sẽ block event loop mãi mãi — không bao giờ cho I/O callbacks chạy. Node.js docs khuyên dùng `setImmediate()` thay nextTick trong hầu hết trường hợp. Khi nextTick phù hợp: emit event sau "])</script><script>self.__next_f.push([1,"constructor return (để listener đăng ký kịp), propagate error asynchronously trong API mà phải consistent async. Khi setImmediate phù hợp: chia nhỏ heavy computation qua nhiều iterations mà vẫn cho I/O xen vào.

## Detailed Answer (EN)
$86

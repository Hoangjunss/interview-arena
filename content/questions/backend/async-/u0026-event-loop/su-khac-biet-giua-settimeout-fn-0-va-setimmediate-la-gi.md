---
id: su-khac-biet-giua-settimeout-fn-0-va-setimmediate-la-gi
position: backend
technology: async-\u0026-event-loop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa setTimeout(fn, 0) và setImmediate() là gì?

## Question (EN)
What is the difference between setTimeout(fn, 0) and setImmediate()?

## Đáp án chi tiết (VI)
Trong I/O callback context, setImmediate() LUÔN chạy trước setTimeout(fn, 0) — vì check phase đến trước timers phase sau poll; bên ngoài I/O context thứ tự không đảm bảo. setTimeout(fn, 0) thực ra là setTimeout(fn, 1) minimum — chạy trong timers phase nếu timer đã expired. setImmediate() chạy trong check phase (ngay sau poll phase). Ngoài I/O context (ví dụ main script): thứ tự giữa hai cái không đảm bảo — phụ thuộc vào system clock resolution và thời gian setup event loop. Trong I/O callback context: setImmediate() LUÔN chạy trước setTimeout(fn, 0) — vì I/O callback chạy ở poll phase, sau poll là check phase (setImmediate), sau đó mới quay lại timers phase. Ví dụ: `fs.readFile(file, () =\u003e { setImmediate(() =\u003e console.log('immediate')); setTimeout(() =\u003e console.log('timeout'), 0); })` — luôn in 'immediate' trước 'timeout'. Practical implication: khi muốn chạy code sau I/O operation hiện tại mà trước timers, dùng setImmediate.

## Detailed Answer (EN)
Inside an I/O callback, setImmediate() ALWAYS fires before setTimeout(fn, 0) — check phase comes before timers phase after poll; outside I/O context order is not guaranteed. setTimeout(fn, 0) is actually setTimeout(fn, 1) minimum — runs in the timers phase when the timer has expired. setImmediate() runs in the check phase (immediately after the poll phase). Outside an I/O context (e.g., in the main script): the order between the two is not guaranteed — depends on system clock resolution and event loop setup time. Inside an I/O callback context: setImmediate() ALWAYS runs before setTimeout(fn, 0) — because I/O callbacks run in the poll phase, and after poll comes the check phase (setImmediate), then timers. Example: `fs.readFile(file, () =\u003e { setImmediate(() =\u003e console.log('immediate')); setTimeout(() =\u003e console.log('timeout'), 0); })` — always prints 'immediate' before 'timeout'. Practical implication: when you want code to run after the current I/O operation but before any timers, use setImmediate.

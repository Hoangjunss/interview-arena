---
id: usedeferredvalue-khac-gi-debounce-da-co-usedebounce-tu-viet-roi-thi-can-no-nua-k
position: backend
technology: transitions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`useDeferredValue` khác gì debounce? Đã có `useDebounce` tự viết rồi thì cần nó nữa không?

## Question (EN)
How is `useDeferredValue` different from debouncing? If we already have a hand-rolled `useDebounce`, do we still need it?

## Đáp án chi tiết (VI)
Debounce **hoãn theo đồng hồ**; `useDeferredValue` **hoãn theo mức bận của máy**.\
\
| | debounce 300ms | `useDeferredValue` |\
|---|---|---|\
| Điều kiện chạy | hết 300ms không gõ thêm | React rảnh sau khi xong việc gấp |\
| Máy khoẻ | vẫn chờ đủ 300ms | cập nhật gần như ngay |\
| Máy yếu | vẫn 300ms rồi khựng dài | tự giãn ra, không khoá input |\
| Render dở khi có input mới | không biết, vẫn render tiếp | bị ngắt và bỏ đi |\
\
Điểm mấu chốt: debounce chỉ trì hoãn **thời điểm bắt đầu** render nặng — khi đã bắt đầu thì vẫn khoá main thread cho tới hết. `useDeferredValue` cho phép React **ngắt giữa chừng** để trả lời phím vừa gõ.\
\
Debounce vẫn cần cho việc **thật sự tốn kém bên ngoài**: gọi API, ghi localStorage, bắn analytics — ở đó mục tiêu là giảm số lần gọi, không phải giảm khựng render. Thực tế hay dùng cả hai: debounce cho request mạng, `useDeferredValue` cho phần lọc/vẽ tại client.

## Detailed Answer (EN)
Debounce delays **by the clock**; `useDeferredValue` delays **by how busy the machine is**.\
\
| | debounce 300ms | `useDeferredValue` |\
|---|---|---|\
| Trigger | 300ms with no new keystroke | React is idle after urgent work |\
| Fast device | still waits the full 300ms | updates almost immediately |\
| Slow device | 300ms and then a long freeze | stretches out, input stays free |\
| In-progress render on new input | unaware, keeps rendering | interrupted and discarded |\
\
The key point: debounce only delays **when the expensive render starts** — once started it still blocks the main thread to completion. `useDeferredValue` lets React **interrupt mid-render** to respond to the keystroke.\
\
Debounce is still needed for genuinely **external costs**: API calls, localStorage writes, analytics — there the goal is fewer calls, not smoother rendering. In practice both are used together: debounce the network request, defer the client-side filtering and painting.

---
id: re-render-co-dong-nghia-voi-viec-dom-bi-cap-nhat-khong-phan-biet-render-phase-va
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Re-render có đồng nghĩa với việc DOM bị cập nhật không? Phân biệt render phase và commit phase.

## Question (EN)
Does a re-render always mean the DOM is updated? Explain the render phase vs the commit phase.

## Đáp án chi tiết (VI)
Không. Một lần cập nhật đi qua hai giai đoạn tách biệt:\
\
- **Render phase** — React gọi hàm component, thu được cây element mới, rồi so sánh với cây trước đó. Giai đoạn này **thuần tính toán**, không chạm DOM, có thể bị React huỷ giữa chừng và chạy lại (concurrent rendering, `useTransition`). Vì vậy hàm component phải **thuần khiết**: không mutate biến ngoài, không gọi API trong thân hàm.\
- **Commit phase** — React ghi phần khác biệt vào DOM thật, cập nhật ref, rồi chạy các effect. Nếu kết quả render giống hệt lần trước, React **không đụng gì tới DOM**.\
\
```jsx\
function Clock({ time }) {\
  // render phase: only builds the element description\
  return \u003ch1\u003e{time}\u003c/h1\u003e\
}\
// commit phase: React writes the new text node, nothing else\
```\
\
Hệ quả thực tế khi debug: thấy component \\"render 200 lần\\" trong Profiler chưa chắc là vấn đề — cần xem thời gian render mỗi lần và số node DOM thực sự bị ghi lại. Chi phí đắt nằm ở tính toán nặng trong render và ở layout/paint của trình duyệt, không ở việc hàm được gọi lại.

## Detailed Answer (EN)
$88

---
id: concurrent-rendering-trong-react-18-nghia-la-gi-noi-render-co-the-bi-ngat-la-nga
position: backend
technology: concurrent
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Concurrent rendering trong React 18 nghĩa là gì? Nói \\"render có thể bị ngắt\\" là ngắt cái gì?

## Question (EN)
What does concurrent rendering in React 18 mean? When we say \\"rendering can be interrupted\\

## Đáp án chi tiết (VI)
Trước React 18, một lần render là **đồng bộ và không thể dừng**: React bắt đầu dựng cây component thì phải chạy hết mới trả quyền điều khiển lại cho trình duyệt. Cây lớn thì main thread bị chiếm, gõ phím hoặc click bị trễ.\
\
**Concurrent rendering** cho phép React **tạm dừng công việc render đang làm dở**, nhường main thread cho trình duyệt xử lý input/animation, rồi quay lại làm tiếp — hoặc **vứt bỏ** kết quả dở đó nếu dữ liệu đã đổi và render lại từ đầu.\
\
Hai điểm hay bị hiểu sai:\
- Nó **không tự động** làm mọi update thành ngắt được. Update thường vẫn là ưu tiên cao (urgent). Chỉ update được đánh dấu qua `startTransition` / `useTransition` / `useDeferredValue` hoặc do Suspense mới chạy ở chế độ ngắt được.\
- Vì render có thể chạy dở rồi bị bỏ, **render phase bắt buộc phải thuần khiết**: không gọi API, không sửa biến ngoài, không thao tác DOM trong thân component. Side effect đặt trong `useEffect` hoặc event handler.\
\
Để bật, ứng dụng phải dùng `createRoot` (React 18) thay cho `ReactDOM.render`.

## Detailed Answer (EN)
$7a

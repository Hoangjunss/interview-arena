---
id: effect-chay-hai-lan-o-moi-truong-dev-khien-api-bi-goi-doi-dong-nghiep-chan-bang
position: backend
technology: strictmode
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Effect chạy hai lần ở môi trường dev khiến API bị gọi đôi. Đồng nghiệp chặn bằng `useRef` cờ `didRun`. Bạn nhận xét thế nào?

## Question (EN)
An Effect runs twice in dev and calls the API twice. A teammate blocks it with a `useRef` `didRun` flag. What is your assessment?

## Đáp án chi tiết (VI)
Cách chặn bằng cờ ref chỉ **giấu triệu chứng**. Trong `StrictMode` ở dev, React cố tình mount → unmount → mount lại và chạy setup/cleanup hai lượt để **phát hiện effect thiếu cleanup**. Bản build production chỉ chạy một lần.\
\
Điều nó phơi ra: effect đó không **tự phục hồi được** khi bị chạy lại. Trong thực tế điều đó cũng xảy ra ngoài StrictMode — người dùng chuyển tab rồi quay lại, route đổi rồi trở về, Fast Refresh trong lúc dev.\
\
Sửa đúng là làm effect **idempotent bằng cleanup**:\
\
```jsx\
useEffect(() =\u003e {\
  const conn = createConnection(roomId)\
  conn.connect()\
  return () =\u003e conn.disconnect()   // second run starts from a clean state\
}, [roomId])\
```\
\
Với fetch, cleanup gọi `controller.abort()` hoặc bật cờ `ignore` cục bộ — request thứ hai vô hại vì chỉ đọc dữ liệu.\
\
Ngoại lệ đáng lưu ý: nếu hành động **không thể chạy hai lần** (tạo đơn hàng, gửi mail, trừ tiền) thì nó không nên nằm trong effect ngay từ đầu — chuyển sang event handler, và phía server thêm khoá idempotency.

## Detailed Answer (EN)
$83

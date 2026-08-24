---
id: goi-setstate-sau-khi-component-da-unmount-co-gay-memory-leak-khong-co-can-co-ism
position: backend
technology: cleanup
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi `setState` sau khi component đã unmount có gây memory leak không? Có cần cờ `isMounted` trong effect không?

## Question (EN)
Does calling `setState` after unmount leak memory? Do you still need an `isMounted` flag in effects?

## Đáp án chi tiết (VI)
Không cần cờ `isMounted`. Cảnh báo \\"Can't perform a React state update on an unmounted component\\" đã được **gỡ khỏi React 18** vì nó báo nhầm nhiều hơn báo đúng: gọi setter trên component đã unmount chỉ là **no-op**, bản thân nó không rò bộ nhớ.\
\
Thứ thật sự rò là **cái mà effect tạo ra nhưng không dọn**: subscription, timer, listener, hoặc request vẫn chạy và giữ tham chiếu.\
\
```jsx\
useEffect(() =\u003e {\
  const controller = new AbortController()\
  fetch(url, { signal: controller.signal })\
    .then((r) =\u003e r.json())\
    .then(setData)\
    .catch((e) =\u003e { if (e.name !== 'AbortError') setError(e) })\
\
  return () =\u003e controller.abort()   // clean up the real resource\
}, [url])\
```\
\
Cleanup ở đây làm hai việc: huỷ request đang bay khi unmount, và khi `url` đổi thì bỏ kết quả của request cũ — tránh response về muộn ghi đè response mới. Nếu không huỷ được request thì dùng cờ `ignore` cục bộ trong effect để bỏ qua kết quả, vẫn không phải cờ `isMounted` ở ngoài.

## Detailed Answer (EN)
$85

---
id: tooltip-do-chieu-cao-roi-tu-lat-len-tren-bi-nhap-nhay-mot-khung-hinh-dung-uselay
position: backend
technology: uselayouteffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tooltip đo chiều cao rồi tự lật lên trên bị nhấp nháy một khung hình. Dùng `useLayoutEffect` sửa được, nhưng SSR lại cảnh báo. Giải thích và xử lý.

## Question (EN)
A tooltip measures its height and flips upward, but flickers for one frame. `useLayoutEffect` fixes it, yet SSR now warns. Explain and resolve.

## Đáp án chi tiết (VI)
`useEffect` chạy **sau khi trình duyệt đã vẽ**, nên người dùng kịp thấy một khung hình tooltip ở vị trí sai rồi mới nhảy. `useLayoutEffect` chạy **sau khi DOM được cập nhật nhưng trước khi vẽ**, nên việc đo và chỉnh vị trí gộp vào cùng một khung hình.\
\
```jsx\
useLayoutEffect(() =\u003e {\
  const { height } = ref.current.getBoundingClientRect()\
  setFlipped(buttonTop \u003c height)   // measured before paint\
}, [])\
```\
\
Cảnh báo \\"useLayoutEffect does nothing on the server\\" xuất hiện vì trên server **không có DOM để đo và không có lượt vẽ nào**, nên React bỏ qua hook này và nhắc rằng markup ban đầu sẽ không có kết quả đo.\
\
Cách xử lý:\
\
- **Render nội dung ban đầu không cần đo** (ẩn tooltip, hoặc đặt vị trí mặc định) rồi để `useLayoutEffect` chỉnh sau khi hydrate. Cảnh báo mất và không lệch hydration.\
- Với component chỉ chạy phía client, tải động với `ssr: false`.\
- Chỉ dùng `useLayoutEffect` cho việc **đo đạc và điều chỉnh layout đồng bộ**. Nó chặn lượt vẽ, đặt logic nặng vào đây sẽ làm chậm hiển thị.

## Detailed Answer (EN)
$7a

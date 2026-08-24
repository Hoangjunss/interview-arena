---
id: fetch-du-lieu-trong-server-component-khac-gi-useeffect-fetch-o-client
position: backend
technology: data-fetching
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fetch dữ liệu trong Server Component khác gì `useEffect` + `fetch` ở client?

## Question (EN)
How does fetching data in a Server Component differ from `useEffect` + `fetch` on the client?

## Đáp án chi tiết (VI)
Trong Server Component, component là hàm `async` và `await` trực tiếp — dữ liệu đã có sẵn khi HTML được sinh ra.\
\
```tsx\
export default async function Page() {\
  const res = await fetch('https://api.example.com/posts', { next: { revalidate: 60 } })\
  const posts = await res.json()\
  return \u003cPostList posts={posts} /\u003e\
}\
```\
\
**Khác biệt chính so với `useEffect`:**\
\
- **Số vòng mạng**: client cần tải HTML → tải JS → hydrate → mới gọi API (waterfall). Server fetch xảy ra trước khi trả HTML, giảm một vòng.\
- **Không có trạng thái loading rỗng ban đầu**: HTML đã chứa nội dung, tốt cho SEO và LCP.\
- **Bảo mật**: API key, connection string nằm lại trên server, không lộ trong bundle.\
- **Vị trí gọi**: server gọi thẳng DB/API nội bộ mà không cần qua endpoint public.\
\
`useEffect` vẫn hợp lý cho dữ liệu **phụ thuộc tương tác** hoặc thay đổi liên tục theo phiên người dùng (polling, dữ liệu realtime sau khi trang đã mở). Với dữ liệu ban đầu của trang, mặc định nên fetch ở server.

## Detailed Answer (EN)
$83

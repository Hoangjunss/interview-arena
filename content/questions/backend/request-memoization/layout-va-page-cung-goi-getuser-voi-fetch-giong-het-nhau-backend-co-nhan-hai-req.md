---
id: layout-va-page-cung-goi-getuser-voi-fetch-giong-het-nhau-backend-co-nhan-hai-req
position: backend
technology: request-memoization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Layout và page cùng gọi `getUser()` với `fetch` giống hệt nhau. Backend có nhận hai request không?

## Question (EN)
A layout and a page both call `getUser()` with an identical `fetch`. Does the backend receive two requests?

## Đáp án chi tiết (VI)
Không, trong cùng một lượt render server chỉ có **một** request thực sự đi ra. Đây là **request memoization**: React ghi nhớ kết quả `fetch` theo (URL + options) trong suốt vòng đời của một request, các lời gọi sau lấy lại kết quả đã có.\
\
```tsx\
async function getUser(id: string) {\
  const res = await fetch(`https://api.example.com/users/${id}`)\
  return res.json()\
}\
\
// layout.tsx và page.tsx cùng gọi getUser('1') → backend chỉ nhận 1 request\
```\
\
Nhờ vậy không cần nâng dữ liệu lên component cha rồi khoan props xuống — cứ gọi ở nơi cần dùng.\
\
**Giới hạn cần nhớ:**\
- Chỉ áp dụng cho `fetch` với method `GET`, và chỉ trong **một** lượt render; request tiếp theo bắt đầu lại từ đầu.\
- Không áp dụng cho ORM/driver DB hay `axios`. Muốn có hành vi tương tự, bọc bằng `cache()` của React.\
- Options khác nhau (header khác) tính là key khác → vẫn gọi hai lần.\
\
Đây là tầng khác với **Data Cache** (tồn tại xuyên request, có `revalidate`) — memoization chỉ sống trong một lượt render.

## Detailed Answer (EN)
$86

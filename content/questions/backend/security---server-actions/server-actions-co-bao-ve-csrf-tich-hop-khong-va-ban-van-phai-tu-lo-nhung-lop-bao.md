---
id: server-actions-co-bao-ve-csrf-tich-hop-khong-va-ban-van-phai-tu-lo-nhung-lop-bao
position: backend
technology: security---server-actions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server Actions có bảo vệ CSRF tích hợp không, và bạn vẫn phải tự lo những lớp bảo mật nào?

## Question (EN)
Do Server Actions have built-in CSRF protection, and which security layers must you still handle yourself?

## Đáp án chi tiết (VI)
**Có, một phần.** Server Actions chỉ chấp nhận **POST** và Next.js kiểm tra **Origin header so với Host** — đây là lớp chống CSRF tích hợp, chặn form từ domain lạ gọi action của bạn.\
\
Nhưng đó **không phải authorization**. Mỗi Server Action là một **public HTTP endpoint** — bất kỳ ai biết ID action đều gọi được. Bạn vẫn phải:\
\
- **Auth/authz trong từng action:** kiểm tra session và quyền ngay đầu hàm, đừng giả định UI đã ẩn nút.\
```ts\
'use server'\
export async function deletePost(id: string) {\
  const session = await auth()\
  if (!session) throw new Error('Unauthorized')\
  if (!canDelete(session.user, id)) throw new Error('Forbidden')\
  // ...\
}\
```\
- **Validate input:** dùng Zod, đừng tin dữ liệu từ `formData`.\
- **Không leak data nhạy cảm** qua giá trị trả về.\
\
**Lưu ý:** dùng `allowedOrigins` trong config nếu app chạy sau proxy khiến Origin khác Host; và bật `taint` API để chặn vô tình truyền object server xuống client.

## Detailed Answer (EN)
**Yes, partially.** Server Actions only accept **POST** and Next.js checks the **Origin header against Host** — a built-in CSRF defense that blocks forms from foreign domains calling your action.\
\
But that's **not authorization**. Every Server Action is a **public HTTP endpoint** — anyone who knows the action ID can invoke it. You still must:\
\
- **Auth/authz inside each action:** check session and permissions at the top of the function; don't assume the UI hid the button.\
```ts\
'use server'\
export async function deletePost(id: string) {\
  const session = await auth()\
  if (!session) throw new Error('Unauthorized')\
  if (!canDelete(session.user, id)) throw new Error('Forbidden')\
  // ...\
}\
```\
- **Validate input:** use Zod; never trust `formData`.\
- **Don't leak sensitive data** through return values.\
\
**Note:** set `allowedOrigins` in config if a proxy makes Origin differ from Host; and enable the `taint` APIs to prevent accidentally passing server objects to the client.

---
id: loi-nem-tu-layout-tsx-khong-duoc-error-tsx-cung-thu-muc-bat-vi-sao-va-xu-ly-ra-s
position: backend
technology: error-handling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lỗi ném từ `layout.tsx` không được `error.tsx` cùng thư mục bắt. Vì sao và xử lý ra sao?

## Question (EN)
An error thrown in `layout.tsx` is not caught by the `error.tsx` in the same folder. Why, and how do you handle it?

## Đáp án chi tiết (VI)
Vì `error.tsx` được render **bên trong** layout cùng cấp. Layout đã hỏng thì không thể bọc được UI lỗi của chính nó.\
\
**Cách xử lý:**\
- Lỗi ở `app/dashboard/layout.tsx` → cần `app/error.tsx` ở cấp **cha** bắt.\
- Lỗi ở layout gốc (`app/layout.tsx`) hoặc template gốc → chỉ `app/global-error.tsx` bắt được. File này thay thế cả layout gốc nên **phải tự render `\u003chtml\u003e` và `\u003cbody\u003e`**.\
\
```tsx\
// app/global-error.tsx\
'use client'\
export default function GlobalError({ error, reset }: { error: Error; reset: () =\u003e void }) {\
  return (\
    \u003chtml\u003e\
      \u003cbody\u003e\
        \u003ch2\u003eSomething went wrong\u003c/h2\u003e\
        \u003cbutton onClick={reset}\u003eTry again\u003c/button\u003e\
      \u003c/body\u003e\
    \u003c/html\u003e\
  )\
}\
```\
\
**Các điểm hay bị hỏi thêm:**\
- `error.tsx` bắt buộc là Client Component (cần state để `reset`).\
- `reset()` render lại segment; nếu nguyên nhân chưa hết thì lỗi lặp lại.\
- `notFound()` không đi vào `error.tsx` mà vào `not-found.tsx`.\
- Ở production, message của lỗi server bị lược bỏ, chỉ còn `error.digest` để đối chiếu log.

## Detailed Answer (EN)
$84

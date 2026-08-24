---
id: next-font-giup-gi-cho-hieu-nang-no-chong-layout-shift-do-font-bang-cach-nao
position: backend
technology: fonts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`next/font` giúp gì cho hiệu năng? Nó chống layout shift do font bằng cách nào?

## Question (EN)
What does `next/font` do for performance? How does it prevent font-related layout shift?

## Đáp án chi tiết (VI)
`next/font` xử lý ba vấn đề của web font:\
\
1. **Self-host tự động.** File font Google được tải về lúc build và phục vụ từ chính domain của bạn. Không còn request sang `fonts.googleapis.com` → bớt một vòng DNS + TLS tới host lạ, và không có dữ liệu request gửi sang bên thứ ba.\
2. **Preload đúng file.** Font được thêm vào `\u003clink rel=\\"preload\\"\u003e` ngay từ HTML đầu tiên, thay vì chờ CSS parse xong mới phát hiện ra.\
3. **Chống layout shift.** Đây là phần hay bị hỏi: `next/font` đọc metric của font thật (chiều cao chữ, bề rộng trung bình) rồi sinh ra một **fallback font được chỉnh tỉ lệ** qua `size-adjust`, `ascent-override`. Chữ hiển thị bằng font hệ thống trong lúc chờ sẽ chiếm gần đúng diện tích của font thật, nên khi font thật về, chữ không nhảy — CLS gần như bằng 0.\
\
```ts\
import { Inter } from 'next/font/google'\
\
const inter = Inter({ subsets: ['latin'], display: 'swap' })\
// \u003cbody className={inter.className}\u003e\
```\
\
Gọi loader ở **module scope** (ngoài component), nếu không sẽ lỗi build.

## Detailed Answer (EN)
$87

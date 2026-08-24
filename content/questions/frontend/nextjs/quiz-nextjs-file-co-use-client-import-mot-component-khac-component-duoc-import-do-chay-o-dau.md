---
id: quiz-nextjs-file-co-use-client-import-mot-component-khac-component-duoc-import-do-chay-o-dau
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File có 'use client' import một component khác. Component được import đó chạy ở đâu?

## Đáp án trắc nghiệm
- [ ] Ở server, vì bản thân chart.tsx không có 'use client'
- [x] Ở client — 'use client' đánh dấu ranh giới cho cả cây dưới nó
- [ ] Ở server lần render đầu, sau đó chuyển sang client
- [ ] Next.js báo lỗi build vì trộn hai loại component

## Giải thích (VI)
'use client' là ranh giới chứ không phải nhãn cho một file. Mọi thứ được import xuống dưới ranh giới đó đều thành Client Component. Muốn giữ một phần ở server bên trong cây client thì truyền nó xuống qua prop children chứ không import.

### Giải thích các phương án:
- **Ở server, vì bản thân chart.tsx không có 'use client'** (Sai): Không thể — một component chạy trên server không thể được render bên trong cây client như vậy.
- **Ở client — 'use client' đánh dấu ranh giới cho cả cây dưới nó** (Đúng): Directive áp cho cả nhánh cây phía dưới, không chỉ cho một file. Component được import vào cây đó thành Client Component dù không tự khai báo directive.
- **Ở server lần render đầu, sau đó chuyển sang client** (Sai): Không có cơ chế chuyển đổi runtime kiểu này.
- **Next.js báo lỗi build vì trộn hai loại component** (Sai): Đây là mẫu hoàn toàn hợp lệ và rất phổ biến.

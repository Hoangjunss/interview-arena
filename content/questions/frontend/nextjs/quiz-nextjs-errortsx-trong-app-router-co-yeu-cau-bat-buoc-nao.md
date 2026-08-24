---
id: quiz-nextjs-errortsx-trong-app-router-co-yeu-cau-bat-buoc-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
error.tsx trong App Router có yêu cầu bắt buộc nào?

## Đáp án trắc nghiệm
- [x] Phải là Client Component và nhận prop reset
- [ ] Chỉ được đặt ở thư mục gốc app/, không đặt được ở route con
- [ ] Phải là Server Component để đọc được thông tin lỗi từ server
- [ ] Phải export một hàm tên handleError

## Giải thích (VI)
error.tsx bắt buộc 'use client' vì error boundary là cơ chế phía client. Nó nhận error và reset. Điểm hay quên: nó không bắt được lỗi phát sinh trong layout.tsx CÙNG CẤP — muốn bắt thì phải đặt error.tsx ở cấp cha.

### Giải thích các phương án:
- **Phải là Client Component và nhận prop reset** (Đúng): Error boundary của React cần chạy ở client; phạm vi bắt lỗi dừng ở layout cùng cấp. reset cho người dùng thử render lại phần bị lỗi.
- **Chỉ được đặt ở thư mục gốc app/, không đặt được ở route con** (Sai): Đặt được ở bất kỳ cấp nào để bắt lỗi theo phạm vi.
- **Phải là Server Component để đọc được thông tin lỗi từ server** (Sai): Ngược lại — error boundary bắt buộc phải là Client Component.
- **Phải export một hàm tên handleError** (Sai): Nó export một component mặc định như mọi file quy ước khác.

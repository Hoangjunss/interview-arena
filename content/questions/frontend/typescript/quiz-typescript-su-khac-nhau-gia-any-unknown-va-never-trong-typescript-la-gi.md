---
id: quiz-typescript-su-khac-nhau-gia-any-unknown-va-never-trong-typescript-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa any, unknown và never trong TypeScript là gì?

## Đáp án trắc nghiệm
- [x] any tắt kiểm tra; unknown phải narrow; never không có giá trị nào
- [ ] unknown và any giống hệt nhau, chỉ khác tên
- [ ] any chỉ dùng được cho parameter, unknown chỉ dùng được cho biến
- [ ] never là alias của null | undefined

## Giải thích (VI)
any tắt hoàn toàn type checking nên mất an toàn kiểu. unknown nhận được mọi giá trị nhưng buộc phải narrow (typeof, instanceof, type guard) trước khi sử dụng — là lựa chọn an toàn thay any. never là kiểu không bao giờ có giá trị: hàm luôn throw, hoặc nhánh đã loại trừ hết trong exhaustive check.

### Giải thích các phương án:
- **any tắt kiểm tra; unknown phải narrow; never không có giá trị nào** (Đúng): Đúng ba đặc trưng: any bỏ qua kiểm tra, unknown là "any an toàn" buộc kiểm tra kiểu, never biểu diễn giá trị không thể tồn tại. Kiểu unknown nhận mọi giá trị nhưng không cho thao tác gì cho tới khi được thu hẹp.
- **unknown và any giống hệt nhau, chỉ khác tên** (Sai): Khác cốt lõi: với unknown không thể gọi method hay gán cho biến có kiểu cụ thể nếu chưa narrow; any cho phép tất cả.
- **any chỉ dùng được cho parameter, unknown chỉ dùng được cho biến** (Sai): Cả hai đều dùng được ở mọi vị trí khai báo kiểu — không có giới hạn theo vị trí như vậy.
- **never là alias của null | undefined** (Sai): null và undefined là giá trị tồn tại thật; never là kiểu rỗng — không giá trị nào thuộc về nó (hàm luôn throw, nhánh không thể xảy ra).

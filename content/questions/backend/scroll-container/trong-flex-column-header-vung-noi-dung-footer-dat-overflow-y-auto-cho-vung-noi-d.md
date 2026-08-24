---
id: trong-flex-column-header-vung-noi-dung-footer-dat-overflow-y-auto-cho-vung-noi-d
position: backend
technology: scroll-container
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong flex column (header + vùng nội dung + footer), đặt `overflow-y: auto` cho vùng nội dung nhưng nó không cuộn mà kéo dài cả trang. Sửa thế nào?

## Question (EN)
In a flex column (header + content + footer), the content pane has `overflow-y: auto` but never scrolls — the whole page grows instead. How do you fix it?

## Đáp án chi tiết (VI)
Thêm **`min-height: 0`** (hoặc `overflow: hidden`) cho flex item cuộn.\
\
Cùng cơ chế với `min-width: auto` ở trục ngang: theo trục chính của flex column, item có `min-height: auto`, nghĩa là **không được thấp hơn nội dung**. Item cứ cao bằng toàn bộ nội dung nên không bao giờ có phần tràn để `overflow-y: auto` xử lý — trang cuộn thay vì vùng nội dung cuộn.\
\
```css\
.shell {\
  display: flex;\
  flex-direction: column;\
  height: 100dvh;\
}\
.header, .footer { flex: none; }\
.content {\
  flex: 1;\
  min-height: 0;    /* mấu chốt */\
  overflow-y: auto;\
}\
```\
\
Nếu có nhiều tầng flex lồng nhau thì **mọi tầng trung gian** trên đường đi đều cần `min-height: 0`, chỉ thiếu một tầng là hỏng.\
\
Hai điều kiện luôn phải kiểm cùng lúc:\
1. Tổ tiên có **chiều cao xác định** (`height`/`100dvh`/`flex: 1` từ một gốc có chiều cao); nếu chuỗi chiều cao đứt thì không có gì để tràn.\
2. Item cuộn được phép thấp hơn nội dung (`min-height: 0`).\
\
Grid có lỗi tương ứng: đổi row `1fr` thành `minmax(0, 1fr)`.

## Detailed Answer (EN)
$7c

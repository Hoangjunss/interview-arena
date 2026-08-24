---
id: aspect-ratio-dung-the-nao-no-thay-duoc-ky-thuat-padding-top-phan-tram-o-diem-nao
position: backend
technology: aspect-ratio
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`aspect-ratio` dùng thế nào? Nó thay được kỹ thuật padding-top phần trăm ở điểm nào?

## Question (EN)
How is `aspect-ratio` used, and what does it improve over the percentage padding-top trick?

## Đáp án chi tiết (VI)
`aspect-ratio` khai báo trực tiếp tỉ lệ giữa chiều rộng và chiều cao; trình duyệt tự suy ra chiều còn lại từ chiều đã biết.\
\
```css\
.thumb   { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }\
.avatar  { width: 48px; aspect-ratio: 1; border-radius: 999px; }\
.map     { aspect-ratio: 4 / 3; }\
```\
\
So với kỹ thuật cũ `padding-top: 56.25%` cộng một lớp con `position: absolute; inset: 0`:\
- Không cần **phần tử bọc thêm** và không phải tính lại phần trăm khi đổi tỉ lệ.\
- Nội dung nằm trong luồng bình thường, không phải absolute → vẫn dùng được flex/grid bên trong.\
- Đọc ra ngay ý đồ (`16 / 9`) thay vì một con số phần trăm khó truy vết.\
\
Các điểm cần nắm:\
- Tỉ lệ bị **ghi đè** khi cả `width` và `height` cùng được xác định, hoặc khi nội dung buộc box cao hơn — muốn cắt cứng thì thêm `overflow: hidden` hoặc `min-height: 0`.\
- Với `\u003cimg\u003e`/`\u003cvideo\u003e` nên đi kèm `object-fit: cover` để ảnh không méo.\
- Đặt sẵn tỉ lệ cho ảnh/embed cũng là cách giữ chỗ, tránh layout shift khi tài nguyên tải xong.

## Detailed Answer (EN)
$86

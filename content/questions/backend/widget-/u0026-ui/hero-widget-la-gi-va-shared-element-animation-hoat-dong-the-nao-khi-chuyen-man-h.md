---
id: hero-widget-la-gi-va-shared-element-animation-hoat-dong-the-nao-khi-chuyen-man-h
position: backend
technology: widget-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Hero` widget là gì và shared-element animation hoạt động thế nào khi chuyển màn hình?

## Question (EN)
What is the `Hero` widget and how does shared-element animation work across screens?

## Đáp án chi tiết (VI)
`Hero` tạo hiệu ứng **một phần tử chung \\"bay\\" liền mạch giữa hai màn hình** khi điều hướng — ví dụ ảnh thumbnail nhỏ ở danh sách phóng to thành ảnh lớn ở trang chi tiết. Người dùng cảm nhận đó là *cùng một* đối tượng di chuyển, chứ không phải hai widget khác nhau.\
\
Cách dùng: bọc widget nguồn và widget đích trong `Hero` với **cùng một `tag`**:\
\
```dart\
// Màn danh sách\
Hero(tag: 'avatar-42', child: Image.network(thumbUrl))\
\
// Màn chi tiết (sau khi Navigator.push)\
Hero(tag: 'avatar-42', child: Image.network(fullUrl))\
```\
\
Cơ chế: khi `Navigator` chuyển route, Flutter tìm các cặp `Hero` trùng `tag` ở màn cũ và màn mới, tạm nhấc chúng lên một lớp overlay riêng, rồi nội suy vị trí + kích thước từ hình chữ nhật nguồn tới hình chữ nhật đích trong suốt transition. Kết thúc, hero được đặt vào đúng chỗ ở màn đích.\
\
Lưu ý: `tag` phải **duy nhất trong mỗi màn**; trùng tag trên cùng một màn sẽ gây lỗi. Trong danh sách nên gắn tag theo id của item để tránh đụng.

## Detailed Answer (EN)
$86

---
id: viet-tai-lieu-ky-thuat-o-muc-du-dung-nghia-la-viet-gi-va-bo-gi
position: backend
technology: documentation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Viết tài liệu kỹ thuật ở mức \\"đủ dùng\\" nghĩa là viết gì và bỏ gì?

## Question (EN)
What does \\"just enough\\" technical documentation include, and what should it leave out?

## Đáp án chi tiết (VI)
Đủ dùng nghĩa là **ghi lại thứ code không tự nói được**, chủ yếu là **lý do**. Code đã mô tả cách làm; tài liệu mô tả bối cảnh và ràng buộc.\
\
Nên viết:\
- **README chạy được**: cài gì, biến môi trường nào, chạy lệnh nào để lên dev, chạy test ra sao. Đây là tài liệu được đọc nhiều nhất.\
- **Bản ghi quyết định (ADR)** cho các lựa chọn khó đảo ngược: chọn công nghệ, chia service, đổi mô hình dữ liệu. Mỗi bản 1-2 trang: bối cảnh, quyết định, hệ quả. Để trong repo (`doc/adr/0007-chon-redis-lam-cache.md`) để nó được version cùng code.\
- **Runbook** cho việc vận hành lặp lại: xử lý khi hàng đợi ùn, cách rollback, cách chạy lại job hỏng.\
\
Nên bỏ:\
- Tài liệu mô tả lại từng hàm — sẽ lệch với code sau vài sprint, mà lệch còn tệ hơn không có.\
- Sơ đồ đẹp nhưng không ai cập nhật. Ưu tiên sơ đồ mức cao ít thay đổi.\
\
Quy tắc thực dụng: nếu bạn phải giải thích cùng một điều cho người thứ hai, hãy viết nó xuống và gửi link lần sau.

## Detailed Answer (EN)
$87

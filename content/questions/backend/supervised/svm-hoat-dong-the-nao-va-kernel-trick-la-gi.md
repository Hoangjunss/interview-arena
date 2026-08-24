---
id: svm-hoat-dong-the-nao-va-kernel-trick-la-gi
position: backend
technology: supervised
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SVM hoạt động thế nào và kernel trick là gì?

## Question (EN)
How do SVMs work, and what is the kernel trick?

## Đáp án chi tiết (VI)
**SVM (Support Vector Machine)** tìm **siêu phẳng (hyperplane)** phân tách hai lớp sao cho **lề (margin)** — khoảng cách từ siêu phẳng tới điểm gần nhất của mỗi lớp — là **lớn nhất**. Những điểm nằm sát lề gọi là **support vectors**; chỉ chúng quyết định ranh giới. Biến thể **soft-margin** cho phép một số vi phạm lề, với tham số `C` đánh đổi giữa lề rộng và số lỗi.\
\
**Kernel trick:** nhiều dữ liệu **không tách tuyến tính** trong không gian gốc. Kernel trick ánh xạ ngầm dữ liệu lên một không gian nhiều chiều hơn (nơi có thể tách tuyến tính) mà **không cần tính tọa độ mới tường minh** — chỉ cần một **hàm kernel** `K(xᵢ, xⱼ)` trả về tích vô hướng của hai điểm trong không gian đó. Điều này khả thi vì công thức SVM chỉ phụ thuộc **tích vô hướng giữa các mẫu**, nên thay tích vô hướng bằng kernel là đủ, tránh được chi phí tính toán ở chiều cao.\
\
Kernel phổ biến: **tuyến tính**, **đa thức (polynomial)**, **RBF (Gaussian)**. Nhờ đó SVM tạo được ranh giới phi tuyến với chi phí hợp lý.

## Detailed Answer (EN)
$85

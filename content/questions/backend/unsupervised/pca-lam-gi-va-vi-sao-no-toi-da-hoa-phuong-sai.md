---
id: pca-lam-gi-va-vi-sao-no-toi-da-hoa-phuong-sai
position: backend
technology: unsupervised
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PCA làm gì và vì sao nó tối đa hóa phương sai?

## Question (EN)
What does PCA do, and why does it maximize variance?

## Đáp án chi tiết (VI)
PCA (Principal Component Analysis) là kỹ thuật **giảm chiều** không giám sát: tìm một hệ trục mới — các **thành phần chính** — là tổ hợp tuyến tính **trực giao** của các đặc trưng gốc, sắp theo lượng **phương sai** chúng giữ lại. Giữ vài thành phần đầu để nén dữ liệu mà mất ít thông tin nhất.\
\
**Vì sao tối đa hóa phương sai:** phương sai lớn ≈ tín hiệu/thông tin, phương sai nhỏ thường là hằng số hoặc nhiễu. Hướng có phương sai lớn nhất giữ được nhiều cấu trúc dữ liệu nhất khi chiếu xuống ít chiều. Có thể chứng minh **tối đa hóa phương sai chiếu tương đương cực tiểu sai số tái tạo bình phương** — nên đây là cách nén \\"ít mất mát\\" nhất theo nghĩa L2.\
\
**Cơ chế:** các thành phần chính là **vector riêng (eigenvectors)** của ma trận hiệp phương sai (hoặc lấy trực tiếp từ SVD), với **trị riêng (eigenvalues)** = phương sai theo mỗi hướng. Thành phần đầu là hướng phương sai lớn nhất; các thành phần sau trực giao và phương sai giảm dần. Nên **chuẩn hóa đặc trưng** trước vì PCA nhạy với thang đo.

## Detailed Answer (EN)
$86

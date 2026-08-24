---
id: matrix-build-la-gi-khi-nao-can-va-can-luu-y-gi-de-khong-ton-thoi-gian
position: backend
technology: matrix-build
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Matrix build là gì? Khi nào cần và cần lưu ý gì để không tốn thời gian?

## Question (EN)
What is a matrix build? When do you need one, and how do you keep it from wasting time?

## Đáp án chi tiết (VI)
**Matrix** cho phép khai báo một job rồi CI tự nhân bản job đó theo tổ hợp các biến — mỗi tổ hợp chạy **song song** trên runner riêng.\
\
```yaml\
strategy:\
  fail-fast: false\
  matrix:\
    node: [20, 22]\
    os: [ubuntu-latest, windows-latest]\
```\
\
Khai báo trên sinh ra 4 job. Dùng khi sản phẩm phải chạy trên **nhiều môi trường thật**: thư viện hỗ trợ nhiều version runtime, app phải chạy cả Linux lẫn Windows, hoặc test với nhiều version database.\
\
**Lưu ý:**\
\
- Số job = **tích** các chiều. Thêm một chiều 3 giá trị là nhân ba chi phí — chỉ thêm chiều khi thật sự có người dùng ở tổ hợp đó.\
- `include` / `exclude` để bỏ tổ hợp vô nghĩa (vd chỉ test Windows với version LTS mới nhất).\
- `fail-fast: true` (mặc định) hủy toàn bộ matrix khi một job hỏng — tiết kiệm runner nhưng che mất thông tin \\"lỗi này chỉ xảy ra ở Node 20 hay ở mọi version\\". Khi cần chẩn đoán, đặt `false`.\
- Matrix **không** phải công cụ chia nhỏ test suite; chia test suite dùng sharding.

## Detailed Answer (EN)
$85

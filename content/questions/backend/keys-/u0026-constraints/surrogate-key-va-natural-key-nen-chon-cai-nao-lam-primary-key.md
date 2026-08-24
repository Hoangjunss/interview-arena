---
id: surrogate-key-va-natural-key-nen-chon-cai-nao-lam-primary-key
position: backend
technology: keys-\u0026-constraints
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Surrogate key và natural key — nên chọn cái nào làm primary key?

## Question (EN)
Surrogate key vs natural key — which should be the primary key?

## Đáp án chi tiết (VI)
- **Natural key**: khóa lấy từ **dữ liệu nghiệp vụ thật** có sẵn ý nghĩa (email, số CMND, mã sản phẩm, `country_code`).\
- **Surrogate key**: khóa **nhân tạo, không mang nghĩa nghiệp vụ**, sinh riêng để định danh — `SERIAL`/`IDENTITY` (số tăng), `UUID`, hoặc `ObjectId` của Mongo.\
\
Đánh đổi:\
- Natural key: không tốn cột thừa, tự nhiên với người dùng; **nhưng** giá trị nghiệp vụ có thể **đổi** (email đổi) hoặc không thực sự duy nhất → phá vỡ mọi FK trỏ tới nó; thường dài, khó dùng làm khóa join.\
- Surrogate key: **ổn định, không bao giờ đổi**, ngắn gọn, tách khóa khỏi logic nghiệp vụ → join/FK bền. Nhược: một lớp gián tiếp thêm; nếu để lộ số tuần tự có thể rò rỉ thông tin (dùng UUID nếu ngại).\
\
Thực tế phổ biến: **dùng surrogate key làm PK** cho ổn định, đồng thời đặt **unique constraint** trên natural key để vẫn đảm bảo tính duy nhất nghiệp vụ. `SERIAL` vs `UUID`: UUID hợp hệ phân tán/tránh đoán id, nhưng ngẫu nhiên gây phân mảnh index (cân nhắc UUIDv7/ULID có thứ tự thời gian).

## Detailed Answer (EN)
$88

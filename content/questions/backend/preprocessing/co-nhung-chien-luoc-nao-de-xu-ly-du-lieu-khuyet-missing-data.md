---
id: co-nhung-chien-luoc-nao-de-xu-ly-du-lieu-khuyet-missing-data
position: backend
technology: preprocessing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những chiến lược nào để xử lý dữ liệu khuyết (missing data)?

## Question (EN)
What strategies exist for handling missing data?

## Đáp án chi tiết (VI)
Trước tiên nên hiểu **cơ chế khuyết**: MCAR (khuyết ngẫu nhiên hoàn toàn), MAR (khuyết phụ thuộc biến quan sát khác), MNAR (khuyết phụ thuộc chính giá trị bị thiếu) — nó quyết định cách xử lý có gây thiên lệch hay không.\
\
**Các chiến lược chính:**\
- **Xoá (deletion)** — bỏ hàng (listwise) hoặc cột. Đơn giản nhưng mất dữ liệu; chỉ ổn khi tỷ lệ khuyết nhỏ và MCAR.\
- **Imputation đơn giản** — điền **mean/median** (số) hoặc **mode** (phân loại). Nhanh nhưng **giảm phương sai** và bỏ qua quan hệ giữa các biến. Median bền với ngoại lai hơn mean.\
- **Imputation theo mô hình** — **KNN** (lấy từ láng giềng gần), hồi quy, hoặc **MICE / IterativeImputer** (điền lặp dựa trên các biến khác). Chính xác hơn nhưng tốn tính toán.\
- **Đánh dấu (indicator)** — thêm cột chỉ báo \\"đã khuyết\\" để mô hình học tín hiệu từ việc thiếu, nhất là khi MNAR.\
\
**Lưu ý rò rỉ dữ liệu:** tính tham số điền (vd median) **chỉ trên tập train** rồi áp cho validation/test — không dùng thống kê toàn bộ dữ liệu.

## Detailed Answer (EN)
$87

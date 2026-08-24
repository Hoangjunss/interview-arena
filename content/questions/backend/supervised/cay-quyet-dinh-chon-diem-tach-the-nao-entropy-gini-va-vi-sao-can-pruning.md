---
id: cay-quyet-dinh-chon-diem-tach-the-nao-entropy-gini-va-vi-sao-can-pruning
position: backend
technology: supervised
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cây quyết định chọn điểm tách thế nào (entropy/gini) và vì sao cần pruning?

## Question (EN)
How does a decision tree choose splits (entropy/gini), and why is pruning needed?

## Đáp án chi tiết (VI)
Cây quyết định chia dữ liệu **đệ quy** theo các đặc trưng. Ở mỗi nút, nó chọn phép tách làm các nhánh con **thuần nhất về nhãn nhất** có thể, đo bằng một chỉ số impurity:\
\
- **Gini impurity**: `1 − Σ pᵢ²` — xác suất phân loại sai nếu gán nhãn ngẫu nhiên theo phân phối trong nút. Bằng 0 khi nút chỉ một lớp.\
- **Entropy**: `−Σ pᵢ·log₂(pᵢ)` — độ bất định của nút; phép tách được chọn để tối đa **information gain** (mức giảm entropy sau khi tách).\
\
Cả hai đều đạt tối thiểu khi nút thuần một lớp và trong thực tế thường cho kết quả tương tự.\
\
**Vì sao cần pruning:** để tối đa mọc, cây sẽ chia tới khi mỗi lá gần như thuần → **khớp cả nhiễu (overfit)**, tổng quát kém trên dữ liệu mới. Pruning cắt bớt nhánh ít giá trị:\
\
- **Pre-pruning (early stopping)**: giới hạn độ sâu, số mẫu tối thiểu mỗi lá/mỗi lần tách.\
- **Post-pruning**: mọc cây đầy rồi cắt lại (vd **cost-complexity pruning**), dùng tập validation để chỉ giữ những nhánh thực sự cải thiện.

## Detailed Answer (EN)
$89

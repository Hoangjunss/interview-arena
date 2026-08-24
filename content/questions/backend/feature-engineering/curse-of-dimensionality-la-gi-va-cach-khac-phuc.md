---
id: curse-of-dimensionality-la-gi-va-cach-khac-phuc
position: backend
technology: feature-engineering
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Curse of dimensionality là gì và cách khắc phục?

## Question (EN)
What is the curse of dimensionality and how do you address it?

## Đáp án chi tiết (VI)
Curse of dimensionality là tập hợp các hiện tượng khiến việc học trở nên khó khi số chiều (đặc trưng) tăng cao.\
\
**Vì sao gây hại:**\
- **Thưa dữ liệu** — thể tích không gian tăng theo hàm mũ với số chiều, nên với số mẫu cố định, dữ liệu ngày càng thưa; cần số mẫu tăng theo hàm mũ để phủ đủ.\
- **Khoảng cách mất ý nghĩa** — ở số chiều cao, khoảng cách giữa điểm gần nhất và xa nhất trở nên gần như nhau, làm suy yếu các phương pháp dựa trên khoảng cách (kNN, k-means).\
- **Dễ overfit** — nhiều đặc trưng cho mô hình nhiều cách bám nhiễu hơn.\
\
**Cách khắc phục:**\
- **Giảm chiều** — PCA (tuyến tính), hoặc t-SNE/UMAP cho trực quan hoá.\
- **Feature selection** để bỏ đặc trưng dư thừa/nhiễu.\
- **Regularization** (L1/L2) kìm độ phức tạp.\
- Thu thập **thêm dữ liệu** và dùng **kiến thức miền** để chỉ giữ đặc trưng có ý nghĩa.

## Detailed Answer (EN)
The curse of dimensionality is a set of phenomena that make learning hard as the number of dimensions (features) grows large.\
\
**Why it hurts:**\
- **Data sparsity** — the volume of the space grows exponentially with dimensions, so for a fixed sample size data becomes ever sparser; covering it needs exponentially more samples.\
- **Distances lose meaning** — in high dimensions the nearest and farthest points become almost equidistant, weakening distance-based methods (kNN, k-means).\
- **Easier overfitting** — more features give the model more ways to fit noise.\
\
**How to address it:**\
- **Dimensionality reduction** — PCA (linear), or t-SNE/UMAP for visualization.\
- **Feature selection** to drop redundant/noisy features.\
- **Regularization** (L1/L2) to restrain complexity.\
- Collect **more data** and use **domain knowledge** to keep only meaningful features.

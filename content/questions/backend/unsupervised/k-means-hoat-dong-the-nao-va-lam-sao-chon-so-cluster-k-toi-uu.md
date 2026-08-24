---
id: k-means-hoat-dong-the-nao-va-lam-sao-chon-so-cluster-k-toi-uu
position: backend
technology: unsupervised
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
K-Means hoạt động thế nào và làm sao chọn số cluster k tối ưu?

## Question (EN)
How does K-Means work, and how do you choose the optimal number of clusters k?

## Đáp án chi tiết (VI)
K-Means chia dữ liệu thành `k` cụm bằng cách lặp hai bước:\
\
1. **Gán**: mỗi điểm về **tâm cụm (centroid) gần nhất** theo khoảng cách Euclid.\
2. **Cập nhật**: centroid mới = trung bình các điểm trong cụm.\
\
Lặp đến khi phân cụm ổn định. Mục tiêu là cực tiểu **inertia** (tổng bình phương khoảng cách trong cụm, WCSS).\
\
**Chọn k:**\
\
- **Elbow method**: vẽ inertia theo `k`, chọn điểm \\"khuỷu tay\\" nơi việc tăng `k` không còn giảm inertia đáng kể.\
- **Silhouette score**: đo mức một điểm gần cụm của nó so với cụm gần nhất khác (khoảng `−1..1`, càng cao càng tốt).\
- **Kiến thức lĩnh vực / ràng buộc nghiệp vụ** — nhiều khi `k` do bài toán quy định.\
\
Lưu ý: `k` phải chọn trước; K-Means giả định cụm **dạng cầu, kích thước tương đương**, nhạy với khởi tạo (dùng **k-means++**) và với outlier.

## Detailed Answer (EN)
K-Means partitions data into `k` clusters by iterating two steps:\
\
1. **Assign**: each point to its **nearest centroid** by Euclidean distance.\
2. **Update**: each new centroid = the mean of the points in its cluster.\
\
Repeat until the assignment stabilizes. The objective is to minimize **inertia** (within-cluster sum of squared distances, WCSS).\
\
**Choosing k:**\
\
- **Elbow method**: plot inertia against `k` and pick the \\"elbow\\" where adding more clusters stops reducing inertia meaningfully.\
- **Silhouette score**: measures how close a point is to its own cluster versus the nearest other cluster (roughly `−1..1`, higher is better).\
- **Domain knowledge / business constraints** — often `k` is dictated by the problem.\
\
Note: `k` must be set in advance; K-Means assumes **spherical, similarly sized** clusters and is sensitive to initialization (use **k-means++**) and to outliers.

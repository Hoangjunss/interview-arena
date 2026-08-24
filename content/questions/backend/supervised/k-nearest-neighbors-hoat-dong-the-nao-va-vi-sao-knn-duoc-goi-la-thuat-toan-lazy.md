---
id: k-nearest-neighbors-hoat-dong-the-nao-va-vi-sao-knn-duoc-goi-la-thuat-toan-lazy
position: backend
technology: supervised
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
K-Nearest Neighbors hoạt động thế nào và vì sao KNN được gọi là thuật toán \\"lazy\\"?

## Question (EN)
How does K-Nearest Neighbors work, and why is KNN called a \\"lazy\\" algorithm?

## Đáp án chi tiết (VI)
KNN dự đoán bằng cách tìm **`k` điểm huấn luyện gần nhất** với mẫu cần dự đoán (theo một metric khoảng cách, thường Euclid), rồi **bỏ phiếu đa số** (phân loại) hoặc **lấy trung bình** (hồi quy) từ chúng.\
\
**\\"Lazy\\" (lazy learner)** vì nó **không xây mô hình trong lúc train** — chỉ lưu lại toàn bộ dữ liệu. Mọi tính toán bị hoãn tới lúc dự đoán: khi có một truy vấn mới, nó mới đo khoảng cách tới các điểm và tìm hàng xóm. Ngược lại, \\"eager learner\\" (linear/logistic regression, cây quyết định) học tham số/luật ngay khi train rồi có thể vứt dữ liệu.\
\
**Hệ quả:**\
\
- Train gần như tức thời, nhưng **dự đoán chậm và tốn bộ nhớ** (phải giữ hết dữ liệu và quét để tìm hàng xóm).\
- Nhạy với **thang đo đặc trưng** → cần chuẩn hóa; và với **\\"curse of dimensionality\\"** khi số chiều lớn.\
- Chọn `k`: nhỏ quá → nhiễu/overfit; lớn quá → mượt/underfit.

## Detailed Answer (EN)
KNN predicts by finding the **`k` nearest training points** to the query sample (by a distance metric, usually Euclidean), then taking a **majority vote** (classification) or an **average** (regression) over them.\
\
It is a **\\"lazy\\" learner** because it **builds no model at training time** — it simply stores all the data. All computation is deferred to prediction: only when a new query arrives does it measure distances and find neighbors. By contrast, \\"eager\\" learners (linear/logistic regression, decision trees) fit parameters/rules during training and can then discard the data.\
\
**Consequences:**\
\
- Training is essentially instant, but **prediction is slow and memory-heavy** (it must keep all the data and scan it for neighbors).\
- Sensitive to **feature scaling** → standardize; and to the **curse of dimensionality** in high dimensions.\
- Choosing `k`: too small → noisy/overfit; too large → over-smoothed/underfit.

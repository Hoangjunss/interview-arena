---
id: muon-san-pham-ban-chay-xuat-hien-cao-hon-trong-ket-qua-thi-lam-the-nao
position: backend
technology: relevance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn sản phẩm bán chạy xuất hiện cao hơn trong kết quả thì làm thế nào?

## Question (EN)
How do you make best-selling products rank higher in results?

## Đáp án chi tiết (VI)
Kết hợp điểm text với tín hiệu nghiệp vụ bằng `function_score`, đừng thay thế hẳn điểm text.\
\
```json\
{\
  \\"function_score\\": {\
    \\"query\\": { \\"match\\": { \\"name\\": \\"laptop gaming\\" } },\
    \\"functions\\": [\
      { \\"field_value_factor\\": {\
          \\"field\\": \\"sales_30d\\

## Detailed Answer (EN)
Combine the text score with business signals through `function_score`, without discarding the text score.\
\
```json\
{\
  \\"function_score\\": {\
    \\"query\\": { \\"match\\": { \\"name\\": \\"laptop gaming\\" } },\
    \\"functions\\": [\
      { \\"field_value_factor\\": {\
          \\"field\\": \\"sales_30d\\

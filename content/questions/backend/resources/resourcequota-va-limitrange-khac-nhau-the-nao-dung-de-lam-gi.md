---
id: resourcequota-va-limitrange-khac-nhau-the-nao-dung-de-lam-gi
position: backend
technology: resources
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ResourceQuota và LimitRange khác nhau thế nào? Dùng để làm gì?

## Question (EN)
How do ResourceQuota and LimitRange differ, and what are they for?

## Đáp án chi tiết (VI)
Cả hai đều là hàng rào tài nguyên ở mức **namespace**, nhưng ở hai tầng khác nhau.\
\
**ResourceQuota — trần cho cả namespace.** Giới hạn tổng lượng tài nguyên và cả số lượng object mà namespace được dùng.\
\
```yaml\
kind: ResourceQuota\
spec:\
  hard:\
    requests.cpu: \\"10\\"\
    requests.memory: 20Gi\
    limits.memory: 40Gi\
    pods: \\"50\\"\
```\
\
**LimitRange — luật cho từng container/Pod.** Đặt min, max và **giá trị mặc định** khi manifest không khai báo.\
\
```yaml\
kind: LimitRange\
spec:\
  limits:\
    - type: Container\
      default: { cpu: 500m, memory: 512Mi }        # limit mac dinh\
      defaultRequest: { cpu: 100m, memory: 128Mi } # request mac dinh\
      max: { cpu: \\"2\\

## Detailed Answer (EN)
$82

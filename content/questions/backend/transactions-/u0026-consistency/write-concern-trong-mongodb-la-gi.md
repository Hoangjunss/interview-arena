---
id: write-concern-trong-mongodb-la-gi
position: backend
technology: transactions-\u0026-consistency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Write concern trong MongoDB là gì?

## Question (EN)
What is write concern in MongoDB?

## Đáp án chi tiết (VI)
Write concern là mức \\"đảm bảo đã ghi\\" mà client yêu cầu MongoDB xác nhận trước khi coi lệnh ghi là thành công.\
\
Các mức hay gặp:\
- `w: 1` (mặc định): chỉ cần Primary nhận và ghi xong là báo thành công.\
- `w: \\"majority\\"`: đợi đa số node (Primary + Secondaries) ghi xong mới báo thành công.\
\
Chọn theo độ quan trọng của dữ liệu. `w: \\"majority\\"` chậm hơn nhưng tránh được tình huống: vừa báo \\"ghi xong\\" thì Primary mất kết nối và bị thay thế, khiến ghi đó bị rollback và *biến mất*.

## Detailed Answer (EN)
Write concern is the level of \\"write guarantee\\" the client asks MongoDB to confirm before treating a write as successful.\
\
Common levels:\
- `w: 1` (default): success once the Primary has accepted and written it.\
- `w: \\"majority\\"`: waits until a majority of nodes (Primary + Secondaries) have written it.\
\
Choose by data criticality. `w: \\"majority\\"` is slower but avoids the case where a write reported \\"done\\" gets rolled back and *vanishes* because the Primary lost connectivity and was replaced.

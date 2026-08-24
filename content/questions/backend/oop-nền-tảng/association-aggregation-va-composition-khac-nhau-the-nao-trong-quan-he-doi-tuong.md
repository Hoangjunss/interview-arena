---
id: association-aggregation-va-composition-khac-nhau-the-nao-trong-quan-he-doi-tuong
position: backend
technology: oop-nền-tảng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Association, Aggregation và Composition khác nhau thế nào trong quan hệ đối tượng (UML)?

## Question (EN)
How do Association, Aggregation, and Composition differ in object relationships (UML)?

## Đáp án chi tiết (VI)
Ba mức quan hệ giữa object, ràng buộc vòng đời mạnh dần:\
\
- **Association (kết hợp)**: hai object có liên hệ và dùng nhau nhưng độc lập vòng đời. Vd: `Teacher` và `Student` — biết nhau nhưng tồn tại riêng. UML: đường thẳng.\
- **Aggregation (tập hợp, \\"has-a\\" lỏng)**: quan hệ whole–part nhưng part **sống độc lập** với whole. Vd: `Team` chứa `Player` — giải tán team, cầu thủ vẫn còn và có thể sang team khác. UML: hình thoi rỗng phía whole.\
- **Composition (hợp thành, \\"has-a\\" chặt)**: whole **sở hữu** part; part không tồn tại nếu thiếu whole, hủy whole thì hủy luôn part. Vd: `House` và `Room` — phá nhà thì phòng không còn. UML: hình thoi đặc.\
\
**Cách nhớ**: hỏi \\"part có sống được khi whole biến mất không?\\" — có → aggregation, không → composition. Cả hai đều là \\"has-a\\"; association là quan hệ chung hơn.

## Detailed Answer (EN)
Three levels of object relationship, with increasingly strong lifecycle coupling:\
\
- **Association**: two objects are related and use each other but have independent lifecycles. E.g. `Teacher` and `Student` — they know each other but exist separately. UML: a plain line.\
- **Aggregation (loose \\"has-a\\")**: a whole–part relationship where the part **lives independently** of the whole. E.g. `Team` contains `Player` — disband the team and the players remain, free to join another. UML: a hollow diamond on the whole side.\
- **Composition (strong \\"has-a\\")**: the whole **owns** the part; the part cannot exist without the whole, and destroying the whole destroys the part. E.g. `House` and `Room` — demolish the house and the rooms are gone. UML: a filled diamond.\
\
**Memory aid**: ask \\"can the part survive if the whole disappears?\\" — yes → aggregation, no → composition. Both are \\"has-a\\"; association is the more general relationship.

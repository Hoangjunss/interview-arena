---
id: embed-document-hay-reference-document-trong-mongodb
position: backend
technology: document-model
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Embed document hay reference document trong MongoDB?

## Question (EN)
Should you embed or reference documents in MongoDB?

## Đáp án chi tiết (VI)
Câu hỏi cốt lõi: dữ liệu con nên nằm *bên trong* document cha (embed) hay nằm ở collection riêng rồi trỏ tới (reference)?\
\
**Nên Embed (nhúng) khi:**\
- Dữ liệu con thuộc hẳn về cha và thường đọc cùng nhau.\
- Số lượng con nhỏ và có giới hạn.\
- Ít khi cần update con một cách độc lập.\
\
**Nên Reference (tham chiếu) khi:**\
- Dữ liệu con lớn hoặc tăng không giới hạn.\
- Quan hệ nhiều-nhiều.\
- Cần query con độc lập.\
- Có nguy cơ vượt giới hạn 16MB của một document.\
\
**Ví dụ embed vài địa chỉ vào user (số lượng nhỏ):**\
```javascript\
{\
  _id: ObjectId(\\"...\\"),\
  email: \\"a@example.com\\

## Detailed Answer (EN)
The core question: should child data live *inside* the parent (embed) or in a separate collection that you point to (reference)?\
\
**Embed when:**\
- Child data belongs entirely to the parent and is usually read together.\
- The count is small and bounded.\
- It rarely needs independent updates.\
\
**Reference when:**\
- Child data is large or grows without bound.\
- It is a many-to-many relationship.\
- You need to query the children independently.\
- There is a risk of exceeding the 16MB document limit.\
\
**Example embedding a few addresses in a user (small count):**\
```javascript\
{\
  _id: ObjectId(\\"...\\"),\
  email: \\"a@example.com\\

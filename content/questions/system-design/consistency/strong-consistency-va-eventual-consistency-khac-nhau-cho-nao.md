---
id: strong-consistency-va-eventual-consistency-khac-nhau-cho-nao
position: system-design
technology: consistency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Strong consistency và eventual consistency khác nhau chỗ nào?

## Question (EN)
What is the difference between strong and eventual consistency?

## Đáp án chi tiết (VI)
- **Strong consistency**: sau khi ghi thành công, **mọi lần đọc tiếp theo** đều thấy giá trị mới. Dễ suy luận cho lập trình viên, nhưng phải điều phối giữa các bản sao → **latency cao hơn**, availability giảm khi mạng lỗi.\
- **Eventual consistency**: các bản sao **hội tụ dần** về cùng giá trị nếu ngừng ghi; đọc có thể thấy dữ liệu cũ trong thời gian ngắn. Đổi lại **latency thấp, availability cao, scale tốt**.\
\
Còn có các mức trung gian: **read-your-writes**, **monotonic reads**, **causal consistency**. Chọn theo nghiệp vụ: số dư tài khoản cần strong; số lượt like/đếm view chấp nhận eventual.

## Detailed Answer (EN)
- **Strong consistency**: after a successful write, **every subsequent read** sees the new value. Easy to reason about, but requires coordination across replicas → **higher latency** and reduced availability under network faults.\
- **Eventual consistency**: replicas **converge** to the same value if writes stop; reads may briefly see stale data. In return you get **low latency, high availability, good scaling**.\
\
Intermediate levels exist: **read-your-writes**, **monotonic reads**, **causal consistency**. Choose by domain: an account balance needs strong; like counts / view counts tolerate eventual.

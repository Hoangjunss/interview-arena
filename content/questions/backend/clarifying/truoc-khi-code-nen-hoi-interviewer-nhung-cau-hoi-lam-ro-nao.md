---
id: truoc-khi-code-nen-hoi-interviewer-nhung-cau-hoi-lam-ro-nao
position: backend
technology: clarifying
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trước khi code nên hỏi interviewer những câu hỏi làm rõ nào?

## Question (EN)
What clarifying questions should you ask before coding?

## Đáp án chi tiết (VI)
Hỏi đúng câu cho thấy bạn làm việc như một kỹ sư thực thụ, không vội lao vào code khi yêu cầu còn mơ hồ. Hãy luôn có sẵn bộ câu hỏi checklist:\
\
1. **Dữ liệu đầu vào (Input):** Có thể rỗng (empty) hay null không? Có chứa số âm hay số quá lớn (overflow) không? Có duplicate không? Mảng đã được sort chưa?\
2. **Dữ liệu đầu ra (Output):** Trả về gì nếu không tìm thấy đáp án?\
3. **Giới hạn bộ nhớ/Side effects:** Có được phép sửa đổi (mutate) mảng input gốc không?\
4. **Độ ưu tiên:** Ưu tiên tối ưu Time hay Space complexity?\
5. **Kích thước dữ liệu (Scale):** Biến `n` lớn tới mức nào?\
\
*Gợi ý:* Kích thước `n` chính là gợi ý thuật toán. Nếu `n` nhỏ (ví dụ n=10), brute force (O(n!)) có thể ổn. Nếu `n` rất lớn (n=10^9), bạn chắc chắn cần thuật toán O(log n) hoặc O(1).

## Detailed Answer (EN)
Good questions demonstrate that you think like an engineer and do not rush into coding ambiguous requirements. Keep this checklist ready:\
\
1. **Input:** Can it be empty or null? What is the value range (negatives, overflow)? Is it sorted? Are there duplicates?\
2. **Output:** What should be returned if there is no valid answer?\
3. **Side effects:** Is it allowed to mutate the input data structure?\
4. **Priorities:** Should we optimize for Time or Space complexity?\
5. **Scale:** How large is `n`?\
\
*Hint:* Constraints act as algorithm hints. A small `n` allows brute force. A very large `n` usually forces an O(log n) or O(1) approach.

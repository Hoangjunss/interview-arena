---
id: khi-co-nhieu-solution-dung-nen-chon-solution-nao-trong-phong-van
position: backend
technology: decision-making
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi có nhiều solution đúng, nên chọn solution nào trong phỏng vấn?

## Question (EN)
When multiple solutions are correct, which one should you choose in an interview?

## Đáp án chi tiết (VI)
Không phải lúc nào solution asymptotic tốt nhất cũng là lựa chọn duy nhất. Hãy so sánh theo constraint: input size, memory limit, mutation allowed, readability, risk bug, và thời gian còn lại. Nếu n nhỏ, O(n log n) với code đơn giản có thể tốt hơn một thuật toán O(n) quá phức tạp và dễ sai. Nếu interviewer yêu cầu tối ưu, hãy trình bày đánh đổi: \\"Brute force O(n²) dễ hiểu nhưng không scale; sort O(n log n) mất thứ tự; HashMap O(n) dùng thêm memory.\\" Cách này cho thấy bạn biết engineering decision, không chỉ học thuộc pattern.

## Detailed Answer (EN)
Compare constraints: input size, memory limits, mutation rules, readability, bug risk, and remaining time. The best asymptotic solution is not always the best interview implementation if it is too complex and risky. Present trade-offs explicitly between brute force, sorting, hash maps, or more advanced patterns.

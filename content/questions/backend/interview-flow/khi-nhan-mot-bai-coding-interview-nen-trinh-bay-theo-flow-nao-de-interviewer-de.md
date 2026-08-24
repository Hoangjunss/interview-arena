---
id: khi-nhan-mot-bai-coding-interview-nen-trinh-bay-theo-flow-nao-de-interviewer-de
position: backend
technology: interview-flow
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nhận một bài coding interview, nên trình bày theo flow nào để interviewer dễ đánh giá?

## Question (EN)
What flow should you use when solving a coding interview problem?

## Đáp án chi tiết (VI)
Flow tốt nhất là:\
\
1. **Nhắc lại đề** bằng lời của mình để xác nhận hiểu đúng.\
2. **Hỏi constraints** (kích thước input, mảng đã sort chưa, có duplicate không, xử lý null/empty).\
3. **Đưa ra brute force** trước để có baseline.\
4. **Chỉ ra bottleneck** (điểm nghẽn hiệu suất).\
5. **Đề xuất pattern tối ưu** (như `HashMap`, `Two Pointers`, `Sliding Window`).\
6. **Code rõ ràng**, vừa viết vừa giải thích.\
7. **Chạy qua ví dụ (dry-run)** và test edge cases.\
8. **Chốt Time/Space Complexity**.\
\
**Điểm quan trọng:** Không im lặng quá lâu. Interviewer đánh giá cách bạn tư duy, trade-off và xử lý edge case chứ không chỉ nhìn đáp án cuối cùng.

## Detailed Answer (EN)
A strong flow is:\
\
1. **Restate the problem** to confirm understanding.\
2. **Clarify constraints** (input size, sorted/unsorted, duplicates, null/empty cases).\
3. **Propose a brute-force baseline**.\
4. **Name the bottleneck**.\
5. **Introduce the optimized pattern** (e.g., `HashMap`, `Two Pointers`).\
6. **Implement clearly** while thinking out loud.\
7. **Test with examples** and edge cases (dry-run).\
8. **Close with time and space complexity**.\
\
**Key takeaway:** Do not stay silent for too long. Interviewers evaluate your reasoning, trade-offs, and edge-case handling, not just the final code.

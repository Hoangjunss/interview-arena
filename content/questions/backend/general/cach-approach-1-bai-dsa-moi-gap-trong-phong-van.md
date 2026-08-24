---
id: cach-approach-1-bai-dsa-moi-gap-trong-phong-van
position: backend
technology: general
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách approach 1 bài DSA mới gặp trong phỏng vấn?

## Question (EN)
How to approach a new DSA problem in an interview?

## Đáp án chi tiết (VI)
**Flow chuẩn 8 bước:**\
\
1. **Nhắc lại đề** bằng lời mình. Confirm hiểu đúng.\
2. **Hỏi constraints:** size input, sorted chưa, có duplicate, edge case range.\
3. **Brute force trước.** Đưa ra cách thô O(n²) chứng minh logic đúng.\
4. **Chỉ ra bottleneck.** \\"Vòng for lồng nhau làm O(n²)\\".\
5. **Suggest pattern tối ưu.** Hash Map / Two-Pointer / Sliding Window / Binary Search...\
6. **Code rõ ràng,** vừa viết vừa giải thích. Identifier có nghĩa (`leftPointer`, `seen`, không phải `x`, `tmp`).\
7. **Dry-run với ví dụ.** Chạy code bằng tay trên 1-2 input.\
8. **Test edge cases + chốt Big-O.** Time O(?) Space O(?).\
\
**Anti-patterns:**\
- Im lặng quá 30s\
- Code ngay khi chưa hiểu đề\
- Optimize sớm khi chưa có baseline\
- Bỏ qua edge case rồi mới handle khi interviewer hỏi\
\
**Vàng:** \\"Em chưa từng gặp pattern này, nhưng nhìn cấu trúc input em nghĩ có thể thử X...\\" — interviewer thích thấy bạn reason, không phải trả bài học thuộc.

## Detailed Answer (EN)
8-step flow: restate, clarify constraints, brute force baseline, identify bottleneck, propose optimal pattern, code clearly, dry-run, test edge cases + Big-O. Avoid silence, premature optimization, and ignoring edges. Reasoning matters more than memorized solutions.

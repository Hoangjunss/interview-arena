---
id: lam-sao-trinh-bay-time-space-complexity-cho-thuyet-phuc
position: backend
technology: complexity-talk
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao trình bày time/space complexity cho thuyết phục?

## Question (EN)
How do you present time and space complexity convincingly?

## Đáp án chi tiết (VI)
Đừng chỉ phát ra một con số; hãy chỉ rõ nó đến từ đâu. Nói biến n, m đại diện cho gì, thao tác nào tốn nhất, và cộng/nhân ra sao. Ví dụ: \\"Em duyệt mảng một lần là O(n), mỗi bước tra hashmap O(1), nên tổng O(n) time; map lưu tối đa n phần tử nên O(n) space.\\" Phân biệt rõ time và space, và nêu cả average vs worst case khi khác nhau (hashmap worst O(n) lookup, quicksort worst O(n²)). Nếu có thể tối ưu space, hãy nói trade-off. Cách trình bày này cho thấy bạn hiểu bản chất chứ không học thuộc.

## Detailed Answer (EN)
Do not just emit a number; show where it comes from. State what n and m mean, which operation dominates, and how costs add or multiply: \\"One pass is O(n), each hashmap lookup is O(1), so O(n) time; the map holds up to n entries, so O(n) space.\\" Separate time from space, mention average versus worst case when they differ, and note any space trade-off. This shows understanding, not memorization.

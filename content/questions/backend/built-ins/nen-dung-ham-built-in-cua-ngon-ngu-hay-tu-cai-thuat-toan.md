---
id: nen-dung-ham-built-in-cua-ngon-ngu-hay-tu-cai-thuat-toan
position: backend
technology: built-ins
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nên dùng hàm built-in của ngôn ngữ hay tự cài thuật toán?

## Question (EN)
Should you use language built-ins or implement algorithms yourself?

## Đáp án chi tiết (VI)
Mặc định cứ dùng built-in (sort, hashmap, heap, set) vì nó cho code ngắn, ít bug và là điều một engineer thật sẽ làm. Nhưng phải hiểu nó làm gì bên dưới: biết `Arrays.sort` là O(n log n), biết khi nào nó stable, biết `HashMap` average O(1) nhưng worst O(n). Interviewer có thể hỏi \\"nếu không có thư viện thì sao\\" để kiểm tra bạn có thực sự hiểu — lúc đó mới cài tay. Ngược lại, nếu chính bài là cài đặt thuật toán (ví dụ \\"viết quicksort\\"), thì built-in không được tính. Hãy hỏi rõ kỳ vọng trước khi gọi hàm có sẵn.

## Detailed Answer (EN)
Default to built-ins (sort, hashmap, heap, set): shorter code, fewer bugs, and what a real engineer does. But understand them — know Arrays.sort is O(n log n), when it is stable, and that HashMap is average O(1) but worst O(n). If the interviewer asks \\"what if you had no library,\\" implement it then. If the task is the algorithm itself (\\"write quicksort\\"), built-ins do not count. Clarify expectations before reaching for a built-in.

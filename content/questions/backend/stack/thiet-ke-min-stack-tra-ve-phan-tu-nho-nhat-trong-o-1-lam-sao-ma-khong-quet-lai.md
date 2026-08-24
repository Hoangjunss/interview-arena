---
id: thiet-ke-min-stack-tra-ve-phan-tu-nho-nhat-trong-o-1-lam-sao-ma-khong-quet-lai
position: backend
technology: stack
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế Min Stack — trả về phần tử nhỏ nhất trong O(1), làm sao mà không quét lại?

## Question (EN)
Design a Min Stack returning the minimum in O(1) — how to avoid rescanning?

## Đáp án chi tiết (VI)
**Ý tưởng:** Dùng **stack phụ** lưu giá trị min tại từng thời điểm. Mỗi lần push, đẩy thêm `min(value, đỉnh stack min hiện tại)` vào stack min. Khi pop thì pop cả hai. `getMin()` chỉ là đọc đỉnh stack min — O(1).\
\
**Hình dung:** mỗi tầng của stack mang theo một tấm nhãn ghi \\"min của mọi thứ từ đây trở xuống\\" — gỡ tầng nào thì nhãn của tầng đó biến mất theo.\
\
```ts\
class MinStack {\
  private stack: number[] = []\
  private mins: number[] = []\
  push(val: number): void {\
    this.stack.push(val)\
    const min = this.mins.length ? Math.min(val, this.mins.at(-1)!) : val\
    this.mins.push(min)\
  }\
  pop(): void { this.stack.pop(); this.mins.pop() }\
  top(): number { return this.stack.at(-1)! }\
  getMin(): number { return this.mins.at(-1)! }\
}\
```\
\
**Độ phức tạp:** mọi thao tác O(1) thời gian; bộ nhớ O(n) phụ.\
\
**Lưu ý:** Cách tối ưu bộ nhớ hơn là chỉ push vào stack min khi gặp giá trị `\u003c=` min hiện tại, nhưng phải cẩn thận với giá trị trùng — cách \\"luôn push\\" trên an toàn và dễ đúng trong phỏng vấn.

## Detailed Answer (EN)
**Idea:** Use an **auxiliary stack** holding the min at each point. On each push, also push `min(value, current min top)` to the min stack. On pop, pop both. `getMin()` just reads the min stack's top — O(1).\
\
**Picture it:** each layer of the stack carries a sticky note reading \\"min of everything from here down\\" — remove a layer and its note goes with it.\
\
```ts\
class MinStack {\
  private stack: number[] = []\
  private mins: number[] = []\
  push(val: number): void {\
    this.stack.push(val)\
    const min = this.mins.length ? Math.min(val, this.mins.at(-1)!) : val\
    this.mins.push(min)\
  }\
  pop(): void { this.stack.pop(); this.mins.pop() }\
  top(): number { return this.stack.at(-1)! }\
  getMin(): number { return this.mins.at(-1)! }\
}\
```\
\
**Complexity:** all operations O(1) time; O(n) extra space.\
\
**Note:** A more memory-frugal variant pushes to the min stack only when value `\u003c=` current min, but you must handle duplicates carefully — the \\"always push\\" version is safe and easy to get right in interviews.

---
id: cac-thuat-toan-thay-trang-fifo-lru-va-optimal-khac-nhau-the-nao-belady-s-anomaly
position: backend
technology: bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các thuật toán thay trang FIFO, LRU và Optimal khác nhau thế nào? Belady’s Anomaly là gì?

## Question (EN)
How do the FIFO, LRU, and Optimal page-replacement algorithms differ? What is Belady’s Anomaly?

## Đáp án chi tiết (VI)
Khi bộ nhớ vật lý đầy mà cần nạp trang mới, OS phải chọn một trang để thay ra:\
\
- **FIFO**: thay trang được nạp vào sớm nhất. Đơn giản nhưng không quan tâm trang đó còn dùng nhiều hay không.\
- **LRU** (Least Recently Used): thay trang lâu nhất chưa được truy cập, dựa trên nguyên lý locality — trang vừa dùng thường sẽ được dùng lại. Xấp xỉ tốt Optimal nhưng tốn chi phí theo dõi thời điểm truy cập.\
- **Optimal** (OPT/Belady): thay trang sẽ được dùng xa nhất trong tương lai → số page fault tối thiểu. Nhưng cần biết trước tương lai nên chỉ dùng làm mốc so sánh, không cài đặt thực tế.\
\
**Belady’s Anomaly**: với FIFO, tăng số khung trang (frame) đôi khi lại làm page fault TĂNG thay vì giảm — trái trực giác. LRU và OPT không gặp hiện tượng này vì chúng thuộc lớp `stack algorithm`.

## Detailed Answer (EN)
When physical memory is full and a new page must be loaded, the OS must evict a page:\
\
- **FIFO**: evicts the oldest-loaded page. Simple but ignores whether it is still heavily used.\
- **LRU** (Least Recently Used): evicts the page unused for the longest time, based on locality — a recently used page tends to be used again. A good approximation of Optimal but costly to track access times.\
- **Optimal** (OPT/Belady): evicts the page that will be used furthest in the future → minimum page faults. But it requires knowing the future, so it serves only as a benchmark and is never implemented.\
\
**Belady’s Anomaly**: with FIFO, adding more frames can sometimes INCREASE page faults instead of reducing them — counterintuitive. LRU and OPT avoid this because they are `stack algorithms`.

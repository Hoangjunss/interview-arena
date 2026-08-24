---
id: quiz-java-phat-bieu-nao-dung-ve-khac-biet-gia-arraylist-va-linkedlist
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào đúng về khác biệt giữa ArrayList và LinkedList?

## Đáp án trắc nghiệm
- [x] ArrayList (mảng động) get(i) là O(1) và cache locality tốt; LinkedList get(i) là O(n)
- [ ] LinkedList truy cập get(i) O(1) vì mỗi node giữ sẵn con trỏ tới vị trí bất kỳ trong danh sách
- [ ] ArrayList là thread-safe còn LinkedList thì không, nên môi trường đa luồng phải dùng ArrayList
- [ ] LinkedList luôn nhanh hơn ArrayList khi thêm/xoá phần tử ở bất kỳ vị trí nào trong danh sách

## Giải thích (VI)
ArrayList dựa trên mảng động: get(i) O(1), bộ nhớ liên tục nên cache locality tốt — là lựa chọn mặc định cho List. LinkedList là doubly-linked list: get(i) O(n) phải duyệt node, tốn ~24 byte/phần tử cho node và con trỏ. Cần FIFO queue/deque thì dùng ArrayDeque — nhanh hơn LinkedList ở mọi thao tác.

### Giải thích các phương án:
- **ArrayList (mảng động) get(i) là O(1) và cache locality tốt; LinkedList get(i) là O(n)** (Đúng): Đúng: mảng liên tục cho truy cập theo index O(1) và thân thiện CPU cache; linked list phải duyệt node từ đầu/cuối tới vị trí i — ArrayList là lựa chọn mặc định cho List.
- **LinkedList truy cập get(i) O(1) vì mỗi node giữ sẵn con trỏ tới vị trí bất kỳ trong danh sách** (Sai): Node của LinkedList chỉ giữ con trỏ tới node kề trước/sau — muốn tới vị trí i phải duyệt lần lượt, nên get(i) là O(n).
- **ArrayList là thread-safe còn LinkedList thì không, nên môi trường đa luồng phải dùng ArrayList** (Sai): Cả hai đều KHÔNG thread-safe — khác biệt của chúng nằm ở cấu trúc dữ liệu (mảng vs linked list), không phải đồng bộ hoá.
- **LinkedList luôn nhanh hơn ArrayList khi thêm/xoá phần tử ở bất kỳ vị trí nào trong danh sách** (Sai): Thêm/xoá ở giữa vẫn phải DUYỆT tới vị trí đó O(n); thực tế ArrayList thường thắng nhờ cache locality — cần queue/deque thì ArrayDeque mới là lựa chọn đúng.

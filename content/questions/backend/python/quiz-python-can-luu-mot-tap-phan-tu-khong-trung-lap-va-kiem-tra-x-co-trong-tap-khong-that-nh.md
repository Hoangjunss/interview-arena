---
id: quiz-python-can-luu-mot-tap-phan-tu-khong-trung-lap-va-kiem-tra-x-co-trong-tap-khong-that-nh
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần lưu một tập phần tử KHÔNG trùng lặp và kiểm tra "X có trong tập không" thật nhanh — cấu trúc phù hợp nhất là gì?

## Đáp án trắc nghiệm
- [x] set — không trùng lặp, tra thành viên O(1)
- [ ] tuple — vì bất biến nên tra cứu nhanh
- [ ] list — vì nó giữ đúng thứ tự chèn
- [ ] dict — vì nó luôn nhanh nhất

## Giải thích (VI)
Chọn set. list = dãy có thứ tự, cho trùng, in là O(n); tuple = như list nhưng bất biến (làm key/bản ghi cố định), in cũng O(n); set = tập không trùng, kiểm tra thành viên O(1) trung bình; dict = ánh xạ key→value, lookup O(1) theo key. Cần "tập duy nhất + kiểm tra tồn tại nhanh" → set là khớp nhất.

### Giải thích các phương án:
- **set — không trùng lặp, tra thành viên O(1)** (Đúng): set đúng ngữ nghĩa "tập hợp phần tử duy nhất" và x in s là O(1) trung bình vì dùng hash — khớp chính xác yêu cầu. Nhờ hash table bên dưới.
- **tuple — vì bất biến nên tra cứu nhanh** (Sai): Bất biến không đồng nghĩa tra cứu nhanh; x in t vẫn là O(n) tuyến tính như list.
- **list — vì nó giữ đúng thứ tự chèn** (Sai): list cho phép trùng và x in lst phải quét tuyến tính O(n); thứ tự không phải yêu cầu ở đây.
- **dict — vì nó luôn nhanh nhất** (Sai): dict cũng cho lookup O(1) nhưng nó lưu cặp key→value; khi chỉ cần một tập phần tử (không có value đi kèm) thì set đúng ngữ nghĩa hơn.

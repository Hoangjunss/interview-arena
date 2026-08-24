---
id: quiz-react-virtual-dom-trong-react-la-gi-va-hoat-dong-nhu-the-nao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual DOM trong React là gì và hoạt động như thế nào?

## Đáp án trắc nghiệm
- [ ] Là cơ chế cache chuỗi HTML đã render để lần sau không phải render lại
- [ ] Là API có sẵn của trình duyệt mà React gọi để render nhanh hơn
- [x] Cây UI trong bộ nhớ; React diff cây mới với cây cũ rồi cập nhật DOM thật
- [ ] Là bản sao DOM chạy trong Web Worker, giúp React render trên nhiều thread

## Giải thích (VI)
Virtual DOM là representation trong memory của DOM thật. Khi state thay đổi, React tạo cây Virtual DOM mới, diff với cây cũ để tính ra tập thay đổi tối thiểu, rồi áp dụng vào DOM thật (reconciliation). Mục đích là giảm số thao tác DOM tốn kém, không phải lúc nào cũng nhanh hơn thao tác DOM trực tiếp.

### Giải thích các phương án:
- **Là cơ chế cache chuỗi HTML đã render để lần sau không phải render lại** (Sai): Virtual DOM không cache HTML string; React vẫn render lại component, chỉ tối ưu bước cập nhật DOM thật qua diffing.
- **Là API có sẵn của trình duyệt mà React gọi để render nhanh hơn** (Sai): Trình duyệt không cung cấp Virtual DOM; đây là khái niệm do thư viện (React) tự hiện thực bằng JavaScript.
- **Cây UI trong bộ nhớ; React diff cây mới với cây cũ rồi cập nhật DOM thật** (Đúng): Khi state thay đổi, React tạo cây mới, so sánh (diff) với cây cũ rồi áp dụng tập thay đổi tối thiểu lên DOM thật. Đúng cơ chế: tạo cây mới → diff với cây cũ → commit minimal changes lên DOM thật (reconciliation). React chỉ áp dụng tập thay đổi tối thiểu lên DOM thật — quá trình này gọi là reconciliation.
- **Là bản sao DOM chạy trong Web Worker, giúp React render trên nhiều thread** (Sai): Virtual DOM chỉ là cấu trúc object JavaScript trong memory, chạy trên main thread — không liên quan Web Worker hay đa luồng.

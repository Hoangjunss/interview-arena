---
id: quiz-angular-khi-nao-nen-dung-signal-va-khi-nao-nen-gi-observable-trong-angular
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Signal và khi nào nên giữ Observable trong Angular?

## Đáp án trắc nghiệm
- [ ] Observable đồng bộ còn Signal bất đồng bộ
- [ ] Signal chỉ dùng được trong template, không dùng được trong service
- [x] Signal cho state đồng bộ UI đọc; Observable cho luồng sự kiện theo thời gian
- [ ] Signal thay thế hoàn toàn RxJS; codebase hiện đại không nên còn Observable nào

## Giải thích (VI)
Signal biểu diễn state: luôn có giá trị hiện tại, đọc đồng bộ, hợp với thứ mà template cần hiển thị. Observable biểu diễn luồng sự kiện theo thời gian: HTTP, gõ phím có debounce, WebSocket, các luồng cần huỷ hoặc thử lại. Hai bên chuyển đổi qua lại bằng toSignal() và toObservable(), nên thực tế thường dùng Observable ở tầng dữ liệu và signal ở tầng hiển thị.

### Giải thích các phương án:
- **Observable đồng bộ còn Signal bất đồng bộ** (Sai): Ngược lại: signal đọc là có giá trị ngay; Observable có thể phát sau hoặc không phát.
- **Signal chỉ dùng được trong template, không dùng được trong service** (Sai): Signal dùng được ở service, và đó là cách phổ biến để đặt state chia sẻ.
- **Signal cho state đồng bộ UI đọc; Observable cho luồng sự kiện theo thời gian** (Đúng): Đúng: một bên là giá trị hiện tại (luôn có sẵn), một bên là chuỗi sự kiện cần các phép biến đổi như debounce, retry, huỷ request trước.
- **Signal thay thế hoàn toàn RxJS; codebase hiện đại không nên còn Observable nào** (Sai): HTTP, sự kiện người dùng theo thời gian và các phép huỷ/thử lại vẫn hợp với Observable hơn.

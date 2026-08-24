---
id: quiz-typescript-dau-trong-doan-code-sau-co-y-nghia-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dấu ! trong đoạn code sau có ý nghĩa gì?

## Đáp án trắc nghiệm
- [ ] Toán tử phủ định boolean — chuyển kết quả query thành true/false
- [ ] Tự động thay giá trị null bằng một element mặc định để code không bị lỗi
- [x] Non-null assertion — báo compiler rằng giá trị chắc chắn không phải null/undefined
- [ ] Kiểm tra null tại runtime và throw error với thông báo rõ ràng nếu element không tồn tại

## Giải thích (VI)
Đó là non-null assertion: báo compiler giá trị đứng trước chắc chắn không phải null/undefined, gỡ chúng khỏi kiểu tại compile time. Không có kiểm tra runtime — nếu element không tồn tại, code vẫn crash. Chỉ dùng khi chắc chắn giá trị có thật; an toàn hơn là optional chaining (?.) hoặc if check tường minh.

### Giải thích các phương án:
- **Toán tử phủ định boolean — chuyển kết quả query thành true/false** (Sai): Phủ định boolean là ! ĐỨNG TRƯỚC biểu thức (!el); dấu ! đứng SAU biểu thức là cú pháp riêng của TypeScript, không tồn tại trong JavaScript.
- **Tự động thay giá trị null bằng một element mặc định để code không bị lỗi** (Sai): Không có giá trị mặc định nào được tạo; gán fallback là việc của ?? (nullish coalescing) với giá trị do bạn cung cấp.
- **Non-null assertion — báo compiler rằng giá trị chắc chắn không phải null/undefined** (Đúng): Nếu thực tế là null thì vẫn crash tại runtime. querySelector trả Element | null; dấu ! gỡ null khỏi kiểu tại compile time nhưng không sinh kiểm tra nào — element không tồn tại vẫn gây lỗi khi chạy.
- **Kiểm tra null tại runtime và throw error với thông báo rõ ràng nếu element không tồn tại** (Sai): Không có code kiểm tra nào được sinh ra — ! bị xoá khi compile; muốn fail sớm có thông báo phải tự viết guard và throw.

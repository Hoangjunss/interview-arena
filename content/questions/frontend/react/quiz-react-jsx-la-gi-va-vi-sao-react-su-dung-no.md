---
id: quiz-react-jsx-la-gi-va-vi-sao-react-su-dung-no
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSX là gì và vì sao React sử dụng nó?

## Đáp án trắc nghiệm
- [x] Là cú pháp mở rộng của JavaScript cho phép viết markup giống HTML trong code JS
- [ ] Là chuỗi HTML mà React parse tại runtime rồi gắn vào trang bằng innerHTML
- [ ] Là template engine riêng của React, được trình duyệt thực thi trực tiếp mà không cần bước biên dịch
- [ ] Là cú pháp bắt buộc — không dùng JSX thì không thể viết ứng dụng React

## Giải thích (VI)
JSX (JavaScript XML) là cú pháp mở rộng của JavaScript cho phép viết markup giống HTML ngay trong code JS. React dùng JSX vì nó mô tả UI trực quan và cho phép đặt logic cùng markup trong một component. Trình duyệt không hiểu JSX — Babel hoặc SWC transpile nó thành lời gọi hàm tạo element (React.createElement / jsx) trước khi chạy.

### Giải thích các phương án:
- **Là cú pháp mở rộng của JavaScript cho phép viết markup giống HTML trong code JS** (Đúng): Trình duyệt không hiểu JSX nên Babel/SWC transpile nó thành lời gọi hàm tạo element trước khi chạy. Đúng: JSX là syntax extension, được compile thành React.createElement() (hoặc _jsx từ React 17) — trình duyệt chỉ chạy JavaScript thuần sau bước transpile.
- **Là chuỗi HTML mà React parse tại runtime rồi gắn vào trang bằng innerHTML** (Sai): JSX không phải string và không đi qua innerHTML — nó được compile thành lời gọi hàm trả về object element từ lúc build.
- **Là template engine riêng của React, được trình duyệt thực thi trực tiếp mà không cần bước biên dịch** (Sai): Trình duyệt không hiểu JSX — thiếu bước transpile (Babel/SWC) thì code JSX gây lỗi cú pháp ngay khi load.
- **Là cú pháp bắt buộc — không dùng JSX thì không thể viết ứng dụng React** (Sai): JSX chỉ là lớp tiện lợi; hoàn toàn có thể gọi trực tiếp React.createElement(type, props, children) — chỉ là code dài và khó đọc hơn.

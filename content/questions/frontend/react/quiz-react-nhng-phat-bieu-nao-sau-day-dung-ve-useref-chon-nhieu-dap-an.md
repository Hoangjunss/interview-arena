---
id: quiz-react-nhng-phat-bieu-nao-sau-day-dung-ve-useref-chon-nhieu-dap-an
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về useRef? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Thay đổi ref.current sẽ kích hoạt re-render giống như gọi setState
- [x] Dùng để truy cập DOM element trực tiếp, ví dụ focus input hoặc đo kích thước
- [ ] ref bị reset về giá trị khởi tạo sau mỗi lần component re-render

## Giải thích (VI)
useRef trả về object { current } giữ nguyên qua mọi lần render. Hai công dụng chính: (1) truy cập DOM element để thao tác imperative (focus, đo kích thước); (2) lưu giá trị mutable bền qua render mà không gây re-render khi thay đổi. Khác setState: đổi ref.current không kích hoạt render, và không nên đọc/ghi ref trong lúc render.

### Giải thích các phương án:
- **Thay đổi ref.current sẽ kích hoạt re-render giống như gọi setState** (Sai): Sai — đây chính là khác biệt cốt lõi với useState: React không theo dõi ref, thay đổi ref.current không gây render nào.
- **Dùng để truy cập DOM element trực tiếp, ví dụ focus input hoặc đo kích thước** (Đúng): Đúng — gắn ref vào element qua thuộc tính ref, sau đó thao tác imperative qua ref.current (focus, scrollIntoView, getBoundingClientRect).
- **ref bị reset về giá trị khởi tạo sau mỗi lần component re-render** (Sai): Sai — ref giữ nguyên object qua mọi lần render của cùng một component instance; chỉ khi unmount rồi mount lại mới tạo ref mới.

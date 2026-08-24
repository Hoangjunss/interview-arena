---
id: quiz-react-custom-hook-la-gi-va-dieu-gi-dung-ve-state-ben-trong-no
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom hook là gì và điều gì đúng về state bên trong nó?

## Đáp án trắc nghiệm
- [ ] Prefix "use" chỉ là quy ước đặt tên; bên trong custom hook không được phép gọi các hook có sẵn của React
- [ ] Các component cùng dùng một custom hook sẽ chia sẻ chung một state instance, giống như store toàn cục
- [ ] Custom hook là component không render UI, bắt buộc phải return JSX hoặc null
- [x] Là function tên bắt đầu bằng "use", có thể gọi hooks khác để tái sử dụng stateful logic

## Giải thích (VI)
Custom hook là function tên bắt đầu bằng "use", có thể gọi các hook khác (useState, useEffect...) để đóng gói và tái sử dụng stateful logic giữa các component. Điểm quan trọng: hook chia sẻ logic, không chia sẻ state — mỗi component gọi hook có state instance riêng, hoàn toàn độc lập.

### Giải thích các phương án:
- **Prefix "use" chỉ là quy ước đặt tên; bên trong custom hook không được phép gọi các hook có sẵn của React** (Sai): Ngược lại — gọi hook có sẵn bên trong chính là mục đích của custom hook; prefix "use" còn giúp ESLint áp Rules of Hooks cho nó.
- **Các component cùng dùng một custom hook sẽ chia sẻ chung một state instance, giống như store toàn cục** (Sai): Sai — đây là hiểu lầm phổ biến: useState bên trong hook gắn với component đang gọi nó; muốn state toàn cục cần Context hoặc store ngoài (Zustand...).
- **Custom hook là component không render UI, bắt buộc phải return JSX hoặc null** (Sai): Custom hook là function thường (return bất kỳ giá trị nào: value, tuple, object), không phải component và không return JSX.
- **Là function tên bắt đầu bằng "use", có thể gọi hooks khác để tái sử dụng stateful logic** (Đúng): Mỗi component dùng hook có instance state riêng biệt, không chia sẻ. Đúng: custom hook chia sẻ LOGIC chứ không chia sẻ STATE — mỗi lần gọi hook trong một component tạo state độc lập.

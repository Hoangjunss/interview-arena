---
id: quiz-react-usecallback-khac-usememo-nhu-the-nao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useCallback khác useMemo như thế nào?

## Đáp án trắc nghiệm
- [x] useCallback memoize chính function; useMemo memoize giá trị function trả về
- [ ] useCallback gọi function ngay lập tức và cache kết quả để các render sau dùng lại
- [ ] useCallback tự động ngăn child component re-render mà không cần React.memo ở phía child
- [ ] useMemo dùng để memoize function, useCallback dùng để memoize giá trị tính toán

## Giải thích (VI)
useCallback memoize chính function — giữ reference ổn định giữa các render; useMemo gọi function và memoize kết quả trả về. Đẳng thức: useCallback(fn, deps) tương đương useMemo(() => fn, deps). Dùng useCallback khi truyền callback xuống child bọc React.memo hoặc khi function là dependency của useEffect; useMemo cho tính toán tốn kém.

### Giải thích các phương án:
- **useCallback memoize chính function; useMemo memoize giá trị function trả về** (Đúng): Đúng: useCallback trả về function chưa gọi, useMemo trả về kết quả của function; đẳng thức useCallback(fn, deps) === useMemo(() => fn, deps) là cách nhớ chuẩn. Cách nhớ: useCallback(fn, deps) tương đương useMemo(() => fn, deps).
- **useCallback gọi function ngay lập tức và cache kết quả để các render sau dùng lại** (Sai): Đó là mô tả của useMemo — useCallback KHÔNG gọi function, nó chỉ giữ nguyên reference của function giữa các render.
- **useCallback tự động ngăn child component re-render mà không cần React.memo ở phía child** (Sai): Stable reference chỉ có tác dụng khi child được bọc React.memo (hoặc function nằm trong deps của effect); useCallback một mình không chặn re-render nào.
- **useMemo dùng để memoize function, useCallback dùng để memoize giá trị tính toán** (Sai): Đảo ngược vai trò: useCallback cho function, useMemo cho giá trị tính toán (dù useMemo(() => fn, deps) về kỹ thuật cũng memoize được function).

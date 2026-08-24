---
id: memoization-la-gi-usememo-usecallback-va-react-memo-khac-nhau-ra-sao
position: backend
technology: memoization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memoization là gì? `useMemo`, `useCallback` và `React.memo` khác nhau ra sao?

## Question (EN)
What is memoization? How do `useMemo`, `useCallback`, and `React.memo` differ?

## Đáp án chi tiết (VI)
Memoization = **lưu lại kết quả theo input**: khi input lặp lại, trả kết quả đã tính thay vì tính lại. Trong React có ba công cụ:\
\
- **`useMemo(fn, deps)`**: nhớ **giá trị** của một phép tính nặng; chỉ tính lại khi `deps` đổi.\
- **`useCallback(fn, deps)`**: nhớ **tham chiếu hàm** (để truyền xuống con mà không tạo hàm mới mỗi lần render).\
- **`React.memo(Component)`**: bọc một component để **bỏ re-render** khi props (so sánh **nông**) không đổi.\
\
Đừng lạm dụng: bản thân việc so sánh và lưu `deps` cũng tốn chi phí, chỉ dùng khi phép tính **thật sự nặng** hoặc khi chặn được re-render **đo lường được**. React Compiler tự memo hóa nên giảm nhu cầu làm thủ công.

## Detailed Answer (EN)
Memoization = **caching a result by its input**: when the input repeats, return the stored result instead of recomputing. React gives you three tools:\
\
- **`useMemo(fn, deps)`**: remembers the **value** of an expensive computation; recomputes only when `deps` change.\
- **`useCallback(fn, deps)`**: remembers a **function reference** (to pass to children without creating a new function each render).\
- **`React.memo(Component)`**: wraps a component to **skip re-render** when its props (**shallow** comparison) are unchanged.\
\
Do not overuse: the comparison and storing `deps` cost something too — use it only when the computation is **genuinely heavy** or when it prevents a **measurable** re-render. The React Compiler auto-memoizes, reducing the need to do this by hand.

---
id: hooks-trong-react-native-dung-the-nao-usestate-va-useeffect-khac-gi
position: backend
technology: react
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hooks trong React Native dùng thế nào? useState và useEffect khác gì?

## Question (EN)
How are hooks used in React Native and how do useState and useEffect differ?

## Đáp án chi tiết (VI)
RN dùng **cùng React hooks** như React web (hooks không gắn với DOM).\
\
- **`useState`**: khai báo state trong function component; gọi setter làm component **render lại**.\
- **`useEffect`**: chạy **side-effect** (gọi API, đăng ký listener, timer) sau khi render. Mảng dependency quyết định khi nào chạy lại; trả về hàm **cleanup** để gỡ listener/timer, tránh rò rỉ.\
- **`useCallback`/`useMemo`**: ghi nhớ hàm/giá trị để tránh tạo lại và render lại thừa (quan trọng với item của `FlatList`).\
- **`useRef`**: giữ giá trị/tham chiếu qua các lần render mà không gây render lại.\
\
Quy tắc hooks: chỉ gọi ở **top-level** của component (không trong if/loop) và chỉ trong React function → giữ thứ tự hook ổn định.

## Detailed Answer (EN)
RN uses the **same React hooks** as React web (hooks are not tied to the DOM).\
\
- **`useState`**: declares state in a function component; calling the setter **re-renders** the component.\
- **`useEffect`**: runs **side effects** (API calls, subscriptions, timers) after render. The dependency array controls when it re-runs; return a **cleanup** function to remove listeners/timers and avoid leaks.\
- **`useCallback`/`useMemo`**: memoize functions/values to avoid recreating them and needless re-renders (important for `FlatList` items).\
- **`useRef`**: keeps a value/reference across renders without triggering a re-render.\
\
Rules of hooks: call them only at the **top level** of a component (not in if/loop) and only inside React functions → keeping hook order stable.

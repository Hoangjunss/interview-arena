---
id: mot-component-react-re-render-trong-nhung-truong-hop-nao
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một component React re-render trong những trường hợp nào?

## Question (EN)
In which cases does a React component re-render?

## Đáp án chi tiết (VI)
Có đúng ba nguồn kích hoạt:\
\
1. **State của chính nó thay đổi** — gọi setter và giá trị mới khác giá trị cũ (so sánh bằng `Object.is`).\
2. **Component cha render lại** — mặc định mọi component con render theo, kể cả khi props không đổi. Đây là điểm nhiều người hiểu sai nhất.\
3. **Context mà nó `useContext` có value mới.**\
\
Props thay đổi **không** phải nguyên nhân độc lập: props chỉ đổi được khi cha đã render lại, mà cha render thì con render sẵn rồi.\
\
```jsx\
function Parent() {\
  const [count, setCount] = useState(0)\
  return (\
    \u003c\u003e\
      \u003cbutton onClick={() =\u003e setCount(count + 1)}\u003e{count}\u003c/button\u003e\
      \u003cChild /\u003e   {/* no props at all, still re-renders every click */}\
    \u003c/\u003e\
  )\
}\
```\
\
Điều này **không** có nghĩa app chậm. Render là chạy lại hàm component để tính ra mô tả UI; React so sánh kết quả rồi chỉ ghi vào DOM phần thực sự khác. Chỉ tối ưu khi đo được là chậm.

## Detailed Answer (EN)
There are exactly three triggers:\
\
1. **Its own state changed** — a setter was called with a value different from the current one (compared with `Object.is`).\
2. **Its parent re-rendered** — by default every child re-renders too, even when its props are identical. This is the most commonly misunderstood part.\
3. **A context it reads via `useContext` got a new value.**\
\
Changing props is **not** an independent trigger: props can only change if the parent re-rendered, and when the parent renders the child renders anyway.\
\
```jsx\
function Parent() {\
  const [count, setCount] = useState(0)\
  return (\
    \u003c\u003e\
      \u003cbutton onClick={() =\u003e setCount(count + 1)}\u003e{count}\u003c/button\u003e\
      \u003cChild /\u003e   {/* no props at all, still re-renders every click */}\
    \u003c/\u003e\
  )\
}\
```\
\
This does **not** mean the app is slow. Rendering means calling the component function to produce a UI description; React diffs it and writes only the actual differences to the DOM. Optimize only when you have measured a problem.

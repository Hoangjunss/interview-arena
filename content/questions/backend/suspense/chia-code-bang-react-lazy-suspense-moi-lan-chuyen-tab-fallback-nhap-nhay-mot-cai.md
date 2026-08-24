---
id: chia-code-bang-react-lazy-suspense-moi-lan-chuyen-tab-fallback-nhap-nhay-mot-cai
position: backend
technology: suspense
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chia code bằng `React.lazy` + `Suspense`, mỗi lần chuyển tab fallback nhấp nháy một cái rồi biến mất. Vì sao và xử lý thế nào?

## Question (EN)
With `React.lazy` + `Suspense` for code splitting, the fallback flashes for an instant on every tab switch. Why, and how do you fix it?

## Đáp án chi tiết (VI)
Nhấp nháy vì chunk tải rất nhanh (vài chục ms): React kịp hiện fallback rồi thay ngay bằng nội dung thật, mắt người đọc thành một cú giật.\
\
**Các cách xử lý, theo thứ tự nên thử:**\
\
1. **Đánh dấu chuyển tab là transition.** Trong transition, React **giữ nguyên UI cũ** trong lúc chờ thay vì rơi vào fallback — đây là cách đúng nhất cho điều hướng.\
\
```jsx\
const [isPending, startTransition] = useTransition()\
\
function openTab(next) {\
  startTransition(() =\u003e setTab(next))\
}\
// keep the old tab visible, dim it while isPending\
```\
\
2. **Preload chunk trước khi cần**: gọi hàm import khi người dùng hover/focus vào nút tab, để lúc bấm thì chunk đã nằm trong cache.\
\
3. **Đừng cắt lazy quá nhỏ.** Một tab vài KB không đáng phải trả giá bằng một vòng loading; chỉ lazy những màn hình thật sự nặng (editor, chart, map).\
\
Skeleton \\"chờ tối thiểu 300ms\\" là giải pháp cuối, vì nó làm màn hình chậm đi có chủ đích.

## Detailed Answer (EN)
It flashes because the chunk loads very fast (tens of ms): React shows the fallback and immediately swaps in the real content, which reads as a jolt.\
\
**Fixes, in the order to try them:**\
\
1. **Mark the tab switch as a transition.** During a transition React **keeps the previous UI on screen** instead of falling back — the correct fix for navigation.\
\
```jsx\
const [isPending, startTransition] = useTransition()\
\
function openTab(next) {\
  startTransition(() =\u003e setTab(next))\
}\
// keep the old tab visible, dim it while isPending\
```\
\
2. **Preload the chunk before it is needed**: call the import function on hover/focus of the tab button so the chunk is cached by the time it is clicked.\
\
3. **Do not split too finely.** A few-KB tab is not worth a loading round trip; lazy-load only genuinely heavy screens (editor, chart, map).\
\
A \\"minimum 300ms skeleton\\" is the last resort, since it deliberately makes the screen slower.

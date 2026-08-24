---
id: kiem-tra-dau-ngoac-hop-le-valid-parentheses-bang-stack-vi-sao-stack-la-cau-truc
position: backend
technology: stack
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm tra dấu ngoặc hợp lệ (Valid Parentheses) bằng stack — vì sao stack là cấu trúc đúng?

## Question (EN)
Validate parentheses using a stack — why is a stack the right structure?

## Đáp án chi tiết (VI)
**Ý tưởng:** Quét chuỗi, gặp ngoặc mở thì push, gặp ngoặc đóng thì pop và kiểm tra có khớp loại không. Cuối cùng stack rỗng mới hợp lệ.\
\
**Vì sao stack:** quy tắc khớp ngoặc là **LIFO** — ngoặc mở gần nhất phải đóng trước. Đó đúng là bản chất của stack.\
\
```ts\
function isValid(s: string): boolean {\
  const pairs: Record\u003cstring, string\u003e = { ')': '(', ']': '[', '}': '{' }\
  const stack: string[] = []\
  for (const ch of s) {\
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)\
    else if (stack.pop() !== pairs[ch]) return false\
  }\
  return stack.length === 0\
}\
```\
\
**Độ phức tạp:** thời gian O(n), bộ nhớ O(n) (xấu nhất toàn ngoặc mở).\
\
**Lưu ý:** Hai bẫy hay quên — (1) stack rỗng mà gặp ngoặc đóng (`pop()` trả `undefined`, vẫn xử đúng nhờ so sánh khác), (2) cuối vòng còn ngoặc mở chưa đóng nên phải check `stack.length === 0`.

## Detailed Answer (EN)
**Idea:** Scan the string; on an opening bracket push, on a closing bracket pop and check the type matches. Valid only if the stack ends empty.\
\
**Why a stack:** bracket matching is **LIFO** — the most recently opened bracket must close first. That's exactly a stack's behavior.\
\
```ts\
function isValid(s: string): boolean {\
  const pairs: Record\u003cstring, string\u003e = { ')': '(', ']': '[', '}': '{' }\
  const stack: string[] = []\
  for (const ch of s) {\
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)\
    else if (stack.pop() !== pairs[ch]) return false\
  }\
  return stack.length === 0\
}\
```\
\
**Complexity:** time O(n), space O(n) (worst case all opening brackets).\
\
**Note:** Two easy traps — (1) a closing bracket with an empty stack (`pop()` returns `undefined`, still handled by the mismatch), (2) leftover opening brackets at the end, so check `stack.length === 0`.

---
id: keyextractor-trong-flatlist-quan-trong-the-nao
position: backend
technology: components-\u0026-ui
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`keyExtractor` trong FlatList quan trọng thế nào?

## Question (EN)
How important is `keyExtractor` in FlatList?

## Đáp án chi tiết (VI)
`keyExtractor` trả về unique string cho mỗi item, để React reconciler biết phân biệt khi data thay đổi (giống `key` prop trong list React thường).\
\
```tsx\
\u003cFlatList\
  data={users}\
  keyExtractor={(item) =\u003e item.id.toString()}\
  renderItem={({ item }) =\u003e \u003cUserRow user={item} /\u003e}\
/\u003e\
```\
\
Nếu **không** cung cấp, FlatList fallback dùng `item.key` rồi `item.id`, cuối cùng là index. Dùng index gây bugs nghiêm trọng:\
- Xóa item ở giữa → các item sau \\"shift\\" key, RN tưởng là item cũ đổi nội dung → state internal (textinput, animation, scroll position con) chuyển nhầm sang item khác.\
- Animation transition không match: item mới fade-in trông như item cũ đổi data.\
\
Quy tắc: luôn dùng id thật từ backend, hoặc UUID stable. Đừng dùng `Math.random()` — mỗi render sinh key mới làm toàn bộ list re-render từ đầu.

## Detailed Answer (EN)
`keyExtractor` returns a unique string per item so React's reconciler can tell items apart when data changes (the same as the `key` prop in a regular React list).\
\
```tsx\
\u003cFlatList\
  data={users}\
  keyExtractor={(item) =\u003e item.id.toString()}\
  renderItem={({ item }) =\u003e \u003cUserRow user={item} /\u003e}\
/\u003e\
```\
\
Without it, FlatList falls back to `item.key`, then `item.id`, then index. Using index causes serious bugs:\
- Deleting a middle item shifts subsequent keys; RN thinks old items changed content, so internal state (TextInput value, animation, child scroll position) jumps to the wrong row.\
- Animation transitions mismatch: a new item fade-in looks like an old item swapping data.\
\
Rule: always use a real backend id or a stable UUID. Never use `Math.random()` — a new key every render forces the whole list to re-render from scratch.

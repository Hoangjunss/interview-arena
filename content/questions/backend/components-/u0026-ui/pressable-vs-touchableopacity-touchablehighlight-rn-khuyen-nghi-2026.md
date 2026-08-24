---
id: pressable-vs-touchableopacity-touchablehighlight-rn-khuyen-nghi-2026
position: backend
technology: components-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Pressable` vs `TouchableOpacity` / `TouchableHighlight` — RN khuyến nghị 2026?

## Question (EN)
`Pressable` vs `TouchableOpacity` / `TouchableHighlight` — what does RN recommend in 2026?

## Đáp án chi tiết (VI)
**`Pressable`** (recommend từ RN 0.63+): API hiện đại, một component thay cho cả family `Touchable*`. Function children có signature `({ pressed }) =\u003e ReactNode` để render khác state, hoặc style function `style={({ pressed }) =\u003e [...]}` để áp style động. Hỗ trợ `onLongPress`, `delayLongPress`, `hitSlop`, `pressRetentionOffset`.\
\
```tsx\
\u003cPressable\
  onPress={...}\
  style={({ pressed }) =\u003e [styles.btn, pressed \u0026\u0026 { opacity: 0.6 }]}\
  hitSlop={10}\
\u003e\
  \u003cText\u003eSubmit\u003c/Text\u003e\
\u003c/Pressable\u003e\
```\
\
**`TouchableOpacity`**: opacity flash khi press (default 0.2). Ngắn gọn hơn cho case đơn giản.\
\
**`TouchableHighlight`**: đổi `underlayColor` khi press — phù hợp list row.\
\
**`TouchableWithoutFeedback`**: không feedback gì — chỉ dùng cho overlay invisible (vd dismiss keyboard).\
\
Quy tắc 2026: **default `Pressable`** cho mọi nút mới. `Touchable*` để legacy code yên — không cần migrate ồ ạt vì performance và hành vi tương đương.

## Detailed Answer (EN)
**`Pressable`** (recommended since RN 0.63+) is the modern API — one component replacing the entire `Touchable*` family. Children can be a function `({ pressed }) =\u003e ReactNode` for state-aware rendering, or `style={({ pressed }) =\u003e [...]}` for state-aware styles. Supports `onLongPress`, `delayLongPress`, `hitSlop`, `pressRetentionOffset`.\
\
```tsx\
\u003cPressable\
  onPress={...}\
  style={({ pressed }) =\u003e [styles.btn, pressed \u0026\u0026 { opacity: 0.6 }]}\
  hitSlop={10}\
\u003e\
  \u003cText\u003eSubmit\u003c/Text\u003e\
\u003c/Pressable\u003e\
```\
\
**`TouchableOpacity`**: flashes opacity on press (default 0.2). Shorter for simple cases.\
\
**`TouchableHighlight`**: switches `underlayColor` on press — fits list rows.\
\
**`TouchableWithoutFeedback`**: no feedback — only for invisible overlays (e.g. tap-to-dismiss keyboard).\
\
Rule of thumb in 2026: **default to `Pressable`** for any new button. Leave `Touchable*` alone in legacy code — performance and behaviour are equivalent so a mass migration is not worth it.

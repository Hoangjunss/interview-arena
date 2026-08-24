---
id: jsx-trong-react-native-khac-jsx-web-ra-sao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSX trong React Native khác JSX web ra sao?

## Question (EN)
How is JSX in React Native different from web JSX?

## Đáp án chi tiết (VI)
Cú pháp JSX giống hệt — `{}` cho expression, `className` không tồn tại (RN dùng `style`), nhưng **set tag hợp lệ khác hoàn toàn**. Web JSX cho phép mọi HTML element vì cuối cùng compile ra DOM. RN JSX **chỉ** chấp nhận các component được export từ `react-native` hoặc do bạn viết — không có `\u003cdiv\u003e`, `\u003cspan\u003e`, `\u003cp\u003e`, `\u003cbutton\u003e`, `\u003cinput\u003e`, `\u003ca\u003e`, `\u003cul\u003e`/`\u003cli\u003e`.\
\
Mapping thường dùng:\
- `\u003cdiv\u003e` → `\u003cView\u003e`\
- `\u003cspan\u003e`/`\u003cp\u003e`/`\u003ch1\u003e` → `\u003cText\u003e`\
- `\u003cbutton\u003e` → `\u003cPressable\u003e` hoặc `\u003cTouchableOpacity\u003e`\
- `\u003cinput\u003e` → `\u003cTextInput\u003e`\
- `\u003cimg\u003e` → `\u003cImage source={{ uri: ... }} /\u003e`\
- `\u003ca\u003e` → `\u003cPressable onPress={() =\u003e Linking.openURL(...)}\u003e`\
\
Thuộc tính `style` cũng nhận object JS thay vì string CSS, và không có pseudo-class (`:hover`, `:focus`) — phải tự xử qua state.

## Detailed Answer (EN)
The JSX syntax is identical — `{}` for expressions, but `className` does not exist (RN uses `style`), and **the valid tag set is completely different**. Web JSX accepts any HTML element because it compiles to DOM. RN JSX **only** accepts components exported from `react-native` or ones you author — there is no `\u003cdiv\u003e`, `\u003cspan\u003e`, `\u003cp\u003e`, `\u003cbutton\u003e`, `\u003cinput\u003e`, `\u003ca\u003e`, `\u003cul\u003e`/`\u003cli\u003e`.\
\
Common mapping:\
- `\u003cdiv\u003e` → `\u003cView\u003e`\
- `\u003cspan\u003e`/`\u003cp\u003e`/`\u003ch1\u003e` → `\u003cText\u003e`\
- `\u003cbutton\u003e` → `\u003cPressable\u003e` or `\u003cTouchableOpacity\u003e`\
- `\u003cinput\u003e` → `\u003cTextInput\u003e`\
- `\u003cimg\u003e` → `\u003cImage source={{ uri: ... }} /\u003e`\
- `\u003ca\u003e` → `\u003cPressable onPress={() =\u003e Linking.openURL(...)}\u003e`\
\
The `style` prop takes a JS object instead of a CSS string, and there are no pseudo-classes (`:hover`, `:focus`) — handle via state.

---
id: safeareaview-built-in-vs-react-native-safe-area-context-vi-sao-team-thuong-thay
position: backend
technology: components-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`SafeAreaView` built-in vs `react-native-safe-area-context` — vì sao team thường thay built-in?

## Question (EN)
Built-in `SafeAreaView` vs `react-native-safe-area-context` — why do teams replace the built-in?

## Đáp án chi tiết (VI)
RN core có `\u003cSafeAreaView\u003e`, hoạt động trên **iOS only** (đặt padding theo notch/home indicator). Trên Android render như `\u003cView\u003e` thường — không có effect. Bị deprecate-ish và **không** xử lý đúng khi rotate hay multi-window.\
\
**`react-native-safe-area-context`** (lib mặc định trong Expo) cung cấp:\
- Hoạt động cả iOS và Android (Android có status bar inset, gesture nav inset từ Android 10+).\
- `useSafeAreaInsets()` hook trả `{ top, right, bottom, left }` numeric — dễ tùy biến hơn component bao toàn bộ.\
- `SafeAreaProvider` ở root để inset context lan xuống mọi screen.\
- Update đúng khi rotate, split-screen, foldable.\
\
Pattern phổ biến:\
```tsx\
const insets = useSafeAreaInsets()\
\u003cView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} /\u003e\
```\
\
Dùng `\u003cSafeAreaView edges={['top']}\u003e` từ lib này khi muốn chỉ thoát notch trên (vd screen có tab bar bottom riêng).

## Detailed Answer (EN)
RN core ships `\u003cSafeAreaView\u003e` that only works on **iOS** (padding around notch/home indicator). On Android it is a plain `\u003cView\u003e`. It is also flaky on rotation and multi-window.\
\
**`react-native-safe-area-context`** (default in Expo) provides:\
- Works on both iOS and Android (Android status-bar inset and gesture-nav inset from Android 10+).\
- `useSafeAreaInsets()` hook returns `{ top, right, bottom, left }` numbers — far more flexible than a wrapper component.\
- `SafeAreaProvider` at the root so insets cascade to every screen.\
- Updates correctly on rotation, split-screen, foldables.\
\
Common pattern:\
```tsx\
const insets = useSafeAreaInsets()\
\u003cView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} /\u003e\
```\
\
Use `\u003cSafeAreaView edges={['top']}\u003e` from this library when you only want to clear the notch (e.g. a screen with its own bottom tab bar).

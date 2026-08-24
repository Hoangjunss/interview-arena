---
id: platform-os-platform-select-khi-nao-dung-khi-nao-tach-file-ios-tsx-android-tsx
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Platform.OS` / `Platform.select` — khi nào dùng, khi nào tách file `.ios.tsx` / `.android.tsx`?

## Question (EN)
`Platform.OS` / `Platform.select` — when to use them, when to split into `.ios.tsx` / `.android.tsx` files?

## Đáp án chi tiết (VI)
**Inline check (`Platform.OS` / `Platform.select`)** dùng cho **khác biệt nhỏ** trong cùng một component:\
\
```tsx\
const styles = StyleSheet.create({\
  shadow: Platform.select({\
    ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4 },\
    android: { elevation: 4 },\
  }),\
})\
```\
\
**Tách file (`Component.ios.tsx` + `Component.android.tsx`)** dùng khi:\
- Code khác biệt nhiều (\u003e30%) — vd map view dùng `react-native-maps` iOS gọi Apple Maps, Android gọi Google Maps qua key khác.\
- Native module chỉ tồn tại một bên.\
- Performance: tránh ship code không dùng — Metro bundler tự pick `.ios.tsx` cho iOS, `.android.tsx` cho Android, code platform khác không vào bundle.\
\
Đánh đổi: tách file khó maintain (logic share phải extract ra `Component.shared.ts`), nên chỉ tách khi thật sự cần. Còn `Platform.OS === 'ios'` rải rác hơn 5–6 chỗ trong file thì chính là tín hiệu nên tách.

## Detailed Answer (EN)
**Inline checks (`Platform.OS` / `Platform.select`)** are for **small differences** within one component:\
\
```tsx\
const styles = StyleSheet.create({\
  shadow: Platform.select({\
    ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4 },\
    android: { elevation: 4 },\
  }),\
})\
```\
\
**Split files (`Component.ios.tsx` + `Component.android.tsx`)** when:\
- The code differs significantly (\u003e30%) — e.g. a map view that uses `react-native-maps` against Apple Maps on iOS and Google Maps on Android with different keys.\
- A native module exists on only one platform.\
- Performance: avoid shipping unused code — Metro picks `.ios.tsx` for iOS and `.android.tsx` for Android, the other platform's code does not enter the bundle.\
\
Trade-off: splitting hurts maintainability (shared logic must be extracted to `Component.shared.ts`), so split only when it pays off. If you have 5–6 `Platform.OS === 'ios'` checks scattered in one file, that is the signal to split.

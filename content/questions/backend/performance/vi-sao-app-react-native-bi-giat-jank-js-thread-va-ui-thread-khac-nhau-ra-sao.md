---
id: vi-sao-app-react-native-bi-giat-jank-js-thread-va-ui-thread-khac-nhau-ra-sao
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao app React Native bị giật (jank)? JS thread và UI thread khác nhau ra sao?

## Question (EN)
Why do React Native apps jank, and how do the JS thread and UI thread differ?

## Đáp án chi tiết (VI)
RN chạy hai luồng chính, mỗi luồng đều cần đạt **~60fps (16ms/frame)**:\
\
- **JS thread**: chạy logic React, xử lý sự kiện, quyết định UI. Nếu bận (tính toán nặng, render list lớn, quá nhiều `console.log`), JS **không kịp trả frame** → giật khi cuộn/tương tác.\
- **UI (native/main) thread**: đo đạc, vẽ, xử lý animation native. Nghẽn khi tạo/biến đổi quá nhiều view.\
\
Nguyên nhân \u0026 cách giảm jank:\
- **Test trên bản release** (dev mode chậm hơn nhiều).\
- Gỡ `console.log` ở production; đẩy việc nặng ra khỏi lúc animation (`InteractionManager`).\
- Dùng list ảo hóa (`FlatList` + `getItemLayout`), tránh re-render thừa.\
- Animation nên chạy native (`useNativeDriver` hoặc Reanimated) để không phụ thuộc JS thread.\
\
Hay hỏi: vì sao animation trên JS thread dễ giật hơn native.

## Detailed Answer (EN)
RN runs two main threads, each needing to hit **~60fps (16ms/frame)**:\
\
- **JS thread**: runs React logic, handles events, decides the UI. If busy (heavy computation, rendering big lists, too many `console.log`s), JS **misses the frame deadline** → jank while scrolling/interacting.\
- **UI (native/main) thread**: measures, paints, handles native animation. It congests when too many views are created/transformed.\
\
Causes \u0026 how to reduce jank:\
- **Test on release builds** (dev mode is much slower).\
- Remove `console.log` in production; move heavy work out of animation (`InteractionManager`).\
- Use virtualized lists (`FlatList` + `getItemLayout`), avoid needless re-renders.\
- Run animations natively (`useNativeDriver` or Reanimated) so they do not depend on the JS thread.\
\
Common ask: why JS-thread animations jank more than native ones.

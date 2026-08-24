---
id: react-navigation-la-gi-cac-loai-navigator-pho-bien
position: backend
technology: navigation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Navigation là gì? Các loại navigator phổ biến?

## Question (EN)
What is React Navigation and what are the common navigator types?

## Đáp án chi tiết (VI)
React Navigation là thư viện điều hướng phổ biến nhất cho RN, cung cấp **routing + UI điều hướng** chuẩn mobile, có type-safe với TypeScript.\
\
Các navigator chính:\
- **Stack Navigator**: chồng màn (push/pop) với hiệu ứng chuyển và header — luồng đi sâu vào chi tiết.\
- **Tab Navigator**: thanh tab dưới cùng chuyển giữa các nhánh song song.\
- **Drawer Navigator**: menu trượt bên.\
\
Khái niệm:\
- **NavigationContainer** bọc toàn bộ; điều hướng bằng `navigation.navigate('Detail', { id })`, đọc tham số qua `route.params`.\
- Hỗ trợ **deep linking** (map URL → màn) sẵn.\
\
Hay hỏi: khác biệt `navigate` vs `push`, cách truyền và nhận params, lồng navigator (nested).

## Detailed Answer (EN)
React Navigation is the most popular navigation library for RN, providing standard mobile **routing + navigation UI**, type-safe with TypeScript.\
\
Main navigators:\
- **Stack Navigator**: stacks screens (push/pop) with transitions and a header — flows that drill into detail.\
- **Tab Navigator**: a bottom tab bar switching between parallel branches.\
- **Drawer Navigator**: a side slide-out menu.\
\
Concepts:\
- **NavigationContainer** wraps everything; navigate with `navigation.navigate('Detail', { id })`, read params via `route.params`.\
- Built-in **deep linking** support (map URL → screen).\
\
Common ask: `navigate` vs `push`, passing/receiving params, and nesting navigators.

---
id: layout-trong-react-native-hoat-dong-the-nao-flexbox-khac-gi-tren-web
position: backend
technology: layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Layout trong React Native hoạt động thế nào? Flexbox khác gì trên web?

## Question (EN)
How does layout work in React Native and how does Flexbox differ from the web?

## Đáp án chi tiết (VI)
RN layout bằng **Flexbox** (engine Yoga), viết style bằng object JS qua `StyleSheet.create`.\
\
Thuộc tính chính: `flexDirection`, `justifyContent` (trục chính), `alignItems` (trục chéo), `flex`, `flexWrap`, `gap`.\
\
Khác biệt so với web:\
- **`flexDirection` mặc định là `column`** (web là `row`) — hợp layout dọc của mobile.\
- Không có CSS/class; **mỗi component có style riêng**, không cascade/inheritance như CSS.\
- Đơn vị là **số density-independent pixel** (không px/%/rem như web); dùng `Dimensions`/`useWindowDimensions` hoặc `%` cho co giãn.\
- Không có grid/float; layout chủ yếu dựa Flexbox và `position` (relative/absolute).\
\
Hay hỏi: cách làm responsive (Flexbox + phần trăm + Dimensions) và vì sao style không kế thừa.

## Detailed Answer (EN)
RN lays out with **Flexbox** (the Yoga engine), writing styles as JS objects via `StyleSheet.create`.\
\
Main properties: `flexDirection`, `justifyContent` (main axis), `alignItems` (cross axis), `flex`, `flexWrap`, `gap`.\
\
Differences from the web:\
- **`flexDirection` defaults to `column`** (web defaults to `row`) — matching mobile's vertical layouts.\
- No CSS/classes; **each component has its own style**, with no CSS cascade/inheritance.\
- Units are **density-independent numbers** (no px/%/rem like web); use `Dimensions`/`useWindowDimensions` or `%` for flexibility.\
- No grid/float; layout relies on Flexbox and `position` (relative/absolute).\
\
Common ask: how to make it responsive (Flexbox + percentages + Dimensions) and why styles do not inherit.

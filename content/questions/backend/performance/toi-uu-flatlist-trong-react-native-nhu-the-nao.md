---
id: toi-uu-flatlist-trong-react-native-nhu-the-nao
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu FlatList trong React Native như thế nào?

## Question (EN)
How do you optimize FlatList in React Native?

## Đáp án chi tiết (VI)
`FlatList` là list **ảo hóa** (chỉ render item quanh viewport). Với list lớn, tối ưu:\
\
Cấu hình props:\
- **`getItemLayout`**: nếu item cao cố định → bỏ đo đạc, cuộn nhanh và mượt hơn.\
- **`initialNumToRender`, `maxToRenderPerBatch`, `windowSize`**: cân bằng giữa vùng trắng (blank) khi cuộn nhanh và bộ nhớ/độ mượt.\
- **`removeClippedSubviews`**: tháo view ngoài viewport.\
- **`keyExtractor`** ổn định để tái dùng đúng.\
\
Item component:\
- Bọc bằng **`React.memo`**, giữ item **nhẹ và ít logic**.\
- Dùng **`useCallback`** cho `renderItem` (tránh hàm ẩn danh tạo mới mỗi render).\
- Ảnh dùng bản cache/tối ưu.\
\
Hay hỏi: vì sao dùng `FlatList` thay vì `.map()` trong `ScrollView` (ScrollView render tất cả một lúc → tốn bộ nhớ).

## Detailed Answer (EN)
`FlatList` is a **virtualized** list (renders only items near the viewport). For large lists, optimize:\
\
Config props:\
- **`getItemLayout`**: for fixed-height items → skip measurement, faster/smoother scrolling.\
- **`initialNumToRender`, `maxToRenderPerBatch`, `windowSize`**: balance blank areas during fast scroll against memory/smoothness.\
- **`removeClippedSubviews`**: detaches off-viewport views.\
- A stable **`keyExtractor`** for correct reuse.\
\
Item component:\
- Wrap in **`React.memo`**, keep items **light with little logic**.\
- Use **`useCallback`** for `renderItem` (avoid a new anonymous function each render).\
- Use cached/optimized images.\
\
Common ask: why use `FlatList` over `.map()` inside a `ScrollView` (ScrollView renders everything at once → high memory).

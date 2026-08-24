---
id: responsive-va-adaptive-ui-trong-mobile-khac-nhau-the-nao
position: backend
technology: responsive-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Responsive và adaptive UI trong mobile khác nhau thế nào?

## Question (EN)
How do responsive and adaptive UI differ in mobile?

## Đáp án chi tiết (VI)
Cả hai giúp app dùng tốt trên nhiều kích thước (điện thoại, tablet, gập, desktop) nhưng khác trọng tâm:\
\
- **Responsive**: **điều chỉnh cách sắp xếp** UI cho **vừa** không gian có sẵn — co giãn, đổi số cột, xuống dòng. Ví dụ: 1 cột trên điện thoại → 2–3 cột trên tablet.\
- **Adaptive**: **chọn layout/kiểu tương tác phù hợp** để **dùng được tốt** trong không gian đó — không chỉ vừa mà còn hợp thiết bị/đầu vào (chuột vs chạm), ví dụ đổi bottom nav (phone) thành navigation rail (tablet).\
\
Công cụ:\
- Flutter: `LayoutBuilder`, `MediaQuery`, `Flexible`/`Expanded`, breakpoint; `SafeArea` tránh tai thỏ.\
- Android: window size classes, ConstraintLayout/Compose adaptive.\
- RN: Flexbox + `useWindowDimensions`, phần trăm.\
\
Hay hỏi: đừng hardcode kích thước cố định; dùng breakpoint + đơn vị co giãn và luôn kiểm thử nhiều màn.

## Detailed Answer (EN)
Both help an app work well across many sizes (phone, tablet, foldable, desktop) but differ in emphasis:\
\
- **Responsive**: **adjusts the arrangement** of the UI to **fit** the available space — resizing, changing column counts, wrapping. E.g. 1 column on a phone → 2–3 columns on a tablet.\
- **Adaptive**: **picks a suitable layout/interaction style** so the UI is **usable** in that space — not just fitting but matching the device/input (mouse vs touch), e.g. bottom nav (phone) becoming a navigation rail (tablet).\
\
Tools:\
- Flutter: `LayoutBuilder`, `MediaQuery`, `Flexible`/`Expanded`, breakpoints; `SafeArea` for notches.\
- Android: window size classes, ConstraintLayout/Compose adaptive.\
- RN: Flexbox + `useWindowDimensions`, percentages.\
\
Common ask: do not hardcode fixed sizes; use breakpoints + flexible units and always test multiple screens.

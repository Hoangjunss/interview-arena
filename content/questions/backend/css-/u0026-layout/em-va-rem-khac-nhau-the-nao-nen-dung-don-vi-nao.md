---
id: em-va-rem-khac-nhau-the-nao-nen-dung-don-vi-nao
position: backend
technology: css-\u0026-layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`em` và `rem` khác nhau thế nào? Nên dùng đơn vị nào?

## Question (EN)
How do `em` and `rem` differ? Which unit should you use?

## Đáp án chi tiết (VI)
Cả hai là đơn vị **tương đối theo font-size**, nhưng lấy mốc khác nhau:\
\
- **`rem`** (root em): luôn tính theo `font-size` của phần tử **gốc `\u003chtml\u003e`**. Một mốc duy nhất → **nhất quán, dễ đoán**, không bị dồn tầng.\
- **`em`**: với thuộc tính `font-size`, tính theo font-size của **phần tử cha**; với các thuộc tính khác (`padding`, `margin`, `width`...), tính theo font-size của **chính phần tử**. Khi lồng nhiều cấp, `em` **nhân dồn** (compounding) → dễ lệch ngoài ý muốn.\
\
Ví dụ: cha `2em`, con `2em` → con thực tế `4em` so với gốc.\
\
Thực hành:\
- **`rem`** cho `font-size`, spacing tổng thể, layout — ổn định và hỗ trợ accessibility (người dùng chỉnh cỡ chữ trình duyệt).\
- **`em`** khi muốn thành phần **co giãn theo cỡ chữ cục bộ** (vd padding của một nút tỉ lệ với chữ trong nút).\
- Tránh đặt `font-size` bằng `px` cố định trên `\u003chtml\u003e` để không chặn tùy chỉnh của người dùng.

## Detailed Answer (EN)
Both are **font-size-relative** units, but reference different bases:\
\
- **`rem`** (root em): always relative to the **root `\u003chtml\u003e`** `font-size`. One single base → **consistent and predictable**, no cascading.\
- **`em`**: for the `font-size` property, relative to the **parent’s** font-size; for other properties (`padding`, `margin`, `width`...), relative to the **element’s own** font-size. When nested, `em` **compounds** (multiplies) → drifts unexpectedly.\
\
Example: parent `2em`, child `2em` → the child is effectively `4em` of the root.\
\
Rule of thumb:\
- **`rem`** for `font-size`, overall spacing, and layout — stable and accessibility-friendly (users can change the browser font size).\
- **`em`** when you want a component to **scale with its local text size** (e.g. a button’s padding proportional to its text).\
- Avoid a fixed `px` `font-size` on `\u003chtml\u003e` so it does not block user preferences.

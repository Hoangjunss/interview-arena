---
id: lam-sao-tach-biet-css-de-cac-micro-frontend-khong-ghi-de-style-cua-nhau
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tách biệt CSS để các micro-frontend không ghi đè style của nhau?

## Question (EN)
How do you isolate CSS so micro-frontends don't override each other's styles?

## Đáp án chi tiết (VI)
Vì CSS mặc định là global, style của một mảnh dễ rò rỉ và ghi đè mảnh khác ngoài ý muốn. Các cách tách biệt: đặt tiền tố/quy ước BEM cho class, dùng CSS Modules (hash tên class), CSS-in-JS (scope theo component), hoặc Shadow DOM (tách biệt mạnh nhất — style không lọt ra/vào). Trong thực tế nên kết hợp một design system dùng chung (để UI nhất quán) với một cơ chế scoping (để không xung đột). Lưu ý: Shadow DOM tách biệt tuyệt đối nhưng cũng chặn cả style/theme dùng chung lọt vào, nên chia sẻ design token và đổi theme sẽ khó hơn — cân nhắc đánh đổi giữa tách biệt và khả năng đồng bộ giao diện.

## Detailed Answer (EN)
Because CSS is global by default, one piece's styles easily leak and override another unintentionally. Isolation options: class prefixes / BEM conventions, CSS Modules (hashed class names), CSS-in-JS (component-scoped), or Shadow DOM (strongest isolation — styles can't leak in or out). In practice, combine a shared design system (for consistent UI) with a scoping mechanism (to avoid conflicts). Note: Shadow DOM isolates completely but also blocks shared styles/themes from getting in, making design-token sharing and theming harder — weigh the trade-off between isolation and the ability to keep the UI in sync.

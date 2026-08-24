---
id: layout-tsx-va-template-tsx-khac-nhau-ra-sao-khi-nao-bat-buoc-dung-template-tsx
position: backend
technology: layout-vs-template
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`layout.tsx` và `template.tsx` khác nhau ra sao? Khi nào bắt buộc dùng `template.tsx`?

## Question (EN)
How do `layout.tsx` and `template.tsx` differ, and when must you use `template.tsx`?

## Đáp án chi tiết (VI)
Cả hai đều bọc route con, khác nhau ở **vòng đời khi điều hướng**:\
\
- `layout.tsx`: **giữ nguyên instance** khi chuyển giữa các route con. State bên trong không mất, effect không chạy lại, DOM không remount.\
- `template.tsx`: **tạo instance mới** mỗi lần điều hướng. State reset, `useEffect` chạy lại, animation mount phát lại.\
\
```\
app/\
  layout.tsx      // sidebar, header — không muốn reset\
  (dash)/\
    template.tsx  // wrapper animation fade-in mỗi trang\
    page.tsx\
```\
\
**Dùng `template.tsx` khi:**\
- Cần animation vào/ra mỗi lần đổi trang.\
- Có `useEffect` phải chạy lại mỗi lần xem trang (ghi log pageview, focus input).\
- Muốn state trong wrapper bị reset (ví dụ form bộ lọc không mang sang trang khác).\
\
Mặc định nên dùng `layout.tsx` vì giữ được state là điểm mạnh của App Router. Nếu có cả hai trong cùng thư mục, thứ tự bọc là `layout` bên ngoài, `template` bên trong.

## Detailed Answer (EN)
Both wrap child routes; they differ in **lifecycle across navigation**:\
\
- `layout.tsx`: **keeps the same instance** when moving between child routes. State survives, effects do not re-run, the DOM is not remounted.\
- `template.tsx`: **creates a new instance** on every navigation. State resets, `useEffect` runs again, mount animations replay.\
\
```\
app/\
  layout.tsx      // sidebar, header — should not reset\
  (dash)/\
    template.tsx  // fade-in wrapper for each page\
    page.tsx\
```\
\
**Use `template.tsx` when:**\
- You need enter/exit animation on every page change.\
- You have a `useEffect` that must re-run per page view (pageview logging, focusing an input).\
- You want wrapper state reset (e.g. a filter form that should not carry over).\
\
Prefer `layout.tsx` by default — preserved state is one of the App Router's strengths. If both exist in one folder, `layout` wraps `template`.

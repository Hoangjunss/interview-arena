---
id: i18n-routing-trong-app-router-hoat-dong-ra-sao-va-next-intl-them-gia-tri-gi-so-v
position: backend
technology: i18n---next-intl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
i18n routing trong App Router hoạt động ra sao, và next-intl thêm giá trị gì so với tự dựng?

## Question (EN)
How does i18n routing work in the App Router, and what does next-intl add over rolling your own?

## Đáp án chi tiết (VI)
App Router không có i18n config sẵn như Pages Router; bạn dựng routing bằng **dynamic segment `[locale]`** + middleware để phát hiện/redirect ngôn ngữ.\
\
```\
app/[locale]/layout.tsx\
app/[locale]/page.tsx\
```\
Middleware đọc `Accept-Language` hoặc cookie, redirect `/` → `/vi`. `generateStaticParams` liệt kê các locale để build tĩnh.\
\
**next-intl** xây sẵn lớp này và bổ sung:\
- **Middleware locale-detection + routing** cấu hình sẵn (prefix `/vi`, `/en`).\
- **API dịch dùng được trong Server Components**: `getTranslations()` (async, server) và `useTranslations()` (client) — quan trọng vì hầu hết i18n lib cũ chỉ chạy client.\
- **Format số/ngày/plural** theo `Intl` chuẩn, type-safe message keys.\
\
```tsx\
import { useTranslations } from 'next-intl'\
function Title() {\
  const t = useTranslations('Home')\
  return \u003ch1\u003e{t('title')}\u003c/h1\u003e\
}\
```\
\
**Lưu ý:** giữ message ở Server Component khi có thể để **không gửi toàn bộ từ điển xuống client** — chỉ Client Component nào cần mới nhận phần của nó.

## Detailed Answer (EN)
$86

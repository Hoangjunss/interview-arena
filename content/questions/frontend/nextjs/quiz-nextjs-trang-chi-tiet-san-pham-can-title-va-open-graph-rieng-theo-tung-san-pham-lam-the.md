---
id: quiz-nextjs-trang-chi-tiet-san-pham-can-title-va-open-graph-rieng-theo-tung-san-pham-lam-the
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trang chi tiết sản phẩm cần title và Open Graph riêng theo từng sản phẩm. Làm thế nào trong App Router?

## Đáp án trắc nghiệm
- [ ] Khai báo tĩnh trong next.config.js cho từng đường dẫn
- [ ] Dùng useEffect để gán document.title sau khi trang mount
- [ ] Vẫn dùng component <Head> của next/head như Pages Router
- [x] Export hàm generateMetadata từ page.tsx

## Giải thích (VI)
Export generateMetadata từ page.tsx. Nó nhận params, await được dữ liệu, và trả về object metadata. Next.js render thẻ meta ngay trong HTML server nên crawler và bộ xem trước link đọc được. Metadata tĩnh thì export hằng metadata.

### Giải thích các phương án:
- **Khai báo tĩnh trong next.config.js cho từng đường dẫn** (Sai): Không có cấu hình metadata theo route trong file này.
- **Dùng useEffect để gán document.title sau khi trang mount** (Sai): Chạy ở client nên bot đọc HTML ban đầu sẽ không thấy — hỏng mục đích SEO.
- **Vẫn dùng component <Head> của next/head như Pages Router** (Sai): next/head không dùng trong App Router.
- **Export hàm generateMetadata từ page.tsx** (Đúng): Đây là API dành riêng cho metadata phụ thuộc dữ liệu trong App Router. Hàm này nhận params, được async, và trả về object metadata.

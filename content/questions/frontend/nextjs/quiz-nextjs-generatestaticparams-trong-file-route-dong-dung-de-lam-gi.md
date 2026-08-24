---
id: quiz-nextjs-generatestaticparams-trong-file-route-dong-dung-de-lam-gi
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
generateStaticParams trong file route động dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Định nghĩa kiểu TypeScript cho params của trang
- [ ] Sinh sitemap.xml cho các route động
- [x] Liệt kê trước giá trị tham số động để dựng sẵn trang lúc build
- [ ] Kiểm tra tính hợp lệ của tham số và trả 404 khi giá trị không nằm trong danh sách

## Giải thích (VI)
Nó cho Next.js biết trước cần dựng sẵn những trang nào lúc build. Với /posts/[slug], trả về danh sách slug thì mỗi slug được render thành HTML tĩnh — phục vụ nhanh từ CDN, tốt cho SEO. Đây là bản thay thế getStaticPaths của Pages Router.

### Giải thích các phương án:
- **Định nghĩa kiểu TypeScript cho params của trang** (Sai): Kiểu được khai báo trực tiếp trong chữ ký của component.
- **Sinh sitemap.xml cho các route động** (Sai): Sitemap có quy ước riêng là sitemap.ts.
- **Liệt kê trước giá trị tham số động để dựng sẵn trang lúc build** (Đúng): Đây là cách khai báo trước tập route động cần tĩnh hóa tại thời điểm build. Nhờ đó các trang đó là static thay vì render theo từng request.
- **Kiểm tra tính hợp lệ của tham số và trả 404 khi giá trị không nằm trong danh sách** (Sai): Nó không phải cơ chế xác thực; hành vi với giá trị ngoài danh sách do dynamicParams quyết định.

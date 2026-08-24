---
id: quiz-html-css-nhng-loi-ich-nao-sau-day-la-ly-do-dung-de-dung-semantic-html-article-nav-main-th
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những lợi ích nào sau đây là lý do đúng để dùng semantic HTML (<article>, <nav>, <main>...) thay vì <div>? (chọn nhiều)

## Đáp án trắc nghiệm
- [x] SEO — search engine hiểu cấu trúc và vai trò từng vùng nội dung tốt hơn
- [ ] Trang render nhanh hơn vì trình duyệt tối ưu riêng cho thẻ semantic
- [ ] Tự động responsive hơn trên mobile

## Giải thích (VI)
Ba lợi ích đúng: (1) SEO — search engine hiểu cấu trúc trang; (2) Accessibility — screen reader điều hướng theo landmark; (3) Maintainability — code tự mô tả. Semantic HTML KHÔNG làm trang render nhanh hơn hay tự responsive — đó là việc của CSS và tối ưu tài nguyên.

### Giải thích các phương án:
- **SEO — search engine hiểu cấu trúc và vai trò từng vùng nội dung tốt hơn** (Đúng): Crawler dùng thẻ semantic để xác định nội dung chính, điều hướng, phần phụ — ảnh hưởng cách trang được index.
- **Trang render nhanh hơn vì trình duyệt tối ưu riêng cho thẻ semantic** (Sai): Không có khác biệt hiệu năng render giữa <article> và <div> — semantic là về ý nghĩa, không phải tốc độ.
- **Tự động responsive hơn trên mobile** (Sai): Responsive do CSS (media queries, layout) quyết định; thẻ semantic không mang style hay hành vi responsive nào.

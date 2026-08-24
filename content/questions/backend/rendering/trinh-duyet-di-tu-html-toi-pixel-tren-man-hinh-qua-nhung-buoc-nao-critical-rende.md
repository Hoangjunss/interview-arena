---
id: trinh-duyet-di-tu-html-toi-pixel-tren-man-hinh-qua-nhung-buoc-nao-critical-rende
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trình duyệt đi từ HTML tới pixel trên màn hình qua những bước nào (critical rendering path)?

## Question (EN)
What steps does the browser take from HTML to pixels on screen (the critical rendering path)?

## Đáp án chi tiết (VI)
Trình duyệt chạy qua **5 bước** cố định:\
\
1. **Parse HTML → DOM**: đọc byte HTML thành cây node.\
2. **Parse CSS → CSSOM**: mọi stylesheet được tải và parse thành cây style.\
3. **Render tree**: ghép DOM + CSSOM, bỏ node không hiển thị (`display: none`, `\u003chead\u003e`).\
4. **Layout (reflow)**: tính vị trí và kích thước từng box theo viewport.\
5. **Paint + Composite**: vẽ pixel vào các layer rồi ghép layer lại, phần này thường do GPU làm.\
\
**Hai điểm chặn cần nhớ khi phỏng vấn:**\
- **CSS chặn render**: chưa có CSSOM thì không dựng được render tree, nên `\u003clink rel=\\"stylesheet\\"\u003e` trong `\u003chead\u003e` làm trắng màn hình cho tới khi tải xong.\
- **`\u003cscript\u003e` đồng bộ chặn parser**: gặp thẻ script không có `defer`/`async`, trình duyệt dừng dựng DOM, tải và chạy script rồi mới đi tiếp.\
\
Tối ưu đường này = giảm số resource chặn render, nén CSS quan trọng vào đầu trang, và đẩy JS không cần thiết xuống sau.

## Detailed Answer (EN)
The browser runs a fixed **5-step** pipeline:\
\
1. **Parse HTML → DOM**: HTML bytes become a node tree.\
2. **Parse CSS → CSSOM**: every stylesheet is fetched and parsed into a style tree.\
3. **Render tree**: DOM + CSSOM are combined, dropping non-rendered nodes (`display: none`, `\u003chead\u003e`).\
4. **Layout (reflow)**: compute position and size of every box against the viewport.\
5. **Paint + Composite**: rasterise pixels into layers, then combine layers — usually on the GPU.\
\
**Two blocking points interviewers look for:**\
- **CSS is render-blocking**: without the CSSOM there is no render tree, so a `\u003clink rel=\\"stylesheet\\"\u003e` in `\u003chead\u003e` keeps the screen blank until it loads.\
- **Synchronous `\u003cscript\u003e` blocks the parser**: on a script tag without `defer`/`async`, DOM construction stops while the script is fetched and executed.\
\
Optimising this path means fewer render-blocking resources, inlining the critical CSS, and deferring non-essential JS.

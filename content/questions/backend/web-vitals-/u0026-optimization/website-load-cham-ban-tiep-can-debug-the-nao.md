---
id: website-load-cham-ban-tiep-can-debug-the-nao
position: backend
technology: web-vitals-\u0026-optimization
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Website load chậm — bạn tiếp cận debug thế nào?

## Question (EN)
A website loads slowly — how do you approach debugging it?

## Đáp án chi tiết (VI)
Nguyên tắc: đo trước khi sửa — xác định chậm ở khâu nào (server, network hay render) rồi mới optimize.\
\
- **Chạy Lighthouse / PageSpeed Insights** — lấy tổng quan LCP/INP/CLS và danh sách opportunities; PageSpeed có cả field data từ user thật (CrUX).\
- **DevTools Network tab** — đọc waterfall: TTFB cao → vấn đề nằm ở server/DB/thiếu CDN; nhiều request lớn → ảnh chưa tối ưu, bundle to, third-party scripts.\
- **DevTools Performance tab** — record quá trình load: long tasks chặn main thread, resource render-blocking, layout shifts.\
- **Thủ phạm thường gặp** — ảnh không nén/sai kích thước, JS bundle lớn chưa code-split, web font chặn render, thiếu cache/CDN, API response chậm.\
- **Sửa theo impact** — xử lý phần chiếm nhiều thời gian nhất trong waterfall trước; đo lại sau mỗi thay đổi; xác nhận bằng field data thay vì chỉ lab data.\
\
Trình bày theo trình tự đo → khoanh vùng → sửa → đo lại cho thấy tư duy hệ thống, thay vì liệt kê mẹo rời rạc.

## Detailed Answer (EN)
The principle: measure before fixing — determine which stage is slow (server, network, or render) before optimizing.\
\
- **Run Lighthouse / PageSpeed Insights** — get an overview of LCP/INP/CLS and the opportunities list; PageSpeed also shows field data from real users (CrUX).\
- **DevTools Network tab** — read the waterfall: high TTFB → the problem is server/DB/missing CDN; many large requests → unoptimized images, a big bundle, third-party scripts.\
- **DevTools Performance tab** — record the load: long tasks blocking the main thread, render-blocking resources, layout shifts.\
- **Common culprits** — uncompressed/wrong-size images, a large un-split JS bundle, render-blocking web fonts, missing cache/CDN, slow API responses.\
- **Fix by impact** — tackle whatever dominates the waterfall first; re-measure after each change; confirm with field data rather than lab data alone.\
\
Presenting it as measure → localize → fix → re-measure shows systematic thinking instead of a list of disconnected tips.

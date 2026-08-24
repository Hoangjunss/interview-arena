---
id: quiz-html-css-da-dat-position-sticky-cho-header-mot-section-nhung-no-khong-dinh-khi-cuon-nguye
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đã đặt position: sticky cho header một section nhưng nó không "dính" khi cuộn. Nguyên nhân phổ biến nhất là gì?

## Đáp án trắc nghiệm
- [ ] Sticky chỉ hoạt động khi phần tử là con trực tiếp của <body>
- [ ] Phải thêm z-index thì sticky mới hoạt động
- [ ] Phải kết hợp thêm position: fixed trong media query
- [x] Thiếu offset, hoặc ancestor có overflow khác visible

## Giải thích (VI)
Hai nguyên nhân phổ biến nhất: (1) chưa khai báo offset — sticky bắt buộc có ít nhất một trong top/right/bottom/left làm ngưỡng dính; (2) một ancestor có overflow khác visible (hidden/auto/scroll) khiến vùng cuộn tham chiếu thay đổi và phần tử không bao giờ đạt ngưỡng. Ngoài ra sticky chỉ dính trong phạm vi parent — parent thấp quá thì vừa dính đã bị đẩy đi.

### Giải thích các phương án:
- **Sticky chỉ hoạt động khi phần tử là con trực tiếp của <body>** (Sai): Sticky hoạt động ở mọi cấp lồng nhau; nó dính trong phạm vi parent chứa nó, không yêu cầu nằm ngay dưới body.
- **Phải thêm z-index thì sticky mới hoạt động** (Sai): z-index chỉ ảnh hưởng thứ tự xếp chồng (bị nội dung khác che), không quyết định phần tử có dính hay không.
- **Phải kết hợp thêm position: fixed trong media query** (Sai): Sticky tự thân là cơ chế lai relative + fixed; không cần và không thể kết hợp hai giá trị position.
- **Thiếu offset, hoặc ancestor có overflow khác visible** (Đúng): Sticky bắt buộc có ít nhất một offset làm ngưỡng dính; và ancestor có overflow: hidden/auto/scroll không cuộn được sẽ vô hiệu hóa sticky — hai nguyên nhân hàng đầu khi debug. Cả hai đều làm cơ chế dính không hoạt động.

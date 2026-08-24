---
id: quiz-html-css-voi-css-sau-phan-tu-box-chiem-chieu-rong-bao-nhieu-px-tren-man-hinh
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với CSS sau, phần tử .box chiếm chiều rộng bao nhiêu px trên màn hình?

## Đáp án trắc nghiệm
- [ ] 250px
- [x] 200px
- [ ] 150px
- [ ] 240px

## Giải thích (VI)
Phần tử rộng đúng 200px. box-sizing: border-box khiến width bao gồm cả content + padding + border, nên trình duyệt thu hẹp phần content còn 150px (200 − 20×2 − 5×2) thay vì nở rộng phần tử. Với content-box mặc định, cùng CSS này sẽ cho chiều rộng 250px.

### Giải thích các phương án:
- **250px** (Sai): 250px là kết quả của content-box (mặc định): 200 + 20×2 padding + 5×2 border. Ở đây đã đặt border-box.
- **200px** (Đúng): Với border-box, width đã bao gồm content + padding + border, nên chiều rộng hiển thị đúng bằng 200px (content còn 150px).
- **150px** (Sai): 150px là chiều rộng phần content sau khi trừ padding và border, không phải chiều rộng hiển thị của cả phần tử.
- **240px** (Sai): 240px chỉ cộng padding mà bỏ quên border; và với border-box thì không cộng thêm gì cả.

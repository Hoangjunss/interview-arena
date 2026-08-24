---
id: quiz-html-css-mot-phan-tu-khai-bao-width-50-con-so-50-duoc-tinh-dua-tren-moc-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một phần tử khai báo width: 50%. Con số 50% được tính dựa trên mốc nào?

## Đáp án trắc nghiệm
- [ ] Độ phân giải màn hình thiết bị
- [ ] Font-size của phần tử gốc html
- [x] Chiều rộng của phần tử cha chứa nó (containing block)
- [ ] Chiều rộng của viewport (cửa sổ trình duyệt)

## Giải thích (VI)
width: 50% tính theo chiều rộng của phần tử cha (containing block) — cha rộng 800px thì con chiếm 400px, cha co giãn thì con tính lại theo. Phân biệt với các mốc khác: 50vw theo viewport, rem theo font-size của html, px là giá trị cố định không phụ thuộc gì.

### Giải thích các phương án:
- **Độ phân giải màn hình thiết bị** (Sai): CSS không đo theo độ phân giải phần cứng; mọi đơn vị đều quy về CSS pixel và các mốc trong layout (cha, viewport, font-size).
- **Font-size của phần tử gốc html** (Sai): Mốc font-size gốc là của đơn vị rem — dùng cho kích thước chữ và spacing, không liên quan tới %.
- **Chiều rộng của phần tử cha chứa nó (containing block)** (Đúng): Đơn vị % trên width luôn tương đối theo phần tử cha — cha rộng 800px thì con 50% = 400px; cha đổi kích thước thì con tự tính lại.
- **Chiều rộng của viewport (cửa sổ trình duyệt)** (Sai): Tương đối theo viewport là đơn vị vw (50vw = nửa bề rộng cửa sổ); % chỉ nhìn phần tử cha, hai mốc này chỉ trùng nhau khi cha rộng đúng bằng viewport.

---
id: quiz-nextjs-dung-nextfont-thay-vi-nhung-the-link-toi-google-fonts-mang-lai-loi-ich-gi
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng next/font thay vì nhúng thẻ <link> tới Google Fonts mang lại lợi ích gì?

## Đáp án trắc nghiệm
- [ ] Cho phép dùng font trả phí miễn phí
- [ ] Font được nén mạnh hơn nên tải nhanh hơn
- [x] Font tải về và phục vụ từ domain của bạn ngay lúc build
- [ ] Font chỉ tải khi người dùng cuộn tới phần dùng nó

## Giải thích (VI)
next/font tải font lúc build và phục vụ từ domain của bạn — bỏ được một lần kết nối tới máy chủ bên thứ ba. Quan trọng hơn, nó tự tính và chèn fallback có kích thước khớp, nên khi font thật hiện lên chữ không nhảy — cải thiện trực tiếp chỉ số CLS.

### Giải thích các phương án:
- **Cho phép dùng font trả phí miễn phí** (Sai): Không liên quan tới bản quyền font.
- **Font được nén mạnh hơn nên tải nhanh hơn** (Sai): Không phải cơ chế nén khác; lợi ích nằm ở nơi phục vụ và ở fallback.
- **Font tải về và phục vụ từ domain của bạn ngay lúc build** (Đúng): Tự host loại bỏ một lần đi mạng tới bên thứ ba, và fallback đo sẵn xử lý layout shift. Không gọi sang Google lúc chạy, và có fallback đo sẵn nên chữ không nhảy.
- **Font chỉ tải khi người dùng cuộn tới phần dùng nó** (Sai): Không có cơ chế lazy load theo vùng nhìn cho font.

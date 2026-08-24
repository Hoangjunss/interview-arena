---
id: quiz-html-css-phan-tu-co-position-absolute-duoc-dinh-vi-theo-moc-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phần tử có position: absolute được định vị theo mốc nào?

## Đáp án trắc nghiệm
- [ ] Luôn theo phần tử cha trực tiếp
- [ ] Luôn theo viewport, bất kể ancestor
- [ ] Theo vị trí gốc của chính nó trong document flow
- [x] Ancestor gần nhất có position khác static

## Giải thích (VI)
position: absolute đưa phần tử ra khỏi document flow và định vị theo ancestor gần nhất có position khác static (relative/absolute/fixed/sticky). Nếu không ancestor nào được positioned, mốc là initial containing block — về hình ảnh giống định vị theo trang. Vì vậy thường đặt position: relative cho parent để làm mốc.

### Giải thích các phương án:
- **Luôn theo phần tử cha trực tiếp** (Sai): Cha trực tiếp chỉ là mốc khi chính nó được positioned (khác static); nếu không, absolute bỏ qua và tìm tiếp lên trên.
- **Luôn theo viewport, bất kể ancestor** (Sai): Định vị theo viewport là hành vi của position: fixed, không phải absolute.
- **Theo vị trí gốc của chính nó trong document flow** (Sai): Offset từ vị trí gốc là hành vi của position: relative; absolute thoát hẳn khỏi flow và không giữ chỗ cũ.
- **Ancestor gần nhất có position khác static** (Đúng): Nếu không có thì theo initial containing block (gốc tài liệu. Đây là quy tắc chuẩn: absolute tìm ngược lên positioned ancestor gần nhất; vì vậy pattern phổ biến là đặt position: relative cho parent làm mốc.

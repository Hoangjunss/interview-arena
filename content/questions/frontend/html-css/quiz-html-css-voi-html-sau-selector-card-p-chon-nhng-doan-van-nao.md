---
id: quiz-html-css-voi-html-sau-selector-card-p-chon-nhng-doan-van-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với HTML sau, selector .card > p chọn những đoạn văn nào?

## Đáp án trắc nghiệm
- [ ] Cả A và B
- [x] Chỉ đoạn A
- [ ] Không đoạn nào, vì .card là <div> chứ không phải danh sách
- [ ] Chỉ đoạn B

## Giải thích (VI)
Chỉ đoạn A. .card > p dùng child combinator (>) nên chỉ khớp <p> là con trực tiếp của .card. Đoạn B lồng trong <section> — là cháu, không phải con — nên bị loại. Muốn chọn cả A lẫn B thì dùng descendant combinator (dấu cách): .card p, khớp mọi cấp con cháu.

### Giải thích các phương án:
- **Cả A và B** (Sai): Chọn cả con lẫn cháu là hành vi của descendant combinator (dấu cách): .card p. Ở đây dùng > nên B bị loại.
- **Chỉ đoạn A** (Đúng): > là child combinator — chỉ khớp con trực tiếp của .card. Đoạn A là con trực tiếp; đoạn B nằm trong <section> nên là cháu, không khớp.
- **Không đoạn nào, vì .card là <div> chứ không phải danh sách** (Sai): Child combinator hoạt động với mọi loại phần tử cha — không có ràng buộc nào về <div> hay danh sách.
- **Chỉ đoạn B** (Sai): B là cháu (lồng qua <section>) — chính là phần tử mà > loại trừ; còn A mới là con trực tiếp được chọn.

---
id: quiz-html-css-voi-cac-rule-sau-cung-ap-len-mot-the-a-khop-tat-ca-selector-ch-co-mau-gi
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với các rule sau cùng áp lên một thẻ <a> khớp tất cả selector, chữ có màu gì?

## Đáp án trắc nghiệm
- [ ] black
- [ ] green
- [ ] blue
- [x] red

## Giải thích (VI)
Chữ màu red. Specificity tính theo 3 cột (ID, class, element): #nav a = (1,0,1) thắng .menu .item a = (0,2,1), ul li a.active = (0,1,3) và a = (0,0,1). So sánh từ trái sang phải, cột ID cao hơn là thắng ngay — không cộng dồn nhiều class để vượt một ID.

### Giải thích các phương án:
- **black** (Sai): a đứng cuối nhưng specificity (0,0,1) thấp nhất; source order chỉ quyết định khi specificity bằng nhau.
- **green** (Sai): ul li a.active là (0,1,3) — một class + ba element, vẫn thua ID ở cột đầu tiên.
- **blue** (Sai): .menu .item a là (0,2,1) — hai class vẫn thua một ID vì so sánh theo từng cột từ trái sang phải, không cộng dồn điểm.
- **red** (Đúng): #nav a có specificity (1,0,1) — một ID thắng mọi tổ hợp class/element phía dưới, bất kể thứ tự khai báo.

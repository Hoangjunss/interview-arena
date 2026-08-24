---
id: quiz-html-css-voi-css-sau-child-co-font-size-va-padding-thuc-te-la-bao-nhieu
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với CSS sau, .child có font-size và padding thực tế là bao nhiêu?

## Đáp án trắc nghiệm
- [ ] font-size: 32px, padding: 20px
- [x] font-size: 40px, padding: 16px
- [ ] font-size: 40px, padding: 20px
- [ ] font-size: 32px, padding: 16px

## Giải thích (VI)
font-size = 40px, padding = 16px. Quy tắc: em trong khai báo font-size tham chiếu font-size của parent (2 × 20px = 40px); rem luôn tham chiếu font-size của root html (1 × 16px = 16px), bất kể phần tử nằm sâu bao nhiêu. Đây chính là lý do rem dễ dự đoán hơn em khi lồng nhiều cấp.

### Giải thích các phương án:
- **font-size: 32px, padding: 20px** (Sai): Đảo ngược cả hai: em theo parent (không phải root) và rem theo root (không phải parent).
- **font-size: 40px, padding: 16px** (Đúng): em trên font-size tính theo font-size của parent (2 × 20 = 40px); rem luôn tính theo root (1 × 16 = 16px).
- **font-size: 40px, padding: 20px** (Sai): Padding dùng rem nên tính theo root 16px, không theo parent 20px.
- **font-size: 32px, padding: 16px** (Sai): 32px là nếu em tính theo root — nhưng em tham chiếu parent (20px), chỉ rem mới tham chiếu root.

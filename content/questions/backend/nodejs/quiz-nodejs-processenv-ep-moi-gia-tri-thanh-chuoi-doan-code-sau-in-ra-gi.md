---
id: quiz-nodejs-processenv-ep-moi-gia-tri-thanh-chuoi-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
process.env ép mọi giá trị thành chuỗi — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] on boolean
- [ ] off boolean
- [ ] off string
- [x] on string

## Giải thích (VI)
In on rồi string. process.env là cầu nối tới biến môi trường của OS nên mọi giá trị gán vào đều bị ép thành STRING — false thành "false". Chuỗi khác rỗng luôn truthy, nên if vào nhánh on. (FREE)

### Giải thích các phương án:
- **on boolean** (Sai): Sai — nhánh đúng nhưng kiểu sai: env ép mọi thứ thành string, typeof không thể trả "boolean".
- **off boolean** (Sai): Sai — hiểu nhầm rằng env giữ nguyên kiểu boolean. Mọi giá trị gán vào process.env đều bị ép thành string; "false" là chuỗi truthy.
- **off string** (Sai): Sai — đúng là string, nhưng chuỗi "false" KHÔNG rỗng nên truthy → nhánh on chạy, không phải off.
- **on string** (Đúng): process.env chỉ chứa STRING: gán false bị ép thành chuỗi "false". Chuỗi khác rỗng luôn truthy nên nhánh on chạy, và typeof trả "string".

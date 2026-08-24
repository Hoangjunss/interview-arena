---
id: dry-kiss-yagni-la-gi-khi-nao-nen-ap-dung-va-khi-nao-khong
position: backend
technology: solid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DRY, KISS, YAGNI là gì? Khi nào nên áp dụng và khi nào không?

## Question (EN)
What are DRY, KISS, and YAGNI? When should — and shouldn't — you apply them?

## Đáp án chi tiết (VI)
Ba nguyên tắc cơ bản của software engineering:\
\
- **DRY** (Don't Repeat Yourself): mỗi piece of knowledge chỉ nên có một đại diện duy nhất — trùng lặp logic nên được extract thành function/module tái sử dụng.\
- **KISS** (Keep It Simple, Stupid): ưu tiên giải pháp đơn giản nhất có thể hoạt động, tránh over-engineering.\
- **YAGNI** (You Aren't Gonna Need It): không viết code cho tính năng chưa cần ngay bây giờ.\
\
Khi KHÔNG áp dụng DRY quá mức: đôi khi hai đoạn code trông giống nhau nhưng thuộc về hai domain khác nhau, ép DRY tạo coupling không cần thiết ('wrong abstraction' — Sandi Metz). YAGNI đặc biệt quan trọng trong startup/agile — code thừa tăng độ phức tạp và maintenance cost.

## Detailed Answer (EN)
DRY (Don't Repeat Yourself): every piece of knowledge should have a single, authoritative representation in the system — duplicated logic should be extracted into reusable functions or modules. KISS (Keep It Simple, Stupid): prefer the simplest solution that works; avoid over-engineering. YAGNI (You Aren't Gonna Need It): don't write code for features that aren't needed right now. When NOT to over-apply DRY: sometimes two pieces of code look similar but belong to different domains, and forcing DRY creates unnecessary coupling (the 'wrong abstraction' problem — Sandi Metz). YAGNI is especially critical in startups and agile teams — unused code adds complexity and maintenance overhead. These three principles complement each other and should be balanced with SOLID.

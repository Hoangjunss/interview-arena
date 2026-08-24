---
id: lam-autocomplete-goi-y-khi-go-nen-dung-cach-nao
position: backend
technology: search
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm autocomplete (gợi ý khi gõ) nên dùng cách nào?

## Question (EN)
How should autocomplete (type-ahead) be implemented?

## Đáp án chi tiết (VI)
Ba lựa chọn, chọn theo yêu cầu:\
\
1. **`completion` suggester** — nhanh nhất, dựng FST trong memory, phù hợp khi chỉ cần gợi ý tiền tố từ một danh sách.\
\
```json\
\\"suggest\\": { \\"s\\": { \\"prefix\\": \\"lap\\

## Detailed Answer (EN)
$82

---
id: f-string-format-formatting-nen-dung-cai-nao
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
f-string, `.format()`, `%` formatting — nên dùng cái nào?

## Question (EN)
f-string, `.format()`, `%` formatting — which to use?

## Đáp án chi tiết (VI)
Dùng f-string (Python 3.6+) — nhanh nhất, dễ đọc nhất, hỗ trợ expression trực tiếp. `f\\"Name: {name!r}, Score: {score:.2f}\\"`. `.format()` khi cần template string tái sử dụng. `%` formatting là cũ, không nên dùng trong code mới. \
\
**Ví dụ:** `f\\"2+2={2+2}\\"` in ra `\\"2+2=4\\"` — expression được evaluate ngay trong string. Python 3.12+ (PEP 701): f-string hỗ trợ nested quotes và multi-line expression — `f\\"result: {'pass' if ok else 'fail'}\\"` là hợp lệ.

## Detailed Answer (EN)
Use f-strings (Python 3.6+) — fastest, most readable, supports inline expressions. `f\\"Name: {name!r}, Score: {score:.2f}\\"`. Use `.format()` for reusable templates. Avoid `%` formatting in new code. \
\
**Example:** `f\\"2+2={2+2}\\"` prints `\\"2+2=4\\"` — expressions evaluated inline. Python 3.12+ (PEP 701): f-strings support nested quotes and multi-line expressions — `f\\"result: {'pass' if ok else 'fail'}\\"` is now valid.

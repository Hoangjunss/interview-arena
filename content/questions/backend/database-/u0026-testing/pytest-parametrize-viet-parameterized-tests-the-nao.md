---
id: pytest-parametrize-viet-parameterized-tests-the-nao
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
pytest parametrize — viết parameterized tests thế nào?

## Question (EN)
pytest parametrize — how to write parameterized tests?

## Đáp án chi tiết (VI)
$78

## Detailed Answer (EN)
```python\
import pytest\
\
@pytest.mark.parametrize(\\"email,is_valid\\

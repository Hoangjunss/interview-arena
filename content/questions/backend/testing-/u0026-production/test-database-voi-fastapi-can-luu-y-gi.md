---
id: test-database-voi-fastapi-can-luu-y-gi
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test database với FastAPI cần lưu ý gì?

## Question (EN)
What should you watch out for when testing databases with FastAPI?

## Đáp án chi tiết (VI)
Không nên để test dùng chung production database. Dùng test database riêng, transaction rollback, fixture tạo schema, hoặc container database tùy mức integration.\
\
Với dependency DB session, test có thể override dependency để inject session test:\
```python\
async def override_db():\
    async with TestSessionLocal() as session:\
        yield session\
\
app.dependency_overrides[get_db] = override_db\
```\
Cần đảm bảo isolation giữa tests: reset data, rollback transaction hoặc tạo database/schema riêng cho từng test worker.

## Detailed Answer (EN)
Tests should not share a production database. Use a separate test database, transaction rollback, schema fixtures or containerized databases depending on integration depth.\
\
With a DB session dependency, tests can override it to inject a test session:\
```python\
async def override_db():\
    async with TestSessionLocal() as session:\
        yield session\
\
app.dependency_overrides[get_db] = override_db\
```\
Ensure isolation between tests: reset data, roll back transactions or create separate databases/schemas for each test worker.

---
id: pytest-fixtures-scope-hoat-dong-the-nao
position: backend
technology: database-\u0026-testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
pytest fixtures — `scope` hoạt động thế nào?

## Question (EN)
How does pytest fixture `scope` work?

## Đáp án chi tiết (VI)
Fixture scope xác định fixture được tạo và destroy khi nào: `function` (default) — mỗi test; `class` — mỗi test class; `module` — mỗi module; `session` — toàn bộ test session.\
```python\
@pytest.fixture(scope=\\"session\\")\
def db_engine():   # Tạo 1 lần cho toàn bộ session\
    engine = create_engine(TEST_URL)\
    Base.metadata.create_all(engine)\
    yield engine\
    Base.metadata.drop_all(engine)\
\
@pytest.fixture      # scope=\\"function\\" — mỗi test\
def db(db_engine):\
    connection = db_engine.connect()\
    transaction = connection.begin()\
    session = Session(bind=connection)\
    yield session\
    session.close()\
    transaction.rollback()  # Rollback sau mỗi test — isolation\
```

## Detailed Answer (EN)
Fixture scope determines when fixture is created/destroyed: function (default), class, module, session.\
```python\
@pytest.fixture(scope=\\"session\\")\
def engine():\
    eng = create_engine(TEST_DB_URL)\
    Base.metadata.create_all(eng)\
    yield eng\
    Base.metadata.drop_all(eng)\
\
@pytest.fixture\
def db(engine):\
    with engine.connect() as conn:\
        tx = conn.begin()\
        yield Session(bind=conn)\
        tx.rollback()  # Clean state per test\
```

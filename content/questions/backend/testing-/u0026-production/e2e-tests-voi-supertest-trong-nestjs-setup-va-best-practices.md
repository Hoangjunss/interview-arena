---
id: e2e-tests-voi-supertest-trong-nestjs-setup-va-best-practices
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
E2E tests với Supertest trong NestJS — setup và best practices?

## Question (EN)
E2E tests with Supertest in NestJS — setup and best practices?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
E2E tests the full HTTP flow without real external services.\
\
```typescript\
beforeAll(async () =\u003e {\
  const moduleFixture = await Test.createTestingModule({ imports: [AppModule] })\
    .overrideProvider(UsersService).useValue(mockUsersService)\
    .compile();\
\
  app = moduleFixture.createNestApplication();\
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));\
  await app.init();\
});\
\
it('GET /users', () =\u003e {\
  return request(app.getHttpServer())\
    .get('/users')\
    .set('Authorization', `Bearer ${token}`)\
    .expect(200);\
});\
```\
\
Best practices: use test database (SQLite in-memory), seed in `beforeAll`, cleanup in `afterAll`. Run E2E separately.

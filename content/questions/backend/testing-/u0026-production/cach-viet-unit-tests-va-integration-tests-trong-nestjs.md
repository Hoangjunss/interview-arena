---
id: cach-viet-unit-tests-va-integration-tests-trong-nestjs
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách viết unit tests và integration tests trong NestJS?

## Question (EN)
How to write unit tests and integration tests in NestJS?

## Đáp án chi tiết (VI)
NestJS dùng Jest và cung cấp `Test.createTestingModule()` để tạo test environment với DI container đầy đủ.\
\
Unit test service: tạo mock repository với `jest.fn()` cho mỗi method, đăng ký trong module với `{ provide: getRepositoryToken(Entity), useValue: mockRepo }`. Test từng method riêng lẻ, verify calls với `expect(mock).toHaveBeenCalledWith()`, reset mocks với `jest.clearAllMocks()` sau mỗi test.\
\
E2E/Integration test: dùng `Test.createTestingModule({ imports: [AppModule] })`, override providers với `.overrideProvider(Service).useValue(mockService)`, tạo app với `moduleFixture.createNestApplication()`, init global pipes/guards, dùng `supertest` để call real HTTP endpoints. Ưu tiên override service thay vì repository cho integration tests để test controller + service logic mà không cần DB thật.

## Detailed Answer (EN)
NestJS uses Jest and provides `Test.createTestingModule()` to create a test environment with a full DI container.\
\
Unit testing a service: create a mock repository with `jest.fn()` for each method, register it in the module with `{ provide: getRepositoryToken(Entity), useValue: mockRepo }`. Test each method in isolation, verify calls with `expect(mock).toHaveBeenCalledWith()`, reset mocks with `jest.clearAllMocks()` after each test.\
\
E2E/Integration test: use `Test.createTestingModule({ imports: [AppModule] })`, override providers with `.overrideProvider(Service).useValue(mockService)`, create the app with `moduleFixture.createNestApplication()`, init global pipes/guards, and use `supertest` to call real HTTP endpoints. Prefer overriding the service rather than the repository for integration tests to test controller + service logic without a real database.

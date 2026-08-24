---
id: mock-providers-trong-nestjs-unit-tests-testingmodule-va-jest-fn
position: backend
technology: testing-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mock providers trong NestJS unit tests — TestingModule và jest.fn()?

## Question (EN)
Mocking providers in NestJS unit tests — TestingModule and jest.fn()?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
Unit tests isolate a class by mocking all dependencies.\
\
```typescript\
describe('UsersService', () =\u003e {\
  let service: UsersService;\
  let repo: jest.Mocked\u003cRepository\u003cUser\u003e\u003e;\
\
  beforeEach(async () =\u003e {\
    const module = await Test.createTestingModule({\
      providers: [\
        UsersService,\
        { provide: getRepositoryToken(User), useValue: { findOne: jest.fn(), save: jest.fn() } },\
      ],\
    }).compile();\
    service = module.get(UsersService);\
    repo = module.get(getRepositoryToken(User));\
  });\
\
  it('finds user', async () =\u003e {\
    repo.findOne.mockResolvedValue({ id: 1, email: 'a@b.com' });\
    const result = await service.findOne(1);\
    expect(result.email).toBe('a@b.com');\
  });\
});\
```

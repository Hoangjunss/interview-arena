---
id: describe-it-test-expect-trong-jest-duoc-dung-nhu-the-nao
position: backend
technology: frameworks
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
describe, it/test, expect trong Jest được dùng như thế nào?

## Question (EN)
How are describe, it/test, and expect used in Jest?

## Đáp án chi tiết (VI)
`describe` nhóm các test liên quan thành suite, `it`/`test` định nghĩa từng test case, `expect` tạo assertion với matchers.\
\
- **describe** — nhóm test, nest được nhiều cấp; tên test nên đọc như documentation: `it('should return 404 when user not found')`.\
- **Matchers thường dùng** — `toBe` (=== cho primitives), `toEqual` (so sánh sâu cho object/array), `toMatchObject` (khớp một phần), `toContain`, `toHaveLength`, `toBeNull`/`toBeTruthy`/`toBeFalsy`, `toThrow`, `toHaveBeenCalledWith` (mock assertion).\
- **Async** — `await expect(promise).resolves.toBe(value)` hoặc `await expect(promise).rejects.toThrow()`.\
- **Hooks** — `beforeEach`/`afterEach` chạy quanh mỗi test (tạo test data, reset mock, cleanup); `beforeAll`/`afterAll` chạy một lần cho cả block (setup tốn kém: test server, DB connection).\
- **Biến thể** — `test.only`/`describe.only` chỉ chạy test được chọn (tiện khi debug, không commit); `test.skip` bỏ qua tạm thời; `test.each` cho parameterized tests với nhiều bộ input/output.

## Detailed Answer (EN)
`describe` groups related tests into a suite, `it`/`test` defines a test case, `expect` creates assertions with matchers.\
\
- **describe** — groups tests, can be nested; test names should read like documentation: `it('should return 404 when user not found')`.\
- **Common matchers** — `toBe` (=== for primitives), `toEqual` (deep equality for objects/arrays), `toMatchObject` (partial match), `toContain`, `toHaveLength`, `toBeNull`/`toBeTruthy`/`toBeFalsy`, `toThrow`, `toHaveBeenCalledWith` (mock assertion).\
- **Async** — `await expect(promise).resolves.toBe(value)` or `await expect(promise).rejects.toThrow()`.\
- **Hooks** — `beforeEach`/`afterEach` run around each test (create test data, reset mocks, cleanup); `beforeAll`/`afterAll` run once per block (expensive setup: test server, DB connection).\
- **Variants** — `test.only`/`describe.only` run only selected tests (handy for debugging, do not commit); `test.skip` skips temporarily; `test.each` for parameterized tests with multiple input/output sets.

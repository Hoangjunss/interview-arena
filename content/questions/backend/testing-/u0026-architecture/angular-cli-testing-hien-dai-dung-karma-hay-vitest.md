---
id: angular-cli-testing-hien-dai-dung-karma-hay-vitest
position: backend
technology: testing-\u0026-architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular CLI testing hiện đại dùng Karma hay Vitest?

## Question (EN)
Does modern Angular CLI testing use Karma or Vitest?

## Đáp án chi tiết (VI)
Angular docs hiện tại mô tả project CLI mới dùng Vitest với jsdom mặc định, trong khi Karma vẫn được hỗ trợ cho migration/legacy.\
\
Khi phỏng vấn, nên nói rõ bối cảnh version: codebase cũ có thể vẫn Karma/Jasmine, project mới nên cân nhắc Vitest; E2E vẫn là lớp riêng như Playwright/Cypress.

## Detailed Answer (EN)
Current Angular docs describe new CLI projects as using Vitest with jsdom by default, while Karma remains supported for migration/legacy projects.\
\
In interviews, clarify version context: older codebases may still use Karma/Jasmine, new projects should consider Vitest; E2E remains a separate layer like Playwright/Cypress.

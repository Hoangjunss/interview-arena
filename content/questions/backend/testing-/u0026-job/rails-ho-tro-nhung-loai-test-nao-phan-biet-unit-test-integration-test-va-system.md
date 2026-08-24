---
id: rails-ho-tro-nhung-loai-test-nao-phan-biet-unit-test-integration-test-va-system
position: backend
technology: testing-\u0026-job
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rails hỗ trợ những loại test nào? Phân biệt unit test, integration test và system test.

## Question (EN)
What testing types does Rails support? Distinguish unit, integration, and system tests.

## Đáp án chi tiết (VI)
Rails tích hợp sẵn Minitest. Hầu hết project thực tế dùng **RSpec** thay thế.\
\
| Loại test | Phạm vi | Tool |\
|---|---|---|\
| Unit (model) | Test 1 model, không browser | `type: :model` (RSpec) / `ActiveSupport::TestCase` |\
| Controller/Request | Test action, params, response code | `type: :request` (RSpec) |\
| Integration | Test nhiều layer, DB thật, không browser | `ActionDispatch::IntegrationTest` |\
| System | Full browser (JS), Capybara + Selenium | `ApplicationSystemTestCase` |\
\
Chạy test: `bundle exec rspec` hoặc `rails test`.

## Detailed Answer (EN)
Rails ships with Minitest. Most real-world projects use **RSpec** instead.\
\
| Test type | Scope | Tool |\
|---|---|---|\
| Unit (model) | Tests 1 model, no browser | `type: :model` (RSpec) / `ActiveSupport::TestCase` |\
| Controller/Request | Tests actions, params, response codes | `type: :request` (RSpec) |\
| Integration | Multiple layers, real DB, no browser | `ActionDispatch::IntegrationTest` |\
| System | Full browser (JS), Capybara + Selenium | `ApplicationSystemTestCase` |\
\
Run tests: `bundle exec rspec` or `rails test`.

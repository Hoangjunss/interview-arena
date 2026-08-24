---
id: databasecleaner-trong-rails-testing-dung-de-lam-gi-cac-strategy-pho-bien
position: backend
technology: testing-\u0026-job
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DatabaseCleaner trong Rails testing dùng để làm gì? Các strategy phổ biến?

## Question (EN)
What is DatabaseCleaner in Rails testing? What are the common strategies?

## Đáp án chi tiết (VI)
DatabaseCleaner đảm bảo mỗi test bắt đầu với DB sạch — tránh test state rò rỉ sang test khác.\
\
**Ba strategy chính:**\
\
| Strategy | Cơ chế | Tốc độ | Dùng khi |\
|---|---|---|---|\
| `transaction` | Wrap test trong transaction, rollback sau | Nhanh nhất | Unit/request test không cần JS |\
| `truncation` | TRUNCATE tất cả bảng | Chậm | System test (Capybara + JS), cần data persist |\
| `deletion` | DELETE FROM từng bảng | Trung bình | Ít dùng |\
\
```ruby\
# spec/support/database_cleaner.rb\
RSpec.configure do |config|\
  config.before(:suite) { DatabaseCleaner.strategy = :transaction }\
  config.around(:each)  { |ex| DatabaseCleaner.cleaning { ex.run } }\
\
  # System tests cần truncation vì Capybara dùng thread riêng\
  config.before(:each, type: :system) { DatabaseCleaner.strategy = :truncation }\
end\
```\
\
RSpec transactional fixtures (`use_transactional_fixtures: true`) cũng làm được điều tương tự nhưng DatabaseCleaner linh hoạt hơn khi mix nhiều loại test.

## Detailed Answer (EN)
DatabaseCleaner ensures each test starts with a clean DB state — preventing test state from leaking between examples.\
\
**Three main strategies:**\
\
| Strategy | Mechanism | Speed | Use when |\
|---|---|---|---|\
| `transaction` | Wraps test in a transaction, rolls back after | Fastest | Unit/request tests without JS |\
| `truncation` | TRUNCATEs all tables | Slowest | System tests (Capybara + JS), when data must persist |\
| `deletion` | DELETE FROM each table | Medium | Rarely used |\
\
```ruby\
# spec/support/database_cleaner.rb\
RSpec.configure do |config|\
  config.before(:suite) { DatabaseCleaner.strategy = :transaction }\
  config.around(:each)  { |ex| DatabaseCleaner.cleaning { ex.run } }\
\
  # System tests need truncation — Capybara uses a separate thread\
  config.before(:each, type: :system) { DatabaseCleaner.strategy = :truncation }\
end\
```\
\
RSpec transactional fixtures (`use_transactional_fixtures: true`) achieves the same thing but DatabaseCleaner is more flexible when mixing test types.

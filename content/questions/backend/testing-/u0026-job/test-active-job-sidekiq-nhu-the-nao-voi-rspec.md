---
id: test-active-job-sidekiq-nhu-the-nao-voi-rspec
position: backend
technology: testing-\u0026-job
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test Active Job / Sidekiq như thế nào với RSpec?

## Question (EN)
How do you test Active Job / Sidekiq with RSpec?

## Đáp án chi tiết (VI)
Rails cung cấp `ActiveJob::TestHelper` với matchers tích hợp.\
\
```ruby\
RSpec.describe PostsController, type: :request do\
  include ActiveJob::TestHelper\
\
  it \\"enqueues a welcome email after user creation\\" do\
    expect {\
      post \\"/users\\

## Detailed Answer (EN)
Rails provides `ActiveJob::TestHelper` with built-in matchers.\
\
```ruby\
RSpec.describe PostsController, type: :request do\
  include ActiveJob::TestHelper\
\
  it \\"enqueues a welcome email after user creation\\" do\
    expect {\
      post \\"/users\\

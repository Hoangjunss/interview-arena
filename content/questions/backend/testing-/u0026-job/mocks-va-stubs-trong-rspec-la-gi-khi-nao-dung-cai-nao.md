---
id: mocks-va-stubs-trong-rspec-la-gi-khi-nao-dung-cai-nao
position: backend
technology: testing-\u0026-job
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mocks và Stubs trong RSpec là gì? Khi nào dùng cái nào?

## Question (EN)
What are mocks and stubs in RSpec? When to use each?

## Đáp án chi tiết (VI)
**Stub** thay thế method thật bằng kết quả giả — kiểm soát đầu ra, không quan tâm có gọi hay không.\
**Mock** là stub + có kỳ vọng rằng method **phải được gọi** — test sẽ fail nếu không gọi.\
\
```ruby\
# Stub\
allow(UserMailer).to receive(:welcome).and_return(double(deliver_later: nil))\
\
# Mock (expect phải được gọi)\
expect(UserMailer).to receive(:welcome)\
  .with(user)\
  .once\
  .and_return(double(deliver_later: nil))\
```\
\
**Khi nào dùng:**\
- Stub: cô lập dependency (HTTP call, time, external service) để test nhanh và reliable.\
- Mock: verify behavior — \\"code này CÓ gọi service kia không\\" (integration point).\
\
Lạm dụng mock làm test brittle (test biết quá nhiều về implementation). Ưu tiên test behavior/output thật khi có thể.

## Detailed Answer (EN)
**Stub** replaces a real method with a fake return value — controls output, no expectation about whether it's called.\
**Mock** is a stub + an expectation that the method **must be called** — the test fails if it isn't.\
\
```ruby\
# Stub\
allow(UserMailer).to receive(:welcome).and_return(double(deliver_later: nil))\
\
# Mock (expect it to be called)\
expect(UserMailer).to receive(:welcome)\
  .with(user)\
  .once\
  .and_return(double(deliver_later: nil))\
```\
\
**When to use:**\
- Stub: isolate dependencies (HTTP calls, time, external services) for fast, reliable tests.\
- Mock: verify behavior — \\"did this code actually call that service?\\" (integration point).\
\
Overusing mocks makes tests brittle (they know too much about implementation). Prefer testing real behavior/output whenever possible.

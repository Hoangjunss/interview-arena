---
id: scopes-trong-active-record-la-gi-khi-nao-dung-scope-thay-vi-class-method
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scopes trong Active Record là gì? Khi nào dùng scope thay vì class method?

## Question (EN)
What are scopes in Active Record? When to use a scope vs. a class method?

## Đáp án chi tiết (VI)
Scope là named query được định nghĩa trong model, trả về `ActiveRecord::Relation` → chainable.\
\
```ruby\
class Article \u003c ApplicationRecord\
  scope :published, -\u003e { where(status: \\"published\\") }\
  scope :recent,    -\u003e { order(created_at: :desc).limit(10) }\
  scope :by_tag,    -\u003e(tag) { joins(:tags).where(tags: { name: tag }) }\
end\
\
Article.published.recent\
Article.published.by_tag(\\"ruby\\")\
```\
\
**Scope vs class method:** scope luôn trả về `ActiveRecord::Relation` (kể cả khi condition false → trả toàn bộ). Class method có thể trả `nil` → chain bị gãy. Với logic phức tạp hoặc cần trả nil có chủ đích → class method.

## Detailed Answer (EN)
A scope is a named query defined on the model that returns an `ActiveRecord::Relation` and is therefore chainable.\
\
```ruby\
class Article \u003c ApplicationRecord\
  scope :published, -\u003e { where(status: \\"published\\") }\
  scope :recent,    -\u003e { order(created_at: :desc).limit(10) }\
  scope :by_tag,    -\u003e(tag) { joins(:tags).where(tags: { name: tag }) }\
end\
\
Article.published.recent\
Article.published.by_tag(\\"ruby\\")\
```\
\
**Scope vs class method:** a scope always returns an `ActiveRecord::Relation` (even when the condition is false — it returns all). A class method can return `nil`, breaking a chain. Use class methods when logic is complex or when intentionally returning nil is desired.

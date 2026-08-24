---
id: factory-bot-la-gi-khac-fixture-nhu-the-nao
position: backend
technology: testing-\u0026-job
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Factory Bot là gì? Khác fixture như thế nào?

## Question (EN)
What is Factory Bot? How does it differ from fixtures?

## Đáp án chi tiết (VI)
Factory Bot (trước là FactoryGirl) là gem tạo test data linh hoạt — thay thế **fixtures** (file YAML static) bằng Ruby code.\
\
```ruby\
# spec/factories/users.rb\
FactoryBot.define do\
  factory :user do\
    name  { \\"John\\" }\
    email { Faker::Internet.email }\
    role  { :member }\
\
    trait :admin do\
      role { :admin }\
    end\
  end\
end\
\
# Trong test:\
user       = create(:user)           # tạo + lưu DB\
admin      = create(:user, :admin)   # dùng trait\
guest_user = build(:user)            # không lưu DB\
```\
\
**Fixture** load toàn bộ vào DB trước khi test — nhanh nhưng cứng, khó hiểu quan hệ. **Factory Bot** tạo khi cần — linh hoạt hơn, dễ đọc hơn, cho phép override attributes.

## Detailed Answer (EN)
Factory Bot (formerly FactoryGirl) is a gem for creating flexible test data — replacing **fixtures** (static YAML files) with Ruby code.\
\
```ruby\
# spec/factories/users.rb\
FactoryBot.define do\
  factory :user do\
    name  { \\"John\\" }\
    email { Faker::Internet.email }\
    role  { :member }\
\
    trait :admin do\
      role { :admin }\
    end\
  end\
end\
\
# In a test:\
user       = create(:user)           # creates and persists to DB\
admin      = create(:user, :admin)   # uses trait\
guest_user = build(:user)            # does not persist\
```\
\
**Fixtures** load everything into the DB before tests run — fast but rigid and hard to understand relationships. **Factory Bot** creates records on demand — more flexible, more readable, supports attribute overrides.

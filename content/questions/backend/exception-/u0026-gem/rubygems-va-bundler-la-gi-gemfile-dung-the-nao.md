---
id: rubygems-va-bundler-la-gi-gemfile-dung-the-nao
position: backend
technology: exception-\u0026-gem
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RubyGems và Bundler là gì? `Gemfile` dùng thế nào?

## Question (EN)
What are RubyGems and Bundler? How do you use a `Gemfile`?

## Đáp án chi tiết (VI)
**RubyGems** là package manager của Ruby — mỗi thư viện đóng gói thành một *gem*. CLI: `gem install \u003cname\u003e`.\
\
**Bundler** quản lý dependency của project: lock phiên bản cụ thể vào `Gemfile.lock`, đảm bảo mọi môi trường (dev/staging/prod) dùng đúng version.\
\
```ruby\
# Gemfile\
source \\"https://rubygems.org\\"\
ruby \\"3.3.0\\"\
\
gem \\"sinatra\\

## Detailed Answer (EN)
**RubyGems** is Ruby's package manager — each library is packaged as a *gem*. CLI: `gem install \u003cname\u003e`.\
\
**Bundler** manages project dependencies: it locks specific versions into `Gemfile.lock`, ensuring every environment (dev/staging/prod) uses exactly the same versions.\
\
```ruby\
# Gemfile\
source \\"https://rubygems.org\\"\
ruby \\"3.3.0\\"\
\
gem \\"sinatra\\

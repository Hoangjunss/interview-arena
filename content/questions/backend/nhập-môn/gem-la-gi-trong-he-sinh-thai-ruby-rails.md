---
id: gem-la-gi-trong-he-sinh-thai-ruby-rails
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gem là gì trong hệ sinh thái Ruby/Rails?

## Question (EN)
What is a Gem in the Ruby/Rails ecosystem?

## Đáp án chi tiết (VI)
Gem là thư viện (package) Ruby được phân phối qua RubyGems.org. Rails chính nó cũng là một gem. Trong project, dependency được khai báo trong `Gemfile` và quản lý bởi **Bundler**.\
\
```ruby\
# Gemfile\
gem \\"devise\\"        # authentication\
gem \\"pundit\\"        # authorization\
gem \\"sidekiq\\"       # background jobs\
\
group :development, :test do\
  gem \\"rspec-rails\\"\
end\
```\
\
`Gemfile.lock` lưu phiên bản đúng đắn đang dùng — commit file này vào git để mọi người trong team dùng cùng phiên bản.

## Detailed Answer (EN)
A Gem is a Ruby library (package) distributed via RubyGems.org. Rails itself is a gem. In a project, dependencies are declared in the `Gemfile` and managed by **Bundler**.\
\
```ruby\
# Gemfile\
gem \\"devise\\"        # authentication\
gem \\"pundit\\"        # authorization\
gem \\"sidekiq\\"       # background jobs\
\
group :development, :test do\
  gem \\"rspec-rails\\"\
end\
```\
\
`Gemfile.lock` records exact versions in use — commit this file to ensure every team member uses the same versions.

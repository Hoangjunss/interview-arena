---
id: validations-trong-active-record-cac-validation-pho-bien-nhat-la-gi
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Validations trong Active Record — các validation phổ biến nhất là gì?

## Question (EN)
What are Active Record validations? What are the most common ones?

## Đáp án chi tiết (VI)
Validations chạy trước `save` / `create` / `update`. Nếu fail, record không được lưu và lỗi nằm trong `record.errors`.\
\
```ruby\
class User \u003c ApplicationRecord\
  validates :name,  presence: true, length: { minimum: 2, maximum: 50 }\
  validates :email, presence: true,\
                    format: { with: URI::MailTo::EMAIL_REGEXP },\
                    uniqueness: { case_sensitive: false }\
  validates :age,   numericality: { greater_than: 0 }, allow_nil: true\
end\
\
user = User.new(name: \\"\\

## Detailed Answer (EN)
Validations run before `save` / `create` / `update`. On failure, the record is not persisted and errors live in `record.errors`.\
\
```ruby\
class User \u003c ApplicationRecord\
  validates :name,  presence: true, length: { minimum: 2, maximum: 50 }\
  validates :email, presence: true,\
                    format: { with: URI::MailTo::EMAIL_REGEXP },\
                    uniqueness: { case_sensitive: false }\
  validates :age,   numericality: { greater_than: 0 }, allow_nil: true\
end\
\
user = User.new(name: \\"\\

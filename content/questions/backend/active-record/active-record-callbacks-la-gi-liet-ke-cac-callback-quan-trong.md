---
id: active-record-callbacks-la-gi-liet-ke-cac-callback-quan-trong
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Active Record Callbacks là gì? Liệt kê các callback quan trọng.

## Question (EN)
What are Active Record Callbacks? List the important ones.

## Đáp án chi tiết (VI)
Callbacks là hooks vào lifecycle của model — chạy tự động khi object được create/update/destroy.\
\
**Thứ tự khi save một record mới:**\
```\
before_validation → after_validation\
→ before_save → before_create\
→ (INSERT INTO DB)\
→ after_create → after_save → after_commit\
```\
\
```ruby\
class Order \u003c ApplicationRecord\
  before_create  :generate_reference_code\
  after_commit   :send_confirmation_email, on: :create\
\
  private\
\
  def generate_reference_code\
    self.ref = SecureRandom.hex(6)\
  end\
end\
```\
\
`after_commit` chạy **sau khi transaction commit** — dùng cho side-effects (gửi mail, enqueue job). Dùng `after_save` có thể gửi mail dù transaction sau đó rollback.

## Detailed Answer (EN)
Callbacks are hooks into the model lifecycle — they run automatically when an object is created, updated, or destroyed.\
\
**Order when saving a new record:**\
```\
before_validation → after_validation\
→ before_save → before_create\
→ (INSERT INTO DB)\
→ after_create → after_save → after_commit\
```\
\
```ruby\
class Order \u003c ApplicationRecord\
  before_create  :generate_reference_code\
  after_commit   :send_confirmation_email, on: :create\
\
  private\
\
  def generate_reference_code\
    self.ref = SecureRandom.hex(6)\
  end\
end\
```\
\
`after_commit` runs **after the transaction commits** — use it for side-effects (sending emails, enqueuing jobs). Using `after_save` can trigger emails even if the transaction is later rolled back.

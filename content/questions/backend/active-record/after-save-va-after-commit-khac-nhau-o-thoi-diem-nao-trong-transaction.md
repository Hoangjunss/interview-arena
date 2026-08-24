---
id: after-save-va-after-commit-khac-nhau-o-thoi-diem-nao-trong-transaction
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`after_save` và `after_commit` khác nhau ở thời điểm nào trong transaction?

## Question (EN)
How do `after_save` and `after_commit` differ in transaction timing?

## Đáp án chi tiết (VI)
Khác biệt nằm ở **quan hệ với transaction của database**:\
\
- **`after_save`:** chạy **bên trong** transaction, ngay sau khi `INSERT`/`UPDATE` được gửi nhưng **trước khi `COMMIT`**. Nếu về sau transaction **rollback**, mọi thứ `after_save` làm cũng bị hủy theo nếu nằm trong DB — nhưng side-effect ngoài DB (gửi mail, enqueue job) thì **không** rollback được.\
- **`after_commit`:** chỉ chạy **sau khi `COMMIT` thành công**, tức dữ liệu đã bền vững. Không chạy nếu transaction rollback.\
\
```ruby\
class Order \u003c ApplicationRecord\
  after_save    { Rails.logger.info \\"trong transaction\\" }\
  after_commit  { PaymentMailer.receipt(self).deliver_later }\
end\
```\
\
**Vì sao quan trọng:** enqueue background job trong `after_save` dễ gây race — worker có thể chạy và query record **trước khi** transaction commit, thấy dữ liệu chưa tồn tại. Mọi side-effect ra thế giới bên ngoài (mail, job, webhook) nên đặt ở `after_commit`.

## Detailed Answer (EN)
The difference is their **relationship to the database transaction**:\
\
- **`after_save`:** runs **inside** the transaction, right after the `INSERT`/`UPDATE` is issued but **before `COMMIT`**. If the transaction later **rolls back**, DB changes are undone — but external side effects (sent email, enqueued job) **cannot** be rolled back.\
- **`after_commit`:** runs **only after a successful `COMMIT`**, meaning the data is durable. It does not run if the transaction rolls back.\
\
```ruby\
class Order \u003c ApplicationRecord\
  after_save    { Rails.logger.info \\"inside transaction\\" }\
  after_commit  { PaymentMailer.receipt(self).deliver_later }\
end\
```\
\
**Why it matters:** enqueuing a background job in `after_save` risks a race — the worker may run and query the record **before** the transaction commits, seeing data that does not exist yet. Any side effect that reaches the outside world (mail, job, webhook) belongs in `after_commit`.

---
id: transactions-trong-active-record-la-gi-khi-nao-can-dung
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transactions trong Active Record là gì? Khi nào cần dùng?

## Question (EN)
What are transactions in Active Record? When do you need one?

## Đáp án chi tiết (VI)
Transaction đảm bảo **tất cả hoặc không có** thao tác DB nào được commit — nếu bất kỳ bước nào fail, toàn bộ rollback.\
\
```ruby\
ActiveRecord::Base.transaction do\
  sender.update!(balance: sender.balance - amount)\
  receiver.update!(balance: receiver.balance + amount)\
  Transfer.create!(from: sender, to: receiver, amount: amount)\
end\
# Nếu receiver.update! raise → sender.balance cũng bị rollback\
```\
\
Transaction tự động bao quanh mỗi `save` / `create` / `destroy`. Cần explicit transaction khi:\
- Nhiều thao tác DB phụ thuộc nhau (chuyển tiền, đặt hàng + trừ kho).\
- Dùng `save!` (raise) để trigger rollback thay vì return false.\
\
**Lưu ý:** callback `after_commit` chạy sau khi transaction commit thành công — dùng cho side-effects để không trigger khi rollback.

## Detailed Answer (EN)
A transaction guarantees **all-or-nothing** DB operations — if any step fails, everything is rolled back.\
\
```ruby\
ActiveRecord::Base.transaction do\
  sender.update!(balance: sender.balance - amount)\
  receiver.update!(balance: receiver.balance + amount)\
  Transfer.create!(from: sender, to: receiver, amount: amount)\
end\
# If receiver.update! raises → sender.balance is also rolled back\
```\
\
Every `save` / `create` / `destroy` is automatically wrapped in a transaction. You need an explicit one when:\
- Multiple DB operations depend on each other (money transfers, order + inventory deduction).\
- Using `save!` (raises) to trigger rollback instead of returning false.\
\
**Note:** the `after_commit` callback fires only after a successful commit — use it for side-effects to avoid triggering them on rollback.

---
id: tai-sao-khong-nen-dung-model-class-trong-migration-cach-xu-ly-dung-khi-can-migra
position: backend
technology: migration-\u0026-db
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao không nên dùng model class trong migration? Cách xử lý đúng khi cần migrate data.

## Question (EN)
Why should you not reference a model class in a migration? How do you properly handle data migrations?

## Đáp án chi tiết (VI)
Gọi model class (VD: `User.update_all(...)`) trong migration nguy hiểm vì model thay đổi theo thời gian — migration cũ sẽ fail khi replay (setup fresh DB) vì model không còn method/association đó nữa.\
\
**Sai:**\
```ruby\
class BackfillUserRole \u003c ActiveRecord::Migration[7.1]\
  def up\
    User.where(role: nil).update_all(role: \\"member\\")  # nguy hiểm!\
  end\
end\
```\
\
**Đúng — dùng anonymous model hoặc raw SQL:**\
```ruby\
class BackfillUserRole \u003c ActiveRecord::Migration[7.1]\
  # Anonymous class chỉ biết schema hiện tại của migration này\
  class User \u003c ApplicationRecord; end\
\
  def up\
    User.where(role: nil).update_all(role: \\"member\\")\
  end\
end\
\
# Hoặc đơn giản hơn:\
def up\
  execute \\"UPDATE users SET role = 'member' WHERE role IS NULL\\"\
end\
```

## Detailed Answer (EN)
Referencing a model class (e.g. `User.update_all(...)`) in a migration is dangerous because the model evolves over time — old migrations break when replayed on a fresh DB because the model no longer has that method/association.\
\
**Wrong:**\
```ruby\
class BackfillUserRole \u003c ActiveRecord::Migration[7.1]\
  def up\
    User.where(role: nil).update_all(role: \\"member\\")  # dangerous!\
  end\
end\
```\
\
**Right — use an anonymous model or raw SQL:**\
```ruby\
class BackfillUserRole \u003c ActiveRecord::Migration[7.1]\
  # Anonymous class only knows the schema at the time of this migration\
  class User \u003c ApplicationRecord; end\
\
  def up\
    User.where(role: nil).update_all(role: \\"member\\")\
  end\
end\
\
# Or simpler:\
def up\
  execute \\"UPDATE users SET role = 'member' WHERE role IS NULL\\"\
end\
```

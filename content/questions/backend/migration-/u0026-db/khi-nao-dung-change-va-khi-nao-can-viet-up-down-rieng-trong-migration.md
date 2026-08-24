---
id: khi-nao-dung-change-va-khi-nao-can-viet-up-down-rieng-trong-migration
position: backend
technology: migration-\u0026-db
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng `change` và khi nào cần viết `up`/`down` riêng trong migration?

## Question (EN)
When should you use `change` vs. separate `up`/`down` in a migration?

## Đáp án chi tiết (VI)
`change` dùng cho các operations **tự reversible** — Rails biết cách đảo ngược:\
\
```ruby\
def change\
  add_column :users, :age, :integer   # down: remove_column\
  add_index :users, :email             # down: remove_index\
  create_table :posts do |t| ... end  # down: drop_table\
end\
```\
\
Một số operations **không reversible** → phải viết `up`/`down` rõ ràng:\
\
```ruby\
def up\
  execute \\"UPDATE users SET role = 'member' WHERE role IS NULL\\"\
end\
\
def down\
  raise ActiveRecord::IrreversibleMigration,\
    \\"Cannot reverse a data-only migration\\"\
end\
```\
\
Operations không reversible: `remove_column` (mất data type), `change_column`, `execute` raw SQL data.

## Detailed Answer (EN)
Use `change` for operations that are **inherently reversible** — Rails knows how to invert them:\
\
```ruby\
def change\
  add_column :users, :age, :integer   # down: remove_column\
  add_index :users, :email             # down: remove_index\
  create_table :posts do |t| ... end  # down: drop_table\
end\
```\
\
Some operations are **not reversible** — write explicit `up`/`down`:\
\
```ruby\
def up\
  execute \\"UPDATE users SET role = 'member' WHERE role IS NULL\\"\
end\
\
def down\
  raise ActiveRecord::IrreversibleMigration,\
    \\"Cannot reverse a data-only migration\\"\
end\
```\
\
Non-reversible operations: `remove_column` (loses type info), `change_column`, raw SQL data mutations.

---
id: struct-tags-trong-go-la-gi-va-dung-the-nao
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Struct tags trong Go là gì và dùng thế nào?

## Question (EN)
What are struct tags in Go and how are they used?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Struct tags** are metadata annotations attached to struct fields as string literals, read at runtime via reflection. JSON tags and validation tags are the most common.\
```go\
type User struct {\
    ID        int       `json:\\"id\\" db:\\"user_id\\"`\
    Name      string    `json:\\"name\\" validate:\\"required,min=2\\"`\
    Email     string    `json:\\"email\\" validate:\\"required,email\\"`\
    Password  string    `json:\\"-\\"`                      // always omit from JSON\
    CreatedAt time.Time `json:\\"created_at,omitempty\\"`  // omit if zero\
}\
\
// Read tags at runtime\
t := reflect.TypeOf(User{})\
field, _ := t.FieldByName(\\"Email\\")\
fmt.Println(field.Tag.Get(\\"json\\"))     // \\"email\\"\
fmt.Println(field.Tag.Get(\\"validate\\")) // \\"required,email\\"\
```\
\
**Common tag namespaces:** `json`, `db` (sqlx/GORM), `validate` (go-playground/validator), `yaml`, `env`. Tags have no effect on compile-time type safety — they only carry meaning when a package reads them via reflection.

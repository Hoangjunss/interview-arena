---
id: hashset-va-hashmap-khac-nhau-the-nao
position: backend
technology: collections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HashSet và HashMap khác nhau thế nào?

## Question (EN)
What is the difference between HashSet and HashMap?

## Đáp án chi tiết (VI)
Khác **mục đích**, nhưng dưới mui xe là cùng một thứ.\
\
| | **HashSet\u003cE\u003e** | **HashMap\u003cK,V\u003e** |\
|---|---|---|\
| Implements | `Set` | `Map` |\
| Lưu trữ | Phần tử **duy nhất** | **Cặp** key → value |\
| Method | `add`, `contains`, `remove` | `put`, `get`, `remove` |\
\
**Sự thật:** `HashSet` thực ra là **wrapper** của `HashMap` — value là dummy object dùng chung:\
\
```java\
// HashSet rút gọn\
public boolean add(E e) { return map.put(e, PRESENT) == null; }\
public boolean contains(Object o) { return map.containsKey(o); }\
```\
\
**Khi dùng:**\
- \\"Có phần tử này không?\\" → **`HashSet`**.\
- \\"Map key → giá trị\\" → **`HashMap`**.\
\
```java\
Set\u003cString\u003e visited = new HashSet\u003c\u003e();\
visited.add(\\"java\\");\
\
Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\
for (String w : words) count.merge(w, 1, Integer::sum);\
```\
\
**Yêu cầu chung:** element/key phải override `hashCode()` + `equals()` đúng. `record` (Java 16+) tự sinh đúng cả hai → default cho key.

## Detailed Answer (EN)
Different **purpose**, same internals.\
\
| | **HashSet\u003cE\u003e** | **HashMap\u003cK,V\u003e** |\
|---|---|---|\
| Implements | `Set` | `Map` |\
| Stores | **Unique** elements | **Key → value** pairs |\
| Methods | `add`, `contains`, `remove` | `put`, `get`, `remove` |\
\
**Truth:** `HashSet` is really a **wrapper** around `HashMap` — the value is a shared dummy object:\
\
```java\
// HashSet (simplified)\
public boolean add(E e) { return map.put(e, PRESENT) == null; }\
public boolean contains(Object o) { return map.containsKey(o); }\
```\
\
**Which to use:**\
- \\"Is this present?\\" → **`HashSet`**.\
- \\"Map key → associated value\\" → **`HashMap`**.\
\
```java\
Set\u003cString\u003e visited = new HashSet\u003c\u003e();\
visited.add(\\"java\\");\
\
Map\u003cString, Integer\u003e count = new HashMap\u003c\u003e();\
for (String w : words) count.merge(w, 1, Integer::sum);\
```\
\
**Shared requirement:** elements/keys must correctly override `hashCode()` + `equals()`. `record` (Java 16+) auto-generates both correctly → default for keys.

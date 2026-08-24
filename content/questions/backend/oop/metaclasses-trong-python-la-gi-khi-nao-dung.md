---
id: metaclasses-trong-python-la-gi-khi-nao-dung
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metaclasses trong Python là gì? Khi nào dùng?

## Question (EN)
What are metaclasses in Python? When to use them?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
Metaclass is the \\"class of a class\\" — controls how classes are created. `type` is the default metaclass.\
```python\
class SingletonMeta(type):\
    _instances = {}\
    def __call__(cls, *args, **kwargs):\
        if cls not in cls._instances:\
            cls._instances[cls] = super().__call__(*args, **kwargs)\
        return cls._instances[cls]\
\
class Database(metaclass=SingletonMeta): ...\
\
db1 = Database(); db2 = Database()\
assert db1 is db2  # True\
\
# Lighter alternative: __init_subclass__\
class PluginBase:\
    def __init_subclass__(cls, plugin_name: str, **kwargs):\
        super().__init_subclass__(**kwargs)\
        PluginBase._plugins[plugin_name] = cls\
```\
Use metaclasses for: Singleton, ORM models, plugin systems, API enforcement.

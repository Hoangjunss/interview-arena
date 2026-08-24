---
id: abstract-class-trong-python-dung-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class trong Python — dùng thế nào?

## Question (EN)
How are abstract classes used in Python?

## Đáp án chi tiết (VI)
Dùng `ABC` + `@abstractmethod` để tạo abstract class. Class con bắt buộc implement tất cả abstract methods, nếu không sẽ không instantiate được.\
```python\
from abc import ABC, abstractmethod\
\
class Repository(ABC):\
    @abstractmethod\
    async def get_by_id(self, id: int): ...\
\
    @abstractmethod\
    async def create(self, data: dict): ...\
\
    def find_all(self):          # Concrete method — có thể kế thừa\
        return self.get_all()\
\
class UserRepository(Repository):\
    async def get_by_id(self, id): ...   # Bắt buộc implement\
    async def create(self, data): ...    # Bắt buộc implement\
\
# Repository()  # TypeError — cannot instantiate abstract class\
```

## Detailed Answer (EN)
Use ABC + @abstractmethod. Subclasses must implement all abstract methods or they cannot be instantiated.\
```python\
from abc import ABC, abstractmethod\
\
class Animal(ABC):\
    @abstractmethod\
    def speak(self) -\u003e str: ...\
\
class Dog(Animal):\
    def speak(self): return \\"Woof!\\"\
\
# Animal()  # TypeError — abstract class\
Dog()       # OK\
```

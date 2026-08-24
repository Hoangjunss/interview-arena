---
id: closure-la-gi-khac-voi-lambda-the-nao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure là gì? Khác với lambda thế nào?

## Question (EN)
What is a closure? How does it differ from a lambda?

## Đáp án chi tiết (VI)
Closure là nested function \\"ghi nhớ\\" biến từ enclosing scope dù outer function đã kết thúc. Lambda là anonymous function một dòng — thường dùng cho logic đơn giản tức thời.\
```python\
# Closure — nhớ state\
def make_counter(start=0):\
    count = [start]\
    def counter():\
        count[0] += 1\
        return count[0]\
    return counter\
\
c = make_counter()\
print(c(), c(), c())  # 1, 2, 3\
\
# Lambda — function tức thời\
double = lambda x: x * 2\
```\
Lưu ý: Closure trong vòng lặp — mọi closure đều tham chiếu cùng biến vòng lặp, không phải giá trị tại thời điểm tạo.

## Detailed Answer (EN)
Closure is a nested function that remembers variables from its enclosing scope. Lambda is a one-line anonymous function.\
```python\
def make_multiplier(n):\
    return lambda x: x * n  # Closure over n\
\
double = make_multiplier(2)\
triple = make_multiplier(3)\
print(double(5), triple(5))  # 10, 15\
```\
Pitfall: Closures in loops capture the loop variable by reference, not by value.

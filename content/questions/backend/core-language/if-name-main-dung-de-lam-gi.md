---
id: if-name-main-dung-de-lam-gi
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`if __name__ == \\"__main__\\":` dùng để làm gì?

## Question (EN)
What is `if __name__ == \\"__main__\\":` for?

## Đáp án chi tiết (VI)
Mỗi module có biến `__name__`. Khi bạn **chạy file trực tiếp** (`python foo.py`), `__name__` của file đó bằng `\\"__main__\\"`. Khi file bị **import** từ nơi khác, `__name__` bằng tên module (`\\"foo\\"`).\
\
Đặt code chạy-thử / entry-point CLI trong khối này để nó **chỉ chạy khi gọi trực tiếp**, không chạy lúc bị import:\
\
```python\
def main():\
    ...\
\
if __name__ == \\"__main__\\":\
    main()\
```\
\
Nhờ vậy một file vừa là module tái sử dụng (import lấy hàm), vừa là script chạy được.

## Detailed Answer (EN)
Every module has a `__name__` variable. When you **run a file directly** (`python foo.py`), that file's `__name__` is `\\"__main__\\"`. When the file is **imported** elsewhere, `__name__` is the module name (`\\"foo\\"`).\
\
Put throwaway / CLI entry-point code in this block so it **runs only when invoked directly**, not on import:\
\
```python\
def main():\
    ...\
\
if __name__ == \\"__main__\\":\
    main()\
```\
\
This lets one file serve both as a reusable module (import its functions) and as a runnable script.

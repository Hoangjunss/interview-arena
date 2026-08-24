---
id: exception-groups-va-except-python-3-11-giai-quyet-van-de-gi
position: backend
technology: core-language
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exception Groups và `except*` (Python 3.11) giải quyết vấn đề gì?

## Question (EN)
What problem do Exception Groups and `except*` (Python 3.11) solve?

## Đáp án chi tiết (VI)
Trước 3.11, một khối `except` chỉ bắt được **một** exception. Khi nhiều tác vụ chạy song song (vd `asyncio.TaskGroup`) và **nhiều cái lỗi cùng lúc**, không có cách nào biểu diễn hay xử lý cả chùm lỗi một cách trọn vẹn.\
\
**`ExceptionGroup`** gói **nhiều** exception vào một object duy nhất. Cú pháp mới **`except*`** bắt **theo từng loại** bên trong nhóm: phần khớp được xử lý, phần còn lại tiếp tục lan lên dưới dạng nhóm nhỏ hơn.\
\
```python\
try:\
    async with asyncio.TaskGroup() as tg:\
        ...\
except* ValueError as eg:\
    ...   # xử lý các ValueError trong nhóm\
except* TypeError as eg:\
    ...   # xử lý các TypeError trong nhóm\
```

## Detailed Answer (EN)
Before 3.11, one `except` block could catch only **one** exception. When many tasks run concurrently (e.g. `asyncio.TaskGroup`) and **several fail at once**, there was no way to represent or handle the whole batch of errors coherently.\
\
**`ExceptionGroup`** wraps **multiple** exceptions into one object. The new **`except*`** syntax matches **by type within the group**: the matching part is handled, the rest keeps propagating as a smaller group.\
\
```python\
try:\
    async with asyncio.TaskGroup() as tg:\
        ...\
except* ValueError as eg:\
    ...   # handle the ValueErrors in the group\
except* TypeError as eg:\
    ...   # handle the TypeErrors in the group\
```

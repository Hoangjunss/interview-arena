---
id: backgroundtasks-trong-fastapi-dung-cho-viec-gi
position: backend
technology: database-\u0026-async
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BackgroundTasks trong FastAPI dùng cho việc gì?

## Question (EN)
What are BackgroundTasks used for in FastAPI?

## Đáp án chi tiết (VI)
`BackgroundTasks` chạy task sau khi response đã gửi, phù hợp cho việc nhẹ như gửi email, ghi audit log hoặc gọi webhook không critical. Nó không thay thế queue thật.\
\
Ví dụ:\
```python\
@app.post(\\"/signup\\")\
async def signup(payload: Signup, tasks: BackgroundTasks):\
    user = await create_user(payload)\
    tasks.add_task(send_welcome_email, user.email)\
    return user\
```\
Nếu task cần retry, scheduling, durability hoặc chạy lâu, nên dùng Celery/RQ/Arq, message broker hoặc workflow engine.

## Detailed Answer (EN)
`BackgroundTasks` runs a task after the response has been sent, fitting lightweight work such as sending email, writing audit logs or non-critical webhooks. It is not a replacement for a real queue.\
\
Example:\
```python\
@app.post(\\"/signup\\")\
async def signup(payload: Signup, tasks: BackgroundTasks):\
    user = await create_user(payload)\
    tasks.add_task(send_welcome_email, user.email)\
    return user\
```\
If the task needs retry, scheduling, durability or long execution, use Celery/RQ/Arq, a message broker or a workflow engine.

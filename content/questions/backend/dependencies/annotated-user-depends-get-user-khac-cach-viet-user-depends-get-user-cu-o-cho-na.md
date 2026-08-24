---
id: annotated-user-depends-get-user-khac-cach-viet-user-depends-get-user-cu-o-cho-na
position: backend
technology: dependencies
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Annotated[User, Depends(get_user)]` khác cách viết `user = Depends(get_user)` cũ ở chỗ nào?

## Question (EN)
How does `Annotated[User, Depends(get_user)]` differ from the older `user = Depends(get_user)`?

## Đáp án chi tiết (VI)
`Annotated` đặt `Depends` vào **phần kiểu**, không phải phần giá trị mặc định. FastAPI khuyến nghị cách này từ bản 0.95.0, và Ruff có rule `FAST002` để bắt cách viết cũ.\
\
```python\
CurrentUser = Annotated[User, Depends(get_current_user)]\
\
@app.get(\\"/me\\")\
async def me(user: CurrentUser):\
    return user\
\
# old style\
@app.get(\\"/me-old\\")\
async def me_old(user: User = Depends(get_current_user)):\
    return user\
```\
\
Ba lợi ích thực tế:\
- **Kiểu được giữ nguyên** → editor và mypy vẫn hiểu `user` là `User`, thay vì suy ra kiểu của `Depends`.\
- **Không vướng thứ tự tham số**: cách cũ biến tham số thành \\"có giá trị mặc định\\

## Detailed Answer (EN)
`Annotated` puts `Depends` in the **type position** rather than in the default-value position. FastAPI has recommended it since 0.95.0, and Ruff ships rule `FAST002` to flag the old form.\
\
```python\
CurrentUser = Annotated[User, Depends(get_current_user)]\
\
@app.get(\\"/me\\")\
async def me(user: CurrentUser):\
    return user\
\
# old style\
@app.get(\\"/me-old\\")\
async def me_old(user: User = Depends(get_current_user)):\
    return user\
```\
\
Three practical wins:\
- **Type is preserved** → editors and mypy still see `user` as `User` instead of inferring the `Depends` type.\
- **No parameter-ordering trap**: the old form makes the parameter \\"have a default\\

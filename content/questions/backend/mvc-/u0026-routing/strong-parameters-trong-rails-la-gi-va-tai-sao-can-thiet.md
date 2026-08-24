---
id: strong-parameters-trong-rails-la-gi-va-tai-sao-can-thiet
position: backend
technology: mvc-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Strong Parameters trong Rails là gì và tại sao cần thiết?

## Question (EN)
What are Strong Parameters in Rails and why are they needed?

## Đáp án chi tiết (VI)
Strong Parameters (Rails 4+) bắt controller khai báo tường minh những tham số nào được phép gán vào model — ngăn **mass assignment vulnerability** (attacker gửi param ẩn như `admin=true` để leo quyền).\
\
```ruby\
# KHÔNG an toàn (Rails 2 style):\
User.create(params[:user])  # có thể truyền bất kỳ field nào\
\
# AN TOÀN với Strong Parameters:\
def user_params\
  params.require(:user).permit(:name, :email, :password)\
end\
\
User.create(user_params)\
```\
\
Nếu params chứa field không được `permit`, nó bị bỏ qua. Nếu field được `require` thiếu, Rails raise `ActionController::ParameterMissing`.

## Detailed Answer (EN)
Strong Parameters (Rails 4+) force the controller to explicitly declare which parameters are allowed to be assigned to a model — preventing **mass assignment vulnerabilities** (an attacker sending hidden params like `admin=true` to escalate privileges).\
\
```ruby\
# UNSAFE (Rails 2 style):\
User.create(params[:user])  # any field can be passed\
\
# SAFE with Strong Parameters:\
def user_params\
  params.require(:user).permit(:name, :email, :password)\
end\
\
User.create(user_params)\
```\
\
Any un-permitted param is silently ignored. If a `require`d field is missing, Rails raises `ActionController::ParameterMissing`.

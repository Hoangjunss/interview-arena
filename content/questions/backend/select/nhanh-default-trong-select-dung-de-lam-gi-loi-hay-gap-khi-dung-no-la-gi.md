---
id: nhanh-default-trong-select-dung-de-lam-gi-loi-hay-gap-khi-dung-no-la-gi
position: backend
technology: select
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhánh `default` trong `select` dùng để làm gì? Lỗi hay gặp khi dùng nó là gì?

## Question (EN)
What is the `default` branch in `select` for? What is the common trap with it?

## Đáp án chi tiết (VI)
`select` không có `default` sẽ **chặn** cho tới khi một nhánh sẵn sàng. Thêm `default` biến nó thành thao tác **không chặn**: nếu không có nhánh nào sẵn sàng ngay, `default` chạy luôn.\
\
Ứng dụng chính là **try-send / try-receive** — bỏ bớt việc khi hệ thống quá tải thay vì để người gọi phải chờ:\
\
```go\
select {\
case metrics \u003c- sample:\
    // enqueued\
default:\
    dropped.Add(1) // buffer full: drop instead of blocking the caller\
}\
```\
\
**Lưu ý:** đặt `select { case ...; default: }` bên trong vòng `for` mà không có gì chặn lại. Lúc đó goroutine quay vòng liên tục, ăn hết một nhân CPU trong khi chẳng làm gì.\
\
```go\
for {\
    select {\
    case v := \u003c-ch:\
        handle(v)\
    default:\
        // busy loop: burns a CPU core\
    }\
}\
```\
\
Muốn chờ mà vẫn có lối thoát thì **bỏ `default`** và thêm một nhánh thoát (`\u003c-ctx.Done()`, `\u003c-time.After(...)`). Lưu ý thêm: khi nhiều nhánh cùng sẵn sàng, `select` chọn **ngẫu nhiên đều** một nhánh, không theo thứ tự viết — không được dựa vào thứ tự để làm ưu tiên.

## Detailed Answer (EN)
$83

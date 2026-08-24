---
id: enctype-attribute-co-nhung-gia-tri-nao
position: backend
technology: forms
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Enctype attribute có những giá trị nào?

## Question (EN)
What values does the enctype attribute accept?

## Đáp án chi tiết (VI)
`enctype` quyết định **cách browser đóng gói dữ liệu form** khi `method=\\"post\\"`.\
\
```html\
\u003c!-- mặc định: key=value\u0026key=value, đã URL-encode --\u003e\
\u003cform method=\\"post\\"\u003e                          \
\
\u003c!-- bắt buộc khi có input type=file --\u003e\
\u003cform method=\\"post\\" enctype=\\"multipart/form-data\\"\u003e\
  \u003cinput type=\\"file\\" name=\\"avatar\\"\u003e\
\u003c/form\u003e\
\
\u003c!-- không encode; chỉ dùng để xem cho dễ khi debug --\u003e\
\u003cform method=\\"post\\" enctype=\\"text/plain\\"\u003e\
```\
\
| Giá trị | Khi nào dùng | Dạng body |\
|---|---|---|\
| `application/x-www-form-urlencoded` | mặc định, dữ liệu chữ | `name=Dinh\u0026age=30` |\
| `multipart/form-data` | **có file** | chia phần theo boundary |\
| `text/plain` | debug | thô, không encode |\
\
**Lưu ý:** quên `enctype=\\"multipart/form-data\\"` khi upload — browser vẫn gửi form, nhưng chỉ gửi **tên file** dạng chuỗi, không có nội dung. Server nhận được `avatar=\\"anh.png\\"` và không hiểu vì sao file rỗng.\
\
**Ghi chú:** gửi bằng `fetch` với `FormData` thì **không được tự đặt `Content-Type`** — browser cần tự sinh boundary.

## Detailed Answer (EN)
$80

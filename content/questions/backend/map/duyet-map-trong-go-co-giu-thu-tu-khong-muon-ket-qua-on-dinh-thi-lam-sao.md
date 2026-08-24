---
id: duyet-map-trong-go-co-giu-thu-tu-khong-muon-ket-qua-on-dinh-thi-lam-sao
position: backend
technology: map
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Duyệt map trong Go có giữ thứ tự không? Muốn kết quả ổn định thì làm sao?

## Question (EN)
Does map iteration in Go preserve order? How do you get stable output?

## Đáp án chi tiết (VI)
**Không.** Spec quy định thứ tự lặp trên map là **không xác định**, và runtime còn cố tình **ngẫu nhiên hóa điểm bắt đầu** mỗi lần chạy để lập trình viên không lỡ phụ thuộc vào nó.\
\
```go\
m := map[string]int{\\"a\\": 1, \\"b\\": 2, \\"c\\": 3}\
for k, v := range m {\
    fmt.Println(k, v) // thứ tự khác nhau giữa các lần chạy\
}\
```\
\
Muốn ổn định thì **sắp xếp khóa** rồi duyệt:\
\
```go\
keys := make([]string, 0, len(m))\
for k := range m {\
    keys = append(keys, k)\
}\
sort.Strings(keys)\
for _, k := range keys {\
    fmt.Println(k, m[k])\
}\
```\
\
**Lưu ý:**\
- Test so sánh chuỗi output sinh từ map sẽ **lúc pass lúc fail**.\
- Sinh câu SQL hay chữ ký request (HMAC) từ map mà không sắp khóa sẽ cho kết quả khác nhau mỗi lần.\
- `encoding/json` là ngoại lệ: `Marshal` **tự sắp xếp khóa** map, nên JSON output vẫn ổn định.\
\
Sửa map trong lúc `range`: khóa mới thêm **có thể xuất hiện hoặc không**; khóa vừa `delete` chắc chắn không được duyệt tới nữa. Xóa trong lúc duyệt là hợp lệ, còn thêm thì nên tránh.

## Detailed Answer (EN)
$82

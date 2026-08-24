---
id: muon-biet-queryset-co-du-lieu-hay-khong-thi-dung-exists-count-hay-len
position: backend
technology: queryset
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn biết QuerySet có dữ liệu hay không thì dùng `exists()`, `count()` hay `len()`?

## Question (EN)
To check whether a QuerySet has data, should you use `exists()`, `count()`, or `len()`?

## Đáp án chi tiết (VI)
Chọn theo **việc bạn sẽ làm tiếp với dữ liệu**, vì QuerySet chỉ chạy query khi bị đánh giá và **cache kết quả sau lần đánh giá đầu tiên**.\
\
- **Chỉ cần biết có hay không** → `qs.exists()`. SQL sinh ra là `SELECT 1 ... LIMIT 1`, không kéo dòng nào về Python.\
- **Chỉ cần số lượng** → `qs.count()` → `SELECT COUNT(*)`, database đếm, không tải object.\
- **Sẽ duyệt qua toàn bộ dữ liệu ngay sau đó** → cứ `if qs:` hoặc `len(qs)`. Lúc này QuerySet được đánh giá đầy đủ, kết quả nằm trong cache nội bộ, nên vòng lặp phía sau **không tốn thêm query**.\
\
```python\
if Order.objects.filter(user=user).exists():   # cheapest existence check\
    ...\
\
orders = Order.objects.filter(user=user)\
if orders:            # evaluates and fills the cache\
    for o in orders:  # no second query\
        ...\
```\
\
**Sai lầm hay gặp:** gọi `qs.exists()` rồi ngay sau đó lặp qua `qs` — thành 2 query. Hoặc ngược lại, dùng `len(qs)` chỉ để kiểm tra rỗng trên bảng lớn — kéo toàn bộ dòng về vô ích.

## Detailed Answer (EN)
$83

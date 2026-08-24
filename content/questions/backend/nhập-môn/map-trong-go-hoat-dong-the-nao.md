---
id: map-trong-go-hoat-dong-the-nao
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Map trong Go hoạt động thế nào?

## Question (EN)
How do maps work in Go?

## Đáp án chi tiết (VI)
Map là kiểu dữ liệu key-value tích hợp sẵn trong Go, khai báo bằng `m := map[string]int{\\"a\\": 1}` hoặc `make(map[string]int)`.\
\
- **Check key tồn tại:** `val, ok := m[\\"key\\"]` — `ok` là false nếu key không tồn tại (zero value của value type).\
- **Xoá:** `delete(m, \\"key\\")` — không panic nếu key không tồn tại.\
- **Không thread-safe:** truy cập concurrent phải dùng `sync.Map` hoặc bọc bằng mutex.\
- **Zero value là nil:** map nil chỉ đọc được, ghi sẽ panic — phải `make` hoặc dùng literal trước khi gán.\
- **Iteration order không xác định:** mỗi lần range cho thứ tự khác nhau, là design có chủ ý của Go.

## Detailed Answer (EN)
A map is Go's built-in key-value type, declared with `m := map[string]int{\\"a\\": 1}` or `make(map[string]int)`.\
\
- **Existence check:** `val, ok := m[\\"key\\"]` — `ok` is false when the key is missing (and `val` is the value type's zero value).\
- **Delete:** `delete(m, \\"key\\")` — safe to call even if the key is absent.\
- **Not thread-safe:** concurrent access requires `sync.Map` or a mutex.\
- **Zero value is nil:** a nil map is read-only — writing to it panics. Initialize with `make` or a literal first.\
- **Iteration order is randomized:** every range produces a different order — by design.

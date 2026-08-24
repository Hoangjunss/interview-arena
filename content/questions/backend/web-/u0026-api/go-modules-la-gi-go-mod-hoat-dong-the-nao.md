---
id: go-modules-la-gi-go-mod-hoat-dong-the-nao
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Go modules là gì? go.mod hoạt động thế nào?

## Question (EN)
What are Go modules? How does go.mod work?

## Đáp án chi tiết (VI)
Go modules là hệ thống quản lý dependency chính thức của Go, khởi tạo bằng `go mod init module-name` để tạo file go.mod chứa tên module và danh sách dependencies. Khi cần thêm thư viện, dùng `go get package@version`, và `go mod tidy` để tự động dọn dẹp các dependency không còn sử dụng cũng như thêm các dependency bị thiếu.\
\
File go.sum đóng vai trò lock file (tương tự package-lock.json trong Node.js), lưu checksum chính xác của từng dependency để đảm bảo build reproducible.\
\
Go modules còn hỗ trợ `replace` directive để trỏ sang local module khi phát triển, và sử dụng `GOPROXY` để tải dependency qua proxy server nhằm tăng tốc và đảm bảo tính sẵn có.

## Detailed Answer (EN)
Go modules are Go's official dependency management system. Initialize with `go mod init module-name` to create go.mod, which tracks the module name and dependencies. Add libraries with `go get package@version`; run `go mod tidy` to clean up unused dependencies and add missing ones.\
\
The go.sum file is a lock file (similar to package-lock.json) storing exact checksums for reproducible builds.\
\
Modules also support the `replace` directive for local development and `GOPROXY` for faster, more reliable dependency fetching.

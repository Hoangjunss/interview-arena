---
id: soft-delete-trong-laravel-la-gi
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Soft delete trong Laravel là gì?

## Question (EN)
What is soft delete in Laravel?

## Đáp án chi tiết (VI)
Soft delete đánh dấu record là đã xóa mà không thực sự xóa khỏi database. Thêm vào model: `use SoftDeletes;` và migration thêm `$table-\u003esoftDeletes();` tạo cột `deleted_at`. Query tự động loại trừ record đã soft-delete: `User::all()` không bao gồm đã xóa. Truy cập bằng: `User::withTrashed()-\u003eget()` (bao gồm đã xóa), `User::onlyTrashed()-\u003eget()` (chỉ đã xóa), `$user-\u003erestore()` (khôi phục), `$user-\u003eforceDelete()` (xóa vĩnh viễn). \
\
**Lợi ích:** giữ dữ liệu để audit/phục hồi, hoàn tác xóa nhầm, tuân thủ quy định giữ bản ghi. Soft delete tăng độ an toàn dữ liệu.

## Detailed Answer (EN)
Soft delete marks records as deleted without removing from database. Add to model: `use SoftDeletes;` and migration includes `$table-\u003esoftDeletes();` creating `deleted_at` column. Queries automatically exclude soft-deleted records: `User::all()` excludes deleted. Access with `User::withTrashed()-\u003eget()` (includes deleted), `User::onlyTrashed()-\u003eget()` (only deleted), `$user-\u003erestore()` (undelete), `$user-\u003eforceDelete()` (permanently remove). \
\
**Benefits:** preserve data for auditing/recovery, undo accidental deletions, comply with regulations keeping records. Soft deletes improve data safety without permanent loss.

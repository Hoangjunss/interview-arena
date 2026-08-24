---
id: quiz-ruby-on-rails-cache-theo-khoa-phu-thuoc-ban-ghi-trong-rails-hoat-dong-the-nao
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache theo khoá phụ thuộc bản ghi trong Rails hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Bộ đệm chỉ hoạt động với dữ liệu không thay đổi
- [ ] Rails theo dõi mọi truy vấn để biết khi nào cần xoá đệm
- [ ] Bộ đệm được xoá tự động sau một khoảng thời gian
- [x] Khoá đệm chứa thời điểm cập nhật nên tự hết hiệu lực

## Giải thích (VI)
Khoá đệm được tạo từ định danh và thời điểm cập nhật của bản ghi. Bản ghi thay đổi thì khoá đổi theo và mục đệm cũ tự trở nên vô dụng, nên không phải viết mã xoá đệm thủ công.

### Giải thích các phương án:
- **Bộ đệm chỉ hoạt động với dữ liệu không thay đổi** (Sai): Nó được thiết kế cho cả dữ liệu thay đổi.
- **Rails theo dõi mọi truy vấn để biết khi nào cần xoá đệm** (Sai): Không có cơ chế theo dõi truy vấn như vậy.
- **Bộ đệm được xoá tự động sau một khoảng thời gian** (Sai): Thời hạn là cơ chế khác và không dựa vào thay đổi dữ liệu.
- **Khoá đệm chứa thời điểm cập nhật nên tự hết hiệu lực** (Đúng): Bản ghi đổi thì khoá đổi theo nên không cần xoá đệm thủ công.

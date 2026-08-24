---
id: quiz-terraform-iac-terraform-theo-mo-hinh-khai-bao-nghia-la-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Terraform theo mô hình khai báo nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Cấu hình được biên dịch thành mã máy trước khi chạy
- [ ] Mọi thay đổi phải được viết dưới dạng kịch bản
- [ ] Các lệnh được chạy tuần tự theo thứ tự trong tệp
- [x] Mô tả trạng thái mong muốn, công cụ tự lo

## Giải thích (VI)
Người viết mô tả trạng thái mong muốn còn công cụ tự tính ra các bước để đạt tới. Nhờ vậy chạy lại nhiều lần vẫn cho cùng kết quả, khác với kịch bản mệnh lệnh vốn có thể tạo trùng tài nguyên khi chạy hai lần.

### Giải thích các phương án:
- **Cấu hình được biên dịch thành mã máy trước khi chạy** (Sai): Không có bước biên dịch nào như vậy.
- **Mọi thay đổi phải được viết dưới dạng kịch bản** (Sai): Đó là mô hình mệnh lệnh, ngược với khai báo.
- **Các lệnh được chạy tuần tự theo thứ tự trong tệp** (Sai): Thứ tự thực thi do đồ thị phụ thuộc quyết định, không theo thứ tự viết.
- **Mô tả trạng thái mong muốn, công cụ tự lo** (Đúng): Người viết không mô tả từng bước, nên chạy lại nhiều lần vẫn cho cùng kết quả.

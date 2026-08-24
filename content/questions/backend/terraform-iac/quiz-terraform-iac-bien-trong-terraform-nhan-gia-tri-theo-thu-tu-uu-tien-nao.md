---
id: quiz-terraform-iac-bien-trong-terraform-nhan-gia-tri-theo-thu-tu-uu-tien-nao
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Biến trong Terraform nhận giá trị theo thứ tự ưu tiên nào?

## Đáp án trắc nghiệm
- [ ] Giá trị mặc định trong khai báo luôn thắng
- [ ] Biến môi trường luôn được ưu tiên cao nhất
- [ ] Terraform báo lỗi khi có nhiều nguồn cùng cấp giá trị
- [x] Tham số dòng lệnh cao hơn tệp giá trị

## Giải thích (VI)
Thứ tự từ thấp lên cao: giá trị mặc định, biến môi trường, tệp giá trị tự động nạp, tệp chỉ định tường minh, rồi tham số dòng lệnh ở mức cao nhất. Nhờ vậy ghi đè tạm được mà không phải sửa tệp.

### Giải thích các phương án:
- **Giá trị mặc định trong khai báo luôn thắng** (Sai): Mặc định là mức thấp nhất, chỉ dùng khi không có nguồn nào khác.
- **Biến môi trường luôn được ưu tiên cao nhất** (Sai): Biến môi trường đứng thấp hơn tệp giá trị và tham số dòng lệnh.
- **Terraform báo lỗi khi có nhiều nguồn cùng cấp giá trị** (Sai): Nó áp dụng thứ tự ưu tiên chứ không báo lỗi.
- **Tham số dòng lệnh cao hơn tệp giá trị** (Đúng): Thứ tự này cho phép ghi đè tạm thời khi cần mà không phải sửa tệp cấu hình.

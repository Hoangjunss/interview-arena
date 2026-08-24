---
id: quiz-terraform-iac-khong-ghim-phien-ban-nha-cung-cap-dan-toi-rui-ro-gi
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Không ghim phiên bản nhà cung cấp dẫn tới rủi ro gì?

## Đáp án trắc nghiệm
- [ ] Không tải được nhà cung cấp khi không có mạng
- [ ] Trạng thái không tương thích giữa các máy
- [x] Một lần chạy thường bỗng đề xuất đổi hàng loạt
- [ ] Terraform từ chối chạy khi không có ràng buộc phiên bản

## Giải thích (VI)
Một lần chạy bình thường có thể đề xuất thay đổi hàng loạt tài nguyên vì bản nhà cung cấp mới đổi giá trị mặc định hoặc cách diễn giải thuộc tính. Trên môi trường sản phẩm, đó là rủi ro không cần thiết.

### Giải thích các phương án:
- **Không tải được nhà cung cấp khi không có mạng** (Sai): Đây là vấn đề riêng về môi trường chạy.
- **Trạng thái không tương thích giữa các máy** (Sai): Định dạng trạng thái ổn định hơn nhiều so với hành vi nhà cung cấp.
- **Một lần chạy thường bỗng đề xuất đổi hàng loạt** (Đúng): Bản nhà cung cấp mới có thể đổi giá trị mặc định hoặc cách diễn giải thuộc tính.
- **Terraform từ chối chạy khi không có ràng buộc phiên bản** (Sai): Nó vẫn chạy và lấy phiên bản mới nhất phù hợp.

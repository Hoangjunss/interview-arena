---
id: quiz-terraform-iac-ke-hoach-bao-mot-tai-nguyen-se-bi-xoa-va-tao-lai-nguyen-nhan-thuong-gap
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kế hoạch báo một tài nguyên sẽ bị xoá và tạo lại. Nguyên nhân thường gặp?

## Đáp án trắc nghiệm
- [ ] Phiên bản Terraform khác với lần chạy trước
- [ ] Tệp trạng thái đã bị hỏng hoặc mất đồng bộ
- [ ] Tài nguyên đã bị xoá thủ công trên bảng điều khiển
- [x] Thuộc tính bị đổi là loại không sửa được tại chỗ

## Giải thích (VI)
Thuộc tính vừa đổi là loại không sửa được tại chỗ theo quy định của nhà cung cấp, ví dụ tên hoặc vùng của một số tài nguyên. Terraform phải xoá rồi tạo mới, và với cơ sở dữ liệu thì đó là mất dữ liệu.

### Giải thích các phương án:
- **Phiên bản Terraform khác với lần chạy trước** (Sai): Đổi phiên bản công cụ hiếm khi gây thay thế tài nguyên.
- **Tệp trạng thái đã bị hỏng hoặc mất đồng bộ** (Sai): Trạng thái hỏng gây lỗi khác chứ không tạo ra kế hoạch xoá và tạo lại có chủ đích.
- **Tài nguyên đã bị xoá thủ công trên bảng điều khiển** (Sai): Trường hợp đó kế hoạch sẽ báo tạo mới chứ không báo xoá trước.
- **Thuộc tính bị đổi là loại không sửa được tại chỗ** (Đúng): Một số thuộc tính do nhà cung cấp quy định là bất biến nên đổi chúng buộc phải tạo tài nguyên mới.

---
id: quiz-terraform-iac-doi-ten-mot-khoi-tai-nguyen-trong-ma-ma-khong-muon-tai-nguyen-bi-tao-lai-thi-lam
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đổi tên một khối tài nguyên trong mã mà không muốn tài nguyên bị tạo lại thì làm gì?

## Đáp án trắc nghiệm
- [x] Khai báo việc di chuyển địa chỉ trong trạng thái
- [ ] Chạy áp dụng hai lần cho Terraform tự nhận ra
- [ ] Xoá tệp trạng thái rồi nhập lại toàn bộ
- [ ] Giữ tên cũ và thêm ghi chú giải thích trong mã

## Giải thích (VI)
Khai báo việc di chuyển địa chỉ trong trạng thái , bằng khối khai báo trong mã hoặc bằng lệnh di chuyển. Terraform nhận diện tài nguyên theo địa chỉ trong cấu hình, nên đổi tên mà không khai báo sẽ bị coi là xoá cái cũ tạo cái mới.

### Giải thích các phương án:
- **Khai báo việc di chuyển địa chỉ trong trạng thái** (Đúng): Terraform nhận diện tài nguyên theo địa chỉ trong mã nên đổi tên bị coi là tài nguyên khác.
- **Chạy áp dụng hai lần cho Terraform tự nhận ra** (Sai): Lần đầu đã xoá và tạo lại rồi.
- **Xoá tệp trạng thái rồi nhập lại toàn bộ** (Sai): Cách này rất rủi ro và tốn thời gian không cần thiết.
- **Giữ tên cũ và thêm ghi chú giải thích trong mã** (Sai): Né vấn đề chứ không giải quyết, và mã dần khó đọc.

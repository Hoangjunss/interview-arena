---
id: quiz-terraform-iac-vi-sao-nen-dung-vong-lap-theo-khoa-thay-vi-theo-chi-so-khi-tao-nhieu-tai-nguyen
position: backend
technology: terraform-iac
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng vòng lặp theo khoá thay vì theo chỉ số khi tạo nhiều tài nguyên?

## Đáp án trắc nghiệm
- [ ] Vòng lặp theo khoá cho phép đặt tên tài nguyên tuỳ ý
- [x] Xoá phần tử giữa không làm dịch các phần tử sau
- [ ] Vòng lặp theo chỉ số không dùng được với module
- [ ] Vòng lặp theo khoá chạy nhanh hơn khi áp dụng

## Giải thích (VI)
Với vòng lặp theo chỉ số, xoá một phần tử ở giữa làm mọi phần tử sau bị dịch chỉ số , nên Terraform coi chúng là tài nguyên khác và xoá tạo lại hàng loạt. Lặp theo khoá thì mỗi tài nguyên có địa chỉ ổn định.

### Giải thích các phương án:
- **Vòng lặp theo khoá cho phép đặt tên tài nguyên tuỳ ý** (Sai): Tên tài nguyên do thuộc tính quyết định chứ không do cách lặp.
- **Xoá phần tử giữa không làm dịch các phần tử sau** (Đúng): Với chỉ số, xoá phần tử ở giữa khiến các tài nguyên phía sau bị tạo lại vì địa chỉ trong trạng thái đổi.
- **Vòng lặp theo chỉ số không dùng được với module** (Sai): Cả hai đều dùng được cho tài nguyên và mô đun.
- **Vòng lặp theo khoá chạy nhanh hơn khi áp dụng** (Sai): Tốc độ tương đương, khác biệt nằm ở tính ổn định của địa chỉ.

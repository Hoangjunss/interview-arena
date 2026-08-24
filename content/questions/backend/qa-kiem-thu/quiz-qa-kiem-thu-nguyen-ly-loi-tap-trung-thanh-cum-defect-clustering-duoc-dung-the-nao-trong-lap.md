---
id: quiz-qa-kiem-thu-nguyen-ly-loi-tap-trung-thanh-cum-defect-clustering-duoc-dung-the-nao-trong-lap
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguyên lý "lỗi tập trung thành cụm" (defect clustering) được dùng thế nào trong lập kế hoạch test?

## Đáp án trắc nghiệm
- [ ] Chỉ kiểm thử module mới viết trong Sprint hiện tại
- [ ] Chia đều số test case cho tất cả module
- [ ] Bỏ qua module đã có nhiều lỗi vì chúng đã được sửa
- [x] Dồn công sức vào module có lịch sử nhiều lỗi nhất

## Giải thích (VI)
Một phần nhỏ module thường chứa phần lớn lỗi, nên dồn công sức kiểm thử vào đó : nơi phức tạp nhất, thay đổi nhiều nhất, và có lịch sử lỗi dày nhất. Đây là cơ sở dữ liệu để phân bổ, không phải cảm tính.

### Giải thích các phương án:
- **Chỉ kiểm thử module mới viết trong Sprint hiện tại** (Sai): Module cũ vẫn có thể hỏng do thay đổi liên quan.
- **Chia đều số test case cho tất cả module** (Sai): Chia đều bỏ qua chính thông tin mà nguyên lý này cung cấp.
- **Bỏ qua module đã có nhiều lỗi vì chúng đã được sửa** (Sai): Ngược lại, module nhiều lỗi thường tiếp tục sinh thêm lỗi.
- **Dồn công sức vào module có lịch sử nhiều lỗi nhất** (Đúng): Một số ít module thường chứa phần lớn lỗi, nên tập trung ở đó có hiệu suất cao nhất.

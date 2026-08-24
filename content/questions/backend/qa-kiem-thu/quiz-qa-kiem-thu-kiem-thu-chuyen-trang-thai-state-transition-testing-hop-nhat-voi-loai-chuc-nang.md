---
id: quiz-qa-kiem-thu-kiem-thu-chuyen-trang-thai-state-transition-testing-hop-nhat-voi-loai-chuc-nang
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm thử chuyển trạng thái (state transition testing) hợp nhất với loại chức năng nào?

## Đáp án trắc nghiệm
- [ ] Chức năng chỉ hiển thị dữ liệu, không có thao tác
- [x] Chức năng có vòng đời trạng thái rõ ràng
- [ ] Chức năng tính toán theo nhiều điều kiện song song
- [ ] Chức năng có nhiều ô nhập liệu dạng số

## Giải thích (VI)
Chức năng có vòng đời trạng thái : đơn hàng, tài khoản, hồ sơ duyệt, phiên đăng nhập. Kỹ thuật này kiểm cả chuyển đổi hợp lệ lẫn chuyển đổi không được phép xảy ra .

### Giải thích các phương án:
- **Chức năng chỉ hiển thị dữ liệu, không có thao tác** (Sai): Không có chuyển trạng thái thì kỹ thuật này không áp dụng được.
- **Chức năng có vòng đời trạng thái rõ ràng** (Đúng): Ví dụ đơn hàng chuyển từ nháp sang chờ thanh toán rồi giao hàng.
- **Chức năng tính toán theo nhiều điều kiện song song** (Sai): Tổ hợp điều kiện phù hợp với bảng quyết định.
- **Chức năng có nhiều ô nhập liệu dạng số** (Sai): Trường hợp này dùng phân vùng tương đương và giá trị biên.

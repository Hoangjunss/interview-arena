---
id: quiz-design-patterns-can-them-cache-va-kiem-quyen-truoc-khi-goi-mot-service-nang-khong-sua-service-do
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần thêm cache và kiểm quyền trước khi gọi một service nặng, không sửa service đó. Pattern nào?

## Đáp án trắc nghiệm
- [x] Proxy: cùng interface, kiểm soát việc gọi tới thật
- [ ] Facade để đơn giản hoá cách gọi service đó
- [ ] Observer để theo dõi tất cả các lời gọi tới service đó
- [ ] Adapter để chuyển đổi interface của service

## Giải thích (VI)
Proxy : một đối tượng cài cùng interface, xử lý phần phụ (cache, kiểm quyền, đo thời gian, tải chậm) rồi mới chuyển lời gọi tới đối tượng thật. Nơi gọi không biết có proxy ở giữa.

### Giải thích các phương án:
- **Proxy: cùng interface, kiểm soát việc gọi tới thật** (Đúng): Nơi gọi không biết mình đang nói với proxy nên không phải sửa gì.
- **Facade để đơn giản hoá cách gọi service đó** (Sai): Facade đơn giản hoá interface, không kiểm soát truy cập.
- **Observer để theo dõi tất cả các lời gọi tới service đó** (Sai): Observer thông báo sự kiện, không can thiệp lời gọi.
- **Adapter để chuyển đổi interface của service** (Sai): Interface ở đây không cần chuyển đổi.

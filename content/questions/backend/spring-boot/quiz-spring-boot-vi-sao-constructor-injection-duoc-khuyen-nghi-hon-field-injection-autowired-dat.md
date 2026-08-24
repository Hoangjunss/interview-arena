---
id: quiz-spring-boot-vi-sao-constructor-injection-duoc-khuyen-nghi-hon-field-injection-autowired-dat
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao constructor injection được khuyến nghị hơn field injection (@Autowired đặt thẳng lên field)?

## Đáp án trắc nghiệm
- [ ] Field injection đã bị loại bỏ từ Spring Boot 3 nên không còn dùng được
- [ ] Constructor injection nhanh hơn lúc chạy vì Spring không phải dùng reflection
- [ ] Chỉ constructor injection mới inject được bean scope prototype
- [x] Khai được final, test không cần Spring, lộ phụ thuộc vòng lúc khởi động

## Giải thích (VI)
Ba lý do: dependency để final được nên bất biến và object luôn hợp lệ ngay sau khi tạo; unit test new thẳng service với mock, không cần dựng Spring context; và phụ thuộc vòng lộ ra ngay lúc khởi động thay vì bị field injection che đi.

### Giải thích các phương án:
- **Field injection đã bị loại bỏ từ Spring Boot 3 nên không còn dùng được** (Sai): Vẫn dùng được, chỉ là không được khuyến nghị.
- **Constructor injection nhanh hơn lúc chạy vì Spring không phải dùng reflection** (Sai): Chênh lệch chỉ ở lúc khởi tạo bean và không đáng kể; đây không phải lý do được nêu.
- **Chỉ constructor injection mới inject được bean scope prototype** (Sai): Cả hai cách đều inject được bean ở mọi scope.
- **Khai được final, test không cần Spring, lộ phụ thuộc vòng lúc khởi động** (Đúng): Đây đúng ba lý do chính mà tài liệu Spring nêu: dependency bất biến nên object luôn hợp lệ sau khi tạo, test thuần Java new được service, và phụ thuộc vòng bị phát hiện ngay thay vì ẩn đi.

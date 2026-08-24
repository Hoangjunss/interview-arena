---
id: quiz-spring-boot-trong-bean-duoi-day-tai-thoi-diem-nao-init-chay-so-voi-constructor-va-viec-injec
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong bean dưới đây, tại thời điểm nào init() chạy so với constructor và việc inject dependency?

## Đáp án trắc nghiệm
- [ ] Chỉ chạy khi có request đầu tiên tới ứng dụng
- [x] Sau constructor và sau khi mọi dependency đã inject xong
- [ ] Chạy song song với constructor trên một thread khác
- [ ] Trước constructor, để chuẩn bị dữ liệu cho constructor dùng

## Giải thích (VI)
Thứ tự: constructor → inject các dependency còn lại → @PostConstruct → bean sẵn sàng dùng. Vì vậy @PostConstruct là chỗ đúng cho việc khởi tạo cần tới dependency. @PreDestroy chạy đối xứng lúc context đóng, hợp cho việc dọn tài nguyên.

### Giải thích các phương án:
- **Chỉ chạy khi có request đầu tiên tới ứng dụng** (Sai): Đó là lazy initialization, không phải hành vi của @PostConstruct.
- **Sau constructor và sau khi mọi dependency đã inject xong** (Đúng): Đây đúng vị trí của @PostConstruct trong vòng đời khởi tạo bean — trước khi bean được đưa ra cho phần còn lại của ứng dụng dùng, nên repo chắc chắn đã sẵn sàng.
- **Chạy song song với constructor trên một thread khác** (Sai): Vòng đời khởi tạo bean là tuần tự trên cùng một thread.
- **Trước constructor, để chuẩn bị dữ liệu cho constructor dùng** (Sai): Không thể chạy method của một object chưa được tạo.

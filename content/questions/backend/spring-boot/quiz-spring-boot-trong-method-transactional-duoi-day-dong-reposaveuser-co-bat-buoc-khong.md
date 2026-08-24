---
id: quiz-spring-boot-trong-method-transactional-duoi-day-dong-reposaveuser-co-bat-buoc-khong
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong method @Transactional dưới đây, dòng repo.save(user) có bắt buộc không?

## Đáp án trắc nghiệm
- [ ] Bắt buộc — không gọi save thì thay đổi chỉ nằm trong bộ nhớ và bị mất
- [x] Không bắt buộc — entity managed tự được dirty checking khi commit
- [ ] Bắt buộc, vì findById luôn trả về bản sao detached
- [ ] Không được gọi save — nó sẽ tạo thêm một bản ghi mới trùng dữ liệu

## Giải thích (VI)
Không bắt buộc. Trong transaction, entity từ findById là managed — persistence context so sánh trạng thái lúc commit và tự phát UPDATE cho phần thay đổi. Gọi save chỉ thừa. Ngoài transaction thì entity là detached, lúc đó save mới thực sự cần.

### Giải thích các phương án:
- **Bắt buộc — không gọi save thì thay đổi chỉ nằm trong bộ nhớ và bị mất** (Sai): Đúng với entity detached, nhưng ở đây entity đang managed.
- **Không bắt buộc — entity managed tự được dirty checking khi commit** (Đúng): Dirty checking là hành vi mặc định của persistence context cho entity managed: JPA tự phát hiện thay đổi và flush UPDATE khi commit, gọi save chỉ thừa chứ không sai.
- **Bắt buộc, vì findById luôn trả về bản sao detached** (Sai): Trong transaction, findById trả về entity managed.
- **Không được gọi save — nó sẽ tạo thêm một bản ghi mới trùng dữ liệu** (Sai): Entity đã có id nên save thực hiện merge/update, không chèn thêm bản ghi.

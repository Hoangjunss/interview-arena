---
id: quiz-spring-boot-interface-repository-duoi-day-khong-co-class-implement-nao-vi-sao-goi-findbyemai
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interface repository dưới đây không có class implement nào. Vì sao gọi findByEmailAndActiveTrue("a@b.c") vẫn chạy được?

## Đáp án trắc nghiệm
- [ ] Nó gọi một stored procedure cùng tên trong database
- [ ] JpaRepository đã có sẵn method này trong interface cha
- [ ] Một annotation processor sinh file .java lúc build, xem được trong thư mục generated-sources
- [x] Spring Data phân tích tên method theo quy ước và sinh truy vấn lúc chạy

## Giải thích (VI)
Spring Data đọc tên method và sinh truy vấn tương ứng lúc chạy, rồi tạo một proxy làm implementation. findByEmailAndActiveTrue được phân tích thành where email = ?1 and active = true. Sai chính tả tên field sẽ làm ứng dụng lỗi ngay lúc khởi động, không phải lúc gọi.

### Giải thích các phương án:
- **Nó gọi một stored procedure cùng tên trong database** (Sai): Không có liên hệ nào tới stored procedure ở đây.
- **JpaRepository đã có sẵn method này trong interface cha** (Sai): JpaRepository chỉ có các method CRUD chung; method theo field cụ thể là do sinh ra.
- **Một annotation processor sinh file .java lúc build, xem được trong thư mục generated-sources** (Sai): Spring Data tạo proxy lúc chạy, không sinh mã nguồn lúc biên dịch.
- **Spring Data phân tích tên method theo quy ước và sinh truy vấn lúc chạy** (Đúng): Đây chính là cơ chế derived query — tên method là đặc tả của truy vấn, sinh ra where email = ?1 and active = true.

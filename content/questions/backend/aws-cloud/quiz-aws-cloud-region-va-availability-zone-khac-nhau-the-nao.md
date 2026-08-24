---
id: quiz-aws-cloud-region-va-availability-zone-khac-nhau-the-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Region và Availability Zone khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] AZ là vùng địa lý, gồm nhiều Region bên trong
- [x] Region là vùng địa lý, gồm nhiều AZ tách biệt nhau
- [ ] Region dành cho dịch vụ lưu trữ, AZ dành cho compute
- [ ] Hai tên gọi khác nhau của cùng một khái niệm

## Giải thích (VI)
Region là một vùng địa lý (ví dụ Singapore, Tokyo). Bên trong mỗi Region có nhiều Availability Zone — mỗi AZ là một hoặc nhiều trung tâm dữ liệu tách biệt về nguồn điện, làm mát và mạng, nối với nhau bằng đường truyền độ trễ thấp.

### Giải thích các phương án:
- **AZ là vùng địa lý, gồm nhiều Region bên trong** (Sai): Đảo ngược quan hệ bao hàm giữa hai khái niệm.
- **Region là vùng địa lý, gồm nhiều AZ tách biệt nhau** (Đúng): Mỗi AZ là một hoặc nhiều trung tâm dữ liệu có nguồn điện và mạng riêng.
- **Region dành cho dịch vụ lưu trữ, AZ dành cho compute** (Sai): Cả hai đều là khái niệm hạ tầng, không chia theo loại dịch vụ.
- **Hai tên gọi khác nhau của cùng một khái niệm** (Sai): Chúng ở hai cấp khác nhau và ảnh hưởng khác nhau tới thiết kế.

---
id: quiz-aws-cloud-fargate-khac-ec2-launch-type-cua-ecs-o-diem-nao
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fargate khác EC2 launch type của ECS ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Luôn rẻ hơn EC2 ở mọi mức tải
- [x] Không phải quản lý máy chủ bên dưới
- [ ] Chạy được nhiều container hơn trên mỗi máy
- [ ] Chỉ hỗ trợ container Linux, không hỗ trợ Windows

## Giải thích (VI)
Với Fargate , bạn không quản lý máy chủ bên dưới — chỉ khai báo CPU và bộ nhớ cho từng task. Với EC2 launch type , bạn tự quản cụm máy: vá lỗi, co giãn, tối ưu mật độ container, và tự chịu phần năng lực dư.

### Giải thích các phương án:
- **Luôn rẻ hơn EC2 ở mọi mức tải** (Sai): Với tải cao và ổn định thì EC2 thường rẻ hơn.
- **Không phải quản lý máy chủ bên dưới** (Đúng): Chỉ khai báo CPU và bộ nhớ cho container, hạ tầng do AWS lo.
- **Chạy được nhiều container hơn trên mỗi máy** (Sai): Mật độ container không phải điểm khác biệt.
- **Chỉ hỗ trợ container Linux, không hỗ trợ Windows** (Sai): Không phải tiêu chí phân biệt giữa hai kiểu chạy.

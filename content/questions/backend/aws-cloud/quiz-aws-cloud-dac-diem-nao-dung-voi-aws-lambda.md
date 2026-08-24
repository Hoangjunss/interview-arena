---
id: quiz-aws-cloud-dac-diem-nao-dung-voi-aws-lambda
position: backend
technology: aws-cloud
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặc điểm nào đúng với AWS Lambda?

## Đáp án trắc nghiệm
- [x] Chạy theo sự kiện, tính tiền theo lần gọi
- [ ] Chỉ chạy được mã viết bằng Node.js
- [ ] Không có giới hạn thời gian chạy cho mỗi lần gọi
- [ ] Chạy liên tục 24/7 và tính tiền theo giờ máy chủ

## Giải thích (VI)
Chạy theo sự kiện , tự co giãn, và tính tiền theo số lần gọi cộng thời gian thực thi — không có sự kiện thì không tốn tiền compute. Đổi lại có giới hạn thời gian mỗi lần chạy (tối đa 15 phút) và hiện tượng khởi động nguội.

### Giải thích các phương án:
- **Chạy theo sự kiện, tính tiền theo lần gọi** (Đúng): Không có sự kiện thì không tốn tiền compute.
- **Chỉ chạy được mã viết bằng Node.js** (Sai): Hỗ trợ nhiều runtime và cả container image.
- **Không có giới hạn thời gian chạy cho mỗi lần gọi** (Sai): Có giới hạn thời gian tối đa cho mỗi lần thực thi.
- **Chạy liên tục 24/7 và tính tiền theo giờ máy chủ** (Sai): Đó là mô hình của máy ảo.

---
id: co-thoi-gian-han-che-thi-nen-test-logic-nghiep-vu-hay-test-ui-truoc-test-cai-gi
position: backend
technology: chọn-phạm-vi-test
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có thời gian hạn chế thì nên test logic nghiệp vụ hay test UI trước? Test cái gì là lãng phí?

## Question (EN)
With limited time, should you test business logic or UI first? What is a waste to test?

## Đáp án chi tiết (VI)
Ưu tiên **logic nghiệp vụ** trước, UI sau.\
\
Lý do: logic nghiệp vụ (tính tiền, áp mã giảm giá, kiểm tra quyền, chuyển trạng thái đơn) là chỗ sai thì hậu quả không thể hoàn tác được, lại thường là hàm thuần — viết test nhanh, chạy mili giây, gần như không bao giờ flaky. UI thì thay đổi liên tục về markup và class, test viết theo cấu trúc DOM sẽ hỏng mỗi lần đổi layout dù chức năng vẫn đúng.\
\
**Đáng test:**\
- Hàm có nhiều nhánh điều kiện, nhiều case biên (ngày tháng, tiền tệ, làm tròn, chiết khấu).\
- Luồng người dùng quan trọng, test ở mức tương tác thật: điền form → submit → thấy kết quả.\
- Chỗ đã từng sinh bug.\
\
**Lãng phí:**\
- Test getter/setter, DTO, hằng số, wrapper không có logic.\
- Test kiểm tra \\"component render ra đúng class X\\" hoặc so sánh snapshot cả cây DOM lớn — đổi CSS là đỏ, không phát hiện lỗi thật.\
- Test chỉ khẳng định lại chính code implementation (mock hết rồi assert mock được gọi).\
\
Câu hỏi lọc nhanh: **\\"nếu dòng code này sai, người dùng có mất gì không?\\"** Không mất gì thì không cần test.

## Detailed Answer (EN)
$7a

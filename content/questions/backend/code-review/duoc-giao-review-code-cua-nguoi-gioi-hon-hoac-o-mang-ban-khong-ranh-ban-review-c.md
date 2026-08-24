---
id: duoc-giao-review-code-cua-nguoi-gioi-hon-hoac-o-mang-ban-khong-ranh-ban-review-c
position: backend
technology: code-review
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Được giao review code của người giỏi hơn hoặc ở mảng bạn không rành, bạn review cái gì?

## Question (EN)
You are asked to review code from someone more senior, or in an area you barely know. What do you actually review?

## Đáp án chi tiết (VI)
Bạn vẫn có thứ để đóng góp, chỉ cần đổi trọng tâm sang những điểm **không cần chuyên môn sâu hơn tác giả**:\
\
- **Tính dễ hiểu**: nếu bạn đọc mà không hiểu, đó là một tín hiệu thật — người sửa nó sáu tháng nữa cũng sẽ không hiểu. Đề nghị đặt lại tên, tách hàm, hoặc thêm một dòng giải thích lý do.\
- **Phần bạn thật sự nắm**: xử lý lỗi, log, cấu hình, biến môi trường, migration có chạy ngược được không, ảnh hưởng tới module bạn đang giữ.\
- **Trường hợp biên**: rỗng, trùng, timeout, gọi lại hai lần, dữ liệu cũ đã tồn tại trước khi có thay đổi này.\
- **Kiểm chứng**: có test cho hành vi mới không, mô tả PR có nói rõ vì sao thay đổi không.\
\
Cách viết nhận xét khi chưa chắc: đặt câu hỏi thay vì khẳng định — \\"chỗ này nếu request bị lặp thì có tạo hai bản ghi không?\\". Nếu tác giả có lý do, bạn học được; nếu là thiếu sót thật, bạn vừa chặn được một lỗi.\
\
Điều cần tránh: approve chiếu lệ vì ngại. Trong review, câu \\"mình chưa đủ nắm phần thuật toán này, nhờ thêm một người nữa xem\\" là phản hồi hợp lệ và trung thực.

## Detailed Answer (EN)
$7a

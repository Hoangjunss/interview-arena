---
id: kiem-tra-schema-trong-ci-nen-chan-nhung-thay-doi-nao
position: backend
technology: vận-hành
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm tra schema trong CI nên chặn những thay đổi nào?

## Question (EN)
What changes should schema checks in CI block?

## Đáp án chi tiết (VI)
Chặn các breaking change: **gỡ field đang được dùng**; **thêm tham số bắt buộc** cho field có sẵn; và **đổi kiểu trả về**. Thêm field mới cho phép null thì an toàn vì client cũ không truy vấn tới nó.\
\
Điều làm việc kiểm tra này thật sự hữu ích là kết hợp với **số liệu sử dụng**: một field không ai truy vấn trong ba mươi ngày thì gỡ được an toàn, còn field vẫn có lưu lượng thì phải giữ. Không có số liệu này, mọi thay đổi đều bị coi là nguy hiểm và schema chỉ phình lên.\
\
Với ứng dụng di động, client cũ có thể sống nhiều năm, nên ngưỡng thời gian cho việc gỡ field nên khác giữa web và di động.\
\
Thực hành bổ sung: yêu cầu mọi truy vấn có tên và đăng ký được, để biết truy vấn nào thuộc phiên bản client nào.

## Detailed Answer (EN)
Block breaking changes: **removing a field in use**; **adding a required argument** to an existing field; and **changing a return type**. Adding a new nullable field is safe because old clients do not query it.\
\
What makes these checks genuinely useful is pairing them with **usage data**: a field nobody queried in thirty days can be removed safely, while one with traffic must stay. Without it every change looks dangerous and the schema only grows.\
\
For mobile, old clients can live for years, so removal thresholds should differ between web and mobile.\
\
An additional practice: require named, registerable operations so you know which query belongs to which client version.

---
id: upload-file-qua-graphql-nen-lam-the-nao
position: backend
technology: thực-hành
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Upload file qua GraphQL nên làm thế nào?

## Question (EN)
How should file uploads work with GraphQL?

## Đáp án chi tiết (VI)
Cách bền nhất là **xin địa chỉ ký sẵn** qua một mutation, tải tệp thẳng lên kho lưu trữ, rồi gọi mutation thứ hai để gắn tệp vào record. Tệp không đi qua server API nên tránh được giới hạn kích thước và tải nặng.\
\
Đặc tả GraphQL không định nghĩa việc truyền tệp nhị phân, nên mọi cách gửi tệp trực tiếp đều là phần mở rộng — đó là lý do các đội lớn thường tách hẳn việc tải tệp ra khỏi tầng GraphQL.\
\
Các chi tiết cần xử lý cho luồng ký sẵn: đặt thời hạn ngắn cho địa chỉ; giới hạn kiểu nội dung và kích thước ngay trong chính sách; và dọn các tệp mồ côi khi người dùng bỏ dở.\
\
Với di động, nên thu nhỏ ảnh ở phía thiết bị trước khi tải lên và hiển thị tiến độ thật.

## Detailed Answer (EN)
The most robust approach: request a **pre-signed URL** through a mutation, upload directly to storage, then call a second mutation to attach the file to a record. The file never passes through the API server, avoiding size limits and heavy load.\
\
The GraphQL specification does not define binary transfer, so every direct upload approach is an extension — which is why larger teams keep uploads out of the GraphQL layer.\
\
Details for the signed URL flow: a short expiry; content type and size limits in the policy itself; and cleanup of orphaned files when users abandon uploads.\
\
On mobile, downscale images on device before uploading and show real progress.

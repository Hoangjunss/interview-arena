---
id: vi-sao-api-graphql-cong-khai-can-gioi-han-depth-va-chi-phi-truy-van
position: backend
technology: bảo-mật
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao API GraphQL công khai cần giới hạn Depth và chi phí truy vấn?

## Question (EN)
Why does a public GraphQL API need depth and cost limits?

## Đáp án chi tiết (VI)
Vì client tự quyết định shape truy vấn, một truy vấn lồng sâu qua quan hệ hai chiều có thể **tăng khối lượng theo cấp số nhân** và làm quá tải server chỉ với một yêu cầu.\
\
Ví dụ kinh điển: bài viết có tác giả, tác giả có danh sách bài viết, mỗi bài lại có tác giả. Lồng mười tầng là một truy vấn ngắn nhưng có thể tạo hàng triệu lượt giải quyết field.\
\
Các biện pháp nên áp dụng cùng nhau: giới hạn Depth; tính điểm chi phí theo số field và số record ước lượng rồi chặn khi vượt ngưỡng; bắt buộc tham số giới hạn cho mọi field danh sách; rate limit theo điểm đã dùng; và đặt thời gian chờ thực thi.\
\
Với API chỉ phục vụ client của mình, **allowlist** là biện pháp mạnh và đơn giản hơn: server chỉ chấp nhận truy vấn đã đăng ký lúc build.

## Detailed Answer (EN)
Because clients choose the query shape, a deeply nested query through bidirectional relations can **grow exponentially** and overload the server with a single request.\
\
The classic example: a post has an author, an author has posts, each post has an author. Ten levels is a short query that can trigger millions of field resolutions.\
\
Measures to apply together: a depth limit; cost scoring by field count and estimated record counts with rejection above a threshold; mandatory pagination arguments on every list field; rate limiting by consumed cost; and an execution timeout.\
\
For APIs serving only your own clients, an **allowlist of queries** is a stronger and simpler measure: the server accepts only documents registered at build time.

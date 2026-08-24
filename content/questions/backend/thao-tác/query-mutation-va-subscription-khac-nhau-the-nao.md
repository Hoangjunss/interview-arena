---
id: query-mutation-va-subscription-khac-nhau-the-nao
position: backend
technology: thao-tác
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query, Mutation và Subscription khác nhau thế nào?

## Question (EN)
How do queries, mutations and subscriptions differ?

## Đáp án chi tiết (VI)
**Query** là đọc, **Mutation** là ghi, **Subscription** là luồng dữ liệu server đẩy về. Về mặt thực thi có một khác biệt quan trọng: các top-level field của mutation chạy **tuần tự** để thứ tự thay đổi dữ liệu là xác định, còn các field của query chạy song song được vì chỉ đọc.\
\
Một chi tiết hay bị hiểu nhầm: chỉ top-level field của mutation mới tuần tự. Các field bên trong phần trả về vẫn được giải quyết như query bình thường, nên đừng dựa vào thứ tự của chúng cho logic nghiệp vụ.\
\
Quy ước nên theo khi thiết kế: mutation trả về đủ dữ liệu để client cập nhật giao diện mà không phải gọi lại. Trả về mỗi giá trị đúng sai buộc client tốn thêm một round trip.

## Detailed Answer (EN)
**Query** reads, **mutation** writes, **subscription** is a server-pushed stream. One execution difference matters: top-level mutation fields run **serially** so the order of data changes is deterministic, while query fields can resolve in parallel because they only read.\
\
A commonly misunderstood detail: only top-level mutation fields are serial. Fields inside the returned payload resolve like any query, so never rely on their order for business logic.\
\
A design convention worth following: mutations should return enough data for the client to update its UI without a follow-up call. Returning only a boolean costs the client another round trip.

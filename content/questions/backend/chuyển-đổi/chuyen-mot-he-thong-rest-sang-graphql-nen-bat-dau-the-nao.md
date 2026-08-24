---
id: chuyen-mot-he-thong-rest-sang-graphql-nen-bat-dau-the-nao
position: backend
technology: chuyển-đổi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chuyển một hệ thống REST sang GraphQL nên bắt đầu thế nào?

## Question (EN)
How should a REST system start migrating to GraphQL?

## Đáp án chi tiết (VI)
Bắt đầu bằng một **lớp GraphQL gọi lại các API REST hiện có** cho một vài màn hình. Cách này kiểm chứng được contract mới với chi phí thấp, và hai hệ tồn tại song song cho tới khi client cũ ngừng dùng REST.\
\
Điểm cần chú ý: lớp GraphQL gọi REST rất dễ tạo ra vấn đề N+1 vì mỗi field lồng lại là một lời gọi HTTP. DataLoader vẫn dùng được nếu API REST có endpoint nhận nhiều id cùng lúc.\
\
Thứ tự hợp lý: chọn một hoặc hai màn hình đang phải gọi nhiều endpoint vì đó là chỗ lợi ích rõ nhất; đo lại số round trip và thời gian hiển thị để có bằng chứng; rồi mới mở rộng.\
\
Một quyết định cần chốt sớm: schema mô tả theo **ngôn ngữ nghiệp vụ** hay sao chép shape API cũ. Sao chép thì nhanh nhưng mang theo mọi khiếm khuyết của thiết kế cũ và rất khó sửa khi client đã phụ thuộc.

## Detailed Answer (EN)
Start with a **GraphQL layer calling the existing REST APIs** for a few screens. That validates the new contract cheaply while both systems coexist until old clients stop using REST.\
\
A caution: a GraphQL layer over REST easily creates N plus one, since every nested field becomes an HTTP call. Batch loaders still help if the REST API offers endpoints accepting multiple identifiers.\
\
A sensible order: pick one or two screens currently calling many endpoints since the benefit is clearest there; measure round trips and render time for evidence; then expand.\
\
A decision to settle early: whether the schema speaks the **business language** or mirrors old REST shapes. Mirroring is faster but carries every flaw forward and becomes hard to fix once clients depend on it.

---
id: thiet-ke-news-feed-bang-tin-o-muc-cao-fan-out-la-gi
position: system-design
technology: case-study
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế news feed (bảng tin) ở mức cao? Fan-out là gì?

## Question (EN)
How would you design a news feed at a high level, and what is fan-out?

## Đáp án chi tiết (VI)
Yêu cầu: user thấy feed các bài đăng từ người họ theo dõi, mới nhất/liên quan trước, đọc **rất nhiều** và cần nhanh.\
\
Câu hỏi trung tâm: dựng feed lúc **đọc** hay lúc **ghi**?\
- **Fan-out on write (push)**: khi A đăng bài, **đẩy ngay** vào feed cache của **tất cả follower** (một list/timeline dựng sẵn trong Redis). Đọc feed rất nhanh (chỉ lấy list sẵn). Nhược: người có **hàng triệu follower** (\\"celebrity problem\\") gây bùng nổ ghi.\
- **Fan-out on read (pull)**: khi user mở feed mới **truy vấn + trộn** bài của những người họ follow. Ghi rẻ, nhưng đọc nặng và chậm.\
- **Hybrid**: push cho user thường, **pull cho tài khoản đông follower** → cân bằng.\
\
Thành phần: post service + DB, **feed cache** (Redis) cho timeline, ranking service, CDN cho media. Bổ sung: phân trang bằng cursor, dedupe, giới hạn độ dài feed, cập nhật gần thời gian thực qua queue.

## Detailed Answer (EN)
Requirements: a user sees a feed of posts from those they follow, newest/most-relevant first, **read-heavy** and fast.\
\
Central question: build the feed at **read** time or **write** time?\
- **Fan-out on write (push)**: when A posts, **immediately push** it into the feed cache of **all followers** (a prebuilt timeline list in Redis). Reading is very fast (just fetch the ready list). Downside: users with **millions of followers** (the \\"celebrity problem\\") cause a write explosion.\
- **Fan-out on read (pull)**: when a user opens the feed, **query + merge** posts from those they follow. Cheap writes, but heavy, slow reads.\
- **Hybrid**: push for normal users, **pull for high-follower accounts** → balanced.\
\
Components: a post service + DB, a **feed cache** (Redis) for timelines, a ranking service, a CDN for media. Extras: cursor pagination, dedupe, feed length caps, near-real-time updates via a queue.

---
id: lucene-segment-co-dac-diem-gi-va-anh-huong-the-nao-toi-van-hanh
position: backend
technology: internals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lucene segment có đặc điểm gì và ảnh hưởng thế nào tới vận hành?

## Question (EN)
What characterises Lucene segments and how do they affect operations?

## Đáp án chi tiết (VI)
Segment **immutable** — ghi xong không sửa được. Mỗi refresh tạo segment mới, và Lucene chạy merge nền để gộp segment nhỏ lại.\
\
Ba hệ quả vận hành:\
\
1. **Update = delete + reindex cả document.** Không có update tại chỗ. Document cũ chỉ bị đánh dấu deleted, dung lượng chỉ được trả lại sau khi merge. Index update nhiều sẽ phình hơn dữ liệu thật khá nhiều.\
2. **Nhiều segment nhỏ làm search chậm**, vì mỗi query phải quét qua mọi segment. Đây là lý do `refresh=true` sau mỗi lần ghi rất hại.\
3. **Merge tốn I/O và CPU**, và nó chạy đúng lúc đang ghi nhiều nhất.\
\
```bash\
GET /products/_segments        # xem so segment, so doc deleted\
POST /products/_forcemerge?max_num_segments=1   # CHI cho index read-only\
```\
\
`_forcemerge` trên index đang ghi là sai lầm tốn kém: nó tạo ra segment khổng lồ mà merge nền sau đó không đụng tới được, và giữ document deleted rất lâu.

## Detailed Answer (EN)
Segments are **immutable** — once written they cannot change. Every refresh creates a new segment, and Lucene merges small ones in the background.\
\
Three operational consequences:\
\
1. **An update is a delete plus a full reindex of the document.** There is no in-place update. The old copy is only flagged deleted, and space returns only after a merge. Update-heavy indices grow noticeably larger than the real data.\
2. **Many small segments slow searches**, because every query visits every segment. This is why `refresh=true` per write is so damaging.\
3. **Merging costs I/O and CPU**, and it runs exactly when write load is highest.\
\
```bash\
GET /products/_segments        # segment count and deleted docs\
POST /products/_forcemerge?max_num_segments=1   # read-only indices ONLY\
```\
\
Running `_forcemerge` on a write-active index is an expensive mistake: it produces a huge segment that background merging will not touch again, keeping deleted documents around for a long time.

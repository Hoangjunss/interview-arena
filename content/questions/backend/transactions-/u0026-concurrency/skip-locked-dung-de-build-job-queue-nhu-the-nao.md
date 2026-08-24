---
id: skip-locked-dung-de-build-job-queue-nhu-the-nao
position: backend
technology: transactions-\u0026-concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`SKIP LOCKED` dùng để build job queue như thế nào?

## Question (EN)
How is `SKIP LOCKED` used to build a job queue?

## Đáp án chi tiết (VI)
`FOR UPDATE SKIP LOCKED` cho nhiều worker cùng lấy việc mà không tranh cùng một job: mỗi worker khóa một job, các worker khác *bỏ qua* job đang bị khóa và lấy job kế tiếp. Đây là cách dựng hàng đợi job nhẹ ngay trong PostgreSQL mà không cần message broker riêng.\
```sql\
WITH next_job AS (\
  SELECT id FROM jobs\
  WHERE status = 'pending'\
  ORDER BY created_at\
  FOR UPDATE SKIP LOCKED\
  LIMIT 1\
)\
UPDATE jobs SET status = 'running'\
WHERE id IN (SELECT id FROM next_job)\
RETURNING *;\
```\
Nếu hàng đợi lớn, bổ sung thêm: retry, visibility timeout (job treo thì trả lại), trạng thái dead-letter và index hợp lý cho cột lọc/sắp xếp.

## Detailed Answer (EN)
`FOR UPDATE SKIP LOCKED` lets many workers grab jobs without stepping on each other: each worker locks one job, while other workers *skip* the locked job and take the next one. It is a way to build a lightweight job queue inside PostgreSQL without a separate message broker.\
```sql\
WITH next_job AS (\
  SELECT id FROM jobs\
  WHERE status = 'pending'\
  ORDER BY created_at\
  FOR UPDATE SKIP LOCKED\
  LIMIT 1\
)\
UPDATE jobs SET status = 'running'\
WHERE id IN (SELECT id FROM next_job)\
RETURNING *;\
```\
For a large queue, add: retry, a visibility timeout (return stuck jobs), a dead-letter status and proper indexes on the filter/sort columns.

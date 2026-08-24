---
id: quiz-redis-can-bang-xep-hang-diem-cao-doc-top-10-va-cap-nhat-diem-lien-tuc-kieu-d-lieu-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần bảng xếp hạng điểm cao, đọc top 10 và cập nhật điểm liên tục. Kiểu dữ liệu nào phù hợp?

## Đáp án trắc nghiệm
- [x] Sorted set — phần tử được giữ theo điểm
- [ ] Hash — mỗi người chơi là một field
- [ ] String — lưu JSON của cả bảng xếp hạng
- [ ] List — đẩy điểm mới vào đầu danh sách rồi đọc ra 10 phần tử

## Giải thích (VI)
Sorted set. Mỗi phần tử có một điểm và Redis giữ chúng theo điểm, nên ZREVRANGE key 0 9 WITHSCORES cho top 10 ngay, ZINCRBY cộng điểm atomic, ZREVRANK cho biết hạng của một người.

### Giải thích các phương án:
- **Sorted set — phần tử được giữ theo điểm** (Đúng): Lấy top N là O(log n + N) và cập nhật điểm cũng là O(log n).
- **Hash — mỗi người chơi là một field** (Sai): Hash tra cứu theo field rất nhanh nhưng không có khái niệm thứ tự.
- **String — lưu JSON của cả bảng xếp hạng** (Sai): Mỗi lần đổi một điểm phải ghi lại toàn bộ chuỗi và dễ mất cập nhật.
- **List — đẩy điểm mới vào đầu danh sách rồi đọc ra 10 phần tử** (Sai): List không giữ thứ tự theo điểm nên phải đọc hết về rồi tự sắp xếp.

---
id: quiz-linux-os-load-average-80-tren-may-4-core-nghia-la-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Load average 8.0 trên máy 4 core nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Trung bình 8 tiến trình chờ hoặc đang chạy: máy quá tải
- [ ] Có 8 tiến trình đang chạy tại thời điểm đo
- [ ] Bộ nhớ đã dùng gấp 8 lần dung lượng vật lý có sẵn trên máy
- [ ] CPU đang sử dụng ở mức 800% công suất tối đa

## Giải thích (VI)
Trung bình có 8 tiến trình đang chạy hoặc chờ trong khoảng đo. So với 4 core thì máy đang gánh gấp đôi năng lực — mọi thứ chậm vì phải xếp hàng. Ba con số là trung bình 1, 5 và 15 phút.

### Giải thích các phương án:
- **Trung bình 8 tiến trình chờ hoặc đang chạy: máy quá tải** (Đúng): Ngưỡng để so là số core: 4.0 trên 4 core là dùng hết, 8.0 là gấp đôi năng lực.
- **Có 8 tiến trình đang chạy tại thời điểm đo** (Sai): Đây là số trung bình trong một khoảng thời gian, không phải số tức thời.
- **Bộ nhớ đã dùng gấp 8 lần dung lượng vật lý có sẵn trên máy** (Sai): Load average không liên quan tới bộ nhớ.
- **CPU đang sử dụng ở mức 800% công suất tối đa** (Sai): Load không phải phần trăm CPU và không có mức 800%.

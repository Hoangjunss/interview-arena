---
id: quiz-ml-data-science-bai-toan-phat-hien-gian-lan-co-998-giao-dich-hop-le-mo-hinh-luon-doan-hop-le-dat
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bài toán phát hiện gian lận có 99,8% giao dịch hợp lệ. Mô hình luôn đoán "hợp lệ" đạt độ chính xác bao nhiêu, và nói lên điều gì?

## Đáp án trắc nghiệm
- [ ] 0% — vì không phát hiện được gian lận nào
- [ ] 99,8% — và đây là mô hình tốt vì sai số rất thấp
- [ ] 50% — vì chỉ đoán đúng một trong hai lớp
- [x] 99,8% — accuracy vô nghĩa khi mất cân bằng

## Giải thích (VI)
99,8% — và đó chính là vấn đề: mô hình vô dụng vì bỏ sót toàn bộ gian lận, nhưng chỉ số vẫn đẹp. Với dữ liệu mất cân bằng phải đọc precision, recall và ma trận nhầm lẫn thay vì accuracy.

### Giải thích các phương án:
- **0% — vì không phát hiện được gian lận nào** (Sai): Vẫn đúng ở toàn bộ giao dịch hợp lệ.
- **99,8% — và đây là mô hình tốt vì sai số rất thấp** (Sai): Mô hình bỏ sót toàn bộ gian lận nên vô dụng với mục tiêu bài toán.
- **50% — vì chỉ đoán đúng một trong hai lớp** (Sai): Accuracy tính trên tỉ lệ mẫu, không phải trên số lớp.
- **99,8% — accuracy vô nghĩa khi mất cân bằng** (Đúng): Chỉ số cao mà không bắt được ca nào thuộc lớp cần quan tâm.

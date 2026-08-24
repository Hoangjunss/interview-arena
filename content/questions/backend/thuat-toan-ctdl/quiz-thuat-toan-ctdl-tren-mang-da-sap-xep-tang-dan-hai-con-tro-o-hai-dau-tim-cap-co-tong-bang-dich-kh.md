---
id: quiz-thuat-toan-ctdl-tren-mang-da-sap-xep-tang-dan-hai-con-tro-o-hai-dau-tim-cap-co-tong-bang-dich-kh
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trên mảng đã sắp xếp tăng dần , hai con trỏ ở hai đầu tìm cặp có tổng bằng đích. Khi tổng hiện tại nhỏ hơn đích thì làm gì?

## Đáp án trắc nghiệm
- [ ] Bắt đầu lại từ đầu với con trỏ phải mới
- [x] Dịch con trỏ trái sang phải một bước
- [ ] Dịch con trỏ phải sang trái một bước
- [ ] Dịch cả hai con trỏ vào giữa cùng lúc

## Giải thích (VI)
Dịch con trỏ trái sang phải. Vì mảng tăng dần, chỉ có tăng đầu trái mới làm tổng lớn lên. Ngược lại, tổng lớn hơn đích thì lùi con trỏ phải. Mỗi bước loại bỏ chắc chắn một khả năng, nên toàn bộ chạy trong O(n) với O(1) bộ nhớ.

### Giải thích các phương án:
- **Bắt đầu lại từ đầu với con trỏ phải mới** (Sai): Cách này quay về duyệt mọi cặp, tức O(n²).
- **Dịch con trỏ trái sang phải một bước** (Đúng): Chỉ cách này mới làm tổng tăng lên vì mảng tăng dần.
- **Dịch con trỏ phải sang trái một bước** (Sai): Việc đó làm tổng giảm thêm, đi xa đích hơn.
- **Dịch cả hai con trỏ vào giữa cùng lúc** (Sai): Có thể nhảy qua mất cặp đúng, không còn bảo đảm tính đầy đủ.

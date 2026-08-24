---
id: quiz-ml-data-science-rung-ngau-nhien-random-forest-khac-gradient-boosting-o-cach-xay-cay-the-nao
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rừng ngẫu nhiên (random forest) khác gradient boosting ở cách xây cây thế nào?

## Đáp án trắc nghiệm
- [x] Rừng dựng cây song song, boosting tuần tự
- [ ] Rừng chỉ dùng cho phân loại, boosting cho hồi quy
- [ ] Hai phương pháp giống nhau, chỉ khác tên gọi
- [ ] Rừng dựng cây tuần tự, boosting dựng song song

## Giải thích (VI)
Rừng ngẫu nhiên dựng nhiều cây độc lập, song song trên các mẫu và tập đặc trưng ngẫu nhiên rồi lấy trung bình — giảm variance. Gradient boosting dựng cây tuần tự , mỗi cây học phần sai còn lại của các cây trước — giảm bias.

### Giải thích các phương án:
- **Rừng dựng cây song song, boosting tuần tự** (Đúng): Boosting mỗi cây học phần dư của các cây trước.
- **Rừng chỉ dùng cho phân loại, boosting cho hồi quy** (Sai): Cả hai làm được cả hai loại bài toán.
- **Hai phương pháp giống nhau, chỉ khác tên gọi** (Sai): Cơ chế kết hợp cây khác hẳn nhau.
- **Rừng dựng cây tuần tự, boosting dựng song song** (Sai): Đảo ngược cách hoạt động của hai phương pháp.

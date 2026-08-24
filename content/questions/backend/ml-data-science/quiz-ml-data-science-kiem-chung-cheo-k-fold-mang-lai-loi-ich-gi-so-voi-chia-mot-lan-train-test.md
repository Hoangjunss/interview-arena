---
id: quiz-ml-data-science-kiem-chung-cheo-k-fold-mang-lai-loi-ich-gi-so-voi-chia-mot-lan-train-test
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm chứng chéo k-fold mang lại lợi ích gì so với chia một lần train-test?

## Đáp án trắc nghiệm
- [x] Ước lượng hiệu năng ổn định hơn
- [ ] Loại bỏ hoàn toàn hiện tượng quá khớp
- [ ] Huấn luyện nhanh hơn vì chia nhỏ dữ liệu
- [ ] Không cần tập test riêng nữa

## Giải thích (VI)
Ước lượng hiệu năng ổn định hơn : dữ liệu chia thành k phần, lần lượt mỗi phần làm tập kiểm còn lại để huấn luyện, rồi lấy trung bình. Nhờ vậy kết quả không phụ thuộc vào việc một lần chia ngẫu nhiên có may hay không.

### Giải thích các phương án:
- **Ước lượng hiệu năng ổn định hơn** (Đúng): Giảm phụ thuộc vào may rủi của một lần chia.
- **Loại bỏ hoàn toàn hiện tượng quá khớp** (Sai): Chỉ giúp đánh giá tốt hơn, không chống quá khớp.
- **Huấn luyện nhanh hơn vì chia nhỏ dữ liệu** (Sai): Chậm hơn vì phải huấn luyện k lần.
- **Không cần tập test riêng nữa** (Sai): Vẫn nên giữ một tập test độc lập cho lần đo cuối.

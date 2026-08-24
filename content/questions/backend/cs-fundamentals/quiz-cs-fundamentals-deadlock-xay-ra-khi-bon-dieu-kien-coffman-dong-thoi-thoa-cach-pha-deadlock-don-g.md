---
id: quiz-cs-fundamentals-deadlock-xay-ra-khi-bon-dieu-kien-coffman-dong-thoi-thoa-cach-pha-deadlock-don-g
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deadlock xảy ra khi bốn điều kiện Coffman đồng thời thoả. Cách phá deadlock đơn giản và phổ biến nhất trong ứng dụng là gì?

## Đáp án trắc nghiệm
- [x] Quy định thứ tự lấy lock toàn cục và mọi luồng đều lấy theo đúng thứ tự đó
- [ ] Dùng nhiều lock nhỏ thay cho một lock lớn để giảm tranh chấp
- [ ] Tăng timeout của lock để luồng chờ đủ lâu cho luồng kia xong
- [ ] Chuyển toàn bộ sang lock đệ quy (reentrant) để một luồng lấy lại được lock của chính nó

## Giải thích (VI)
Áp một thứ tự lấy lock toàn cục. Bốn điều kiện Coffman là loại trừ lẫn nhau, giữ và chờ, không tước đoạt, và chờ vòng tròn — chỉ cần phá một là hết deadlock. Điều kiện dễ phá nhất trong mã ứng dụng là chờ vòng tròn: nếu mọi luồng đều lấy lock theo cùng một thứ tự, chu trình chờ không thể hình thành.

### Giải thích các phương án:
- **Quy định thứ tự lấy lock toàn cục và mọi luồng đều lấy theo đúng thứ tự đó** (Đúng): Thứ tự nhất quán phá điều kiện chờ vòng tròn: không thể tồn tại chu trình chờ nếu mọi luồng đều lấy lock theo cùng một chiều tăng dần.
- **Dùng nhiều lock nhỏ thay cho một lock lớn để giảm tranh chấp** (Sai): Chia nhỏ lock cải thiện thông lượng nhưng làm tăng số lock mỗi luồng phải giữ đồng thời, tức làm deadlock dễ xảy ra hơn chứ không ít đi.
- **Tăng timeout của lock để luồng chờ đủ lâu cho luồng kia xong** (Sai): Deadlock là bế tắc vĩnh viễn, không phải chờ lâu; timeout chỉ biến treo vô hạn thành lỗi có thể phát hiện chứ không loại bỏ nguyên nhân.
- **Chuyển toàn bộ sang lock đệ quy (reentrant) để một luồng lấy lại được lock của chính nó** (Sai): Reentrant chỉ xử lý trường hợp một luồng tự khoá chính nó; nó không tác động gì tới chu trình chờ giữa nhiều luồng khác nhau.

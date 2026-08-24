---
id: quiz-react-native-flatlist-giat-khi-cuon-nhanh-prop-nao-giup-nhieu-nhat-khi-moi-dong-cao-bang-nhau
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FlatList giật khi cuộn nhanh. Prop nào giúp nhiều nhất khi mọi dòng cao bằng nhau?

## Đáp án trắc nghiệm
- [x] getItemLayout để bỏ bước đo từng dòng
- [ ] initialNumToRender đặt giá trị thật lớn
- [ ] scrollEventThrottle đặt về giá trị nhỏ nhất
- [ ] removeClippedSubviews bật cho mọi nền tảng

## Giải thích (VI)
getItemLayout cho danh sách biết trước chiều cao và vị trí từng dòng, nên bỏ được bước đo động khi cuộn và cho phép nhảy tới chỉ số bất kỳ ngay lập tức. Nó chỉ dùng được khi chiều cao dòng cố định hoặc tính được.

### Giải thích các phương án:
- **getItemLayout để bỏ bước đo từng dòng** (Đúng): Biết trước vị trí và chiều cao thì danh sách không phải đo động khi cuộn.
- **initialNumToRender đặt giá trị thật lớn** (Sai): Dựng nhiều dòng ngay từ đầu làm màn hình mở chậm hơn.
- **scrollEventThrottle đặt về giá trị nhỏ nhất** (Sai): Chỉ đổi tần suất bắn sự kiện cuộn, thậm chí còn tăng tải.
- **removeClippedSubviews bật cho mọi nền tảng** (Sai): Có ích trong vài trường hợp nhưng cũng gây lỗi hiển thị và không phải giải pháp chính.

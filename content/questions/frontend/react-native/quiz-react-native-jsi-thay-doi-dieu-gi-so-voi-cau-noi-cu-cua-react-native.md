---
id: quiz-react-native-jsi-thay-doi-dieu-gi-so-voi-cau-noi-cu-cua-react-native
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JSI thay đổi điều gì so với cầu nối cũ của React Native?

## Đáp án trắc nghiệm
- [x] JavaScript gọi thẳng hàm native, bỏ queue
- [ ] Mã JavaScript được biên dịch sang mã native lúc build
- [ ] Mọi lời gọi native chuyển sang chạy trên thread riêng
- [ ] Giao diện được vẽ bằng công nghệ đồ hoạ riêng

## Giải thích (VI)
Cầu nối cũ chuyển mọi lời gọi thành thông điệp JSON xếp hàng bất đồng bộ. JSI cho JavaScript giữ tham chiếu tới đối tượng native và gọi thẳng, nên bỏ được chi phí tuần tự hoá và cho phép lời gọi đồng bộ khi cần.

### Giải thích các phương án:
- **JavaScript gọi thẳng hàm native, bỏ queue** (Đúng): Bỏ được bước tuần tự hoá và hàng đợi bất đồng bộ nên gọi được đồng bộ với độ trễ thấp.
- **Mã JavaScript được biên dịch sang mã native lúc build** (Sai): JavaScript vẫn chạy trên bộ máy JavaScript.
- **Mọi lời gọi native chuyển sang chạy trên thread riêng** (Sai): Việc phân luồng không phải điểm thay đổi cốt lõi của JSI.
- **Giao diện được vẽ bằng công nghệ đồ hoạ riêng** (Sai): Giao diện vẫn dùng view native của từng nền tảng.

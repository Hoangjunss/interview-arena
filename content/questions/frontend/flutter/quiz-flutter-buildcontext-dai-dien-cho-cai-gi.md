---
id: quiz-flutter-buildcontext-dai-dien-cho-cai-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BuildContext đại diện cho cái gì?

## Đáp án trắc nghiệm
- [x] Vị trí của widget trong cây element
- [ ] Cache chứa dữ liệu của màn hình hiện tại
- [ ] Trạng thái hiện tại của widget và các widget con
- [ ] Đối tượng cấu hình toàn ứng dụng do MaterialApp tạo ra

## Giải thích (VI)
BuildContext là tay cầm trỏ tới vị trí của widget trong cây element . Từ vị trí đó Flutter tra ngược lên để tìm widget tổ tiên gần nhất, nên Theme.of(context) hay Navigator.of(context) mới hoạt động. Sai context là sai điểm bắt đầu tra cứu.

### Giải thích các phương án:
- **Vị trí của widget trong cây element** (Đúng): Nhờ vị trí đó mà widget tra ngược lên trên tìm được Theme, Navigator hay MediaQuery gần nhất.
- **Cache chứa dữ liệu của màn hình hiện tại** (Sai): BuildContext không lưu dữ liệu ứng dụng, nó chỉ là tay cầm trỏ vào một element.
- **Trạng thái hiện tại của widget và các widget con** (Sai): Trạng thái nằm trong đối tượng State, không nằm trong context.
- **Đối tượng cấu hình toàn ứng dụng do MaterialApp tạo ra** (Sai): Cấu hình toàn ứng dụng nằm ở MaterialApp, mỗi widget vẫn có context riêng.

---
id: quiz-flutter-futurebuilder-goi-lai-api-moi-lan-widget-cha-rebuild-cach-sua-dung
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
FutureBuilder gọi lại API mỗi lần widget cha rebuild. Cách sửa đúng?

## Đáp án trắc nghiệm
- [ ] Đặt initialData để FutureBuilder bỏ qua lần gọi sau
- [ ] Kiểm tra snapshot.connectionState rồi trả về sớm
- [x] Tạo Future một lần trong initState rồi truyền vào
- [ ] Bọc FutureBuilder trong widget const để chặn rebuild

## Giải thích (VI)
Nguyên nhân là tạo Future ngay trong build : mỗi lần rebuild sinh một Future mới nên FutureBuilder chạy lại từ đầu. Tạo một lần trong initState và lưu vào trường của State, hoặc để lớp quản lý state bên ngoài giữ kết quả.

### Giải thích các phương án:
- **Đặt initialData để FutureBuilder bỏ qua lần gọi sau** (Sai): initialData chỉ cho dữ liệu hiển thị lúc chờ, không ngăn việc gọi lại.
- **Kiểm tra snapshot.connectionState rồi trả về sớm** (Sai): Kiểm tra trạng thái chỉ đổi phần hiển thị, lời gọi API vẫn đã xảy ra.
- **Tạo Future một lần trong initState rồi truyền vào** (Đúng): Gọi hàm ngay trong build tạo Future mới mỗi lần, nên FutureBuilder coi đó là tác vụ khác.
- **Bọc FutureBuilder trong widget const để chặn rebuild** (Sai): Widget nhận Future động nên không thể là const.

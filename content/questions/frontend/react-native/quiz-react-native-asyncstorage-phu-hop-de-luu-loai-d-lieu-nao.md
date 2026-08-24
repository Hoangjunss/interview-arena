---
id: quiz-react-native-asyncstorage-phu-hop-de-luu-loai-d-lieu-nao
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AsyncStorage phù hợp để lưu loại dữ liệu nào?

## Đáp án trắc nghiệm
- [ ] Dữ liệu quan hệ cần truy vấn và lọc
- [x] Thiết lập nhẹ dạng khoá và chuỗi, không nhạy cảm
- [ ] Tệp ảnh và video tải về từ server
- [ ] Token đăng nhập và thông tin thanh toán

## Giải thích (VI)
AsyncStorage là kho khoá và chuỗi không mã hoá , hợp cho thiết lập nhẹ như ngôn ngữ, chế độ tối, cờ đã xem hướng dẫn. Token phải nằm trong kho an toàn, còn dữ liệu cần truy vấn thì dùng cơ sở dữ liệu cục bộ.

### Giải thích các phương án:
- **Dữ liệu quan hệ cần truy vấn và lọc** (Sai): Không có truy vấn, phải nạp hết rồi lọc trong bộ nhớ.
- **Thiết lập nhẹ dạng khoá và chuỗi, không nhạy cảm** (Đúng): Dữ liệu không được mã hoá và API chỉ đọc ghi theo khoá nên không hợp cho dữ liệu quan trọng.
- **Tệp ảnh và video tải về từ server** (Sai): Tệp nhị phân lớn phải lưu ở hệ thống tệp.
- **Token đăng nhập và thông tin thanh toán** (Sai): Dữ liệu nhạy cảm cần kho an toàn dựa trên Keychain và Keystore.

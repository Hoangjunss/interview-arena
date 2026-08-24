---
id: quiz-android-kotlin-toan-bo-man-hinh-compose-ve-lai-khi-chi-mot-o-nhap-thay-doi-nguyen-nhan
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toàn bộ màn hình Compose vẽ lại khi chỉ một ô nhập thay đổi. Nguyên nhân?

## Đáp án trắc nghiệm
- [x] State được đọc ở hàm cấp cao quá
- [ ] Ô nhập không được bọc trong thành phần ghi nhớ
- [ ] Thiếu khoá cho các thành phần trong danh sách
- [ ] Compose luôn vẽ lại toàn bộ cây mỗi lần state đổi

## Giải thích (VI)
Phạm vi vẽ lại là hàm đọc state . Đọc giá trị ở hàm cấp cao rồi truyền xuống khiến cả cây con chạy lại; đọc ngay tại nơi dùng, hoặc truyền hàm trả về giá trị thay vì giá trị, sẽ thu hẹp phạm vi.

### Giải thích các phương án:
- **State được đọc ở hàm cấp cao quá** (Đúng): Hàm nào đọc state thì hàm đó chạy lại, nên đọc ở gốc kéo theo cả cây con.
- **Ô nhập không được bọc trong thành phần ghi nhớ** (Sai): Ghi nhớ không quyết định phạm vi vẽ lại theo cách này.
- **Thiếu khoá cho các thành phần trong danh sách** (Sai): Khoá liên quan tới danh tính mục chứ không tới phạm vi vẽ lại của màn hình.
- **Compose luôn vẽ lại toàn bộ cây mỗi lần state đổi** (Sai): Nó chỉ chạy lại các hàm phụ thuộc dữ liệu đã đổi.

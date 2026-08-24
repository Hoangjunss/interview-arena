---
id: quiz-java-string-la-immutable-doan-code-sau-in-ra-gi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
String là immutable — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] "HI THERE" — hai method lần lượt nối chuỗi rồi viết hoa ngay trên s
- [ ] "hi there" — concat() sửa trực tiếp s, còn toUpperCase() chỉ có tác dụng khi gán lại
- [ ] Lỗi biên dịch — gọi method mà không dùng giá trị trả về không hợp lệ với String
- [x] "hi" — String immutable: hai method trả về object mới, không gán lại nên mất

## Giải thích (VI)
In ra "hi". String là immutable — tạo xong không sửa được nội dung. concat() và toUpperCase() không đổi s mà trả về object String mới; vì không gán lại nên hai kết quả đó bị bỏ đi. Muốn giữ, phải viết s = s.concat(" there"). Đây là điểm khác cơ bản với StringBuilder (mutable, sửa tại chỗ).

### Giải thích các phương án:
- **"HI THERE" — hai method lần lượt nối chuỗi rồi viết hoa ngay trên s** (Sai): String không có method nào sửa nội dung tại chỗ — cả concat() lẫn toUpperCase() đều trả object mới, s giữ nguyên "hi".
- **"hi there" — concat() sửa trực tiếp s, còn toUpperCase() chỉ có tác dụng khi gán lại** (Sai): concat() không sửa trực tiếp — nó cũng trả object mới như toUpperCase(); cả hai kết quả đều bị bỏ vì không gán lại.
- **Lỗi biên dịch — gọi method mà không dùng giá trị trả về không hợp lệ với String** (Sai): Java cho phép bỏ qua giá trị trả về của method — code biên dịch và chạy bình thường, chỉ là kết quả bị loại bỏ.
- **"hi" — String immutable: hai method trả về object mới, không gán lại nên mất** (Đúng): Đúng: mọi thao tác "đổi" String đều tạo object mới. Muốn giữ kết quả phải gán lại, ví dụ s = s.concat(" there").

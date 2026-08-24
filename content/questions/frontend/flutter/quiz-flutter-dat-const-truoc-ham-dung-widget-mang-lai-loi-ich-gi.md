---
id: quiz-flutter-dat-const-truoc-ham-dung-widget-mang-lai-loi-ich-gi
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt const trước hàm dựng widget mang lại lợi ích gì?

## Đáp án trắc nghiệm
- [ ] Widget được vẽ trên thread riêng nên mượt hơn
- [ ] Widget được nén lại nên giảm dung lượng gói cài đặt
- [ ] Widget bị khoá không cho widget cha truyền tham số mới
- [x] Widget được tái dùng nên nhánh đó bỏ qua rebuild

## Giải thích (VI)
const tạo một đối tượng duy nhất dùng lại nhiều lần . Khi rebuild, Flutter thấy widget mới trùng hệt widget cũ nên bỏ qua cả nhánh con đó. Đây là tối ưu rẻ nhất trong Flutter và cũng là thứ hay bị bỏ sót nhất.

### Giải thích các phương án:
- **Widget được vẽ trên thread riêng nên mượt hơn** (Sai): Flutter dựng widget trên luồng UI duy nhất, const không đổi điều đó.
- **Widget được nén lại nên giảm dung lượng gói cài đặt** (Sai): const ảnh hưởng tới thời gian chạy chứ không phải kích thước gói.
- **Widget bị khoá không cho widget cha truyền tham số mới** (Sai): Tham số vẫn truyền được, chỉ cần chúng là hằng số lúc biên dịch.
- **Widget được tái dùng nên nhánh đó bỏ qua rebuild** (Đúng): Đối tượng const là duy nhất theo tham số, Flutter so sánh thấy giống hệt nên không dựng lại nhánh con.

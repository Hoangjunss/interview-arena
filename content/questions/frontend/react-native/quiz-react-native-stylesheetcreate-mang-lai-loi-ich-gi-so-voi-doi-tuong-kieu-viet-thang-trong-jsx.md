---
id: quiz-react-native-stylesheetcreate-mang-lai-loi-ich-gi-so-voi-doi-tuong-kieu-viet-thang-trong-jsx
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
StyleSheet.create mang lại lợi ích gì so với đối tượng kiểu viết thẳng trong JSX?

## Đáp án trắc nghiệm
- [ ] Cho phép kế thừa kiểu từ component cha
- [ ] Tự động áp kiểu khác nhau cho Android và iOS
- [x] Kiểu được tạo một lần và kiểm tra tên thuộc tính
- [ ] Cho phép dùng bộ chọn giống CSS trong React Native

## Giải thích (VI)
StyleSheet.create tạo đối tượng kiểu một lần thay vì mỗi lần render, và kiểm tra tên thuộc tính nên gõ sai bị bắt sớm. Với đối tượng viết thẳng trong JSX, mỗi lần render sinh một tham chiếu mới và làm hỏng việc so sánh props.

### Giải thích các phương án:
- **Cho phép kế thừa kiểu từ component cha** (Sai): Kiểu không kế thừa, trừ vài thuộc tính chữ trong Text lồng nhau.
- **Tự động áp kiểu khác nhau cho Android và iOS** (Sai): Khác biệt theo nền tảng phải tự viết bằng Platform.
- **Kiểu được tạo một lần và kiểm tra tên thuộc tính** (Đúng): Đối tượng viết thẳng trong JSX được tạo lại mỗi lần render và không được kiểm tra sớm.
- **Cho phép dùng bộ chọn giống CSS trong React Native** (Sai): React Native không có bộ chọn, kiểu luôn gắn trực tiếp vào component.

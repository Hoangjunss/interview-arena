---
id: quiz-react-native-trong-react-native-flexdirection-mac-dinh-la-gi
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong React Native, flexDirection mặc định là gì?

## Đáp án trắc nghiệm
- [ ] Tuỳ theo nền tảng Android hay iOS
- [x] column, khác với mặc định row của web
- [ ] row, giống hệt mặc định của flexbox trên web
- [ ] Không có mặc định, phải khai báo tường minh

## Giải thích (VI)
Mặc định là column, ngược với web vốn mặc định row. Ngoài ra flex: 1 trong React Native tương đương flex: 1 1 0 và mọi View đều là vùng flex, không cần khai báo display.

### Giải thích các phương án:
- **Tuỳ theo nền tảng Android hay iOS** (Sai): Hành vi bố cục giống nhau trên cả hai nền tảng.
- **column, khác với mặc định row của web** (Đúng): Giao diện di động xếp theo chiều dọc nhiều hơn nên mặc định được chọn theo hướng đó.
- **row, giống hệt mặc định của flexbox trên web** (Sai): Đây chính là điểm khác biệt hay gây nhầm khi chuyển từ web sang.
- **Không có mặc định, phải khai báo tường minh** (Sai): Luôn có giá trị mặc định nếu không khai báo.

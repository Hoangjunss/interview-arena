---
id: quiz-security-hien-thi-noi-dung-do-nguoi-dung-nhap-trong-react-khi-nao-co-nguy-co-xss
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hiển thị nội dung do người dùng nhập trong React, khi nào có nguy cơ XSS?

## Đáp án trắc nghiệm
- [ ] Luôn có nguy cơ vì React vẫn chèn dữ liệu trực tiếp vào DOM
- [ ] Khi hiển thị dữ liệu lấy từ API thay vì từ state
- [x] Khi dùng dangerouslySetInnerHTML với dữ liệu chưa sạch
- [ ] Khi dùng template string để tạo nội dung hiển thị

## Giải thích (VI)
Chủ yếu khi dùng dangerouslySetInnerHTML với dữ liệu chưa làm sạch. JSX escape văn bản theo mặc định, nên <div>{userInput}</div> là an toàn. Rủi ro còn ở href={userInput} (javascript:) và các thuộc tính nhận URL.

### Giải thích các phương án:
- **Luôn có nguy cơ vì React vẫn chèn dữ liệu trực tiếp vào DOM** (Sai): JSX escape nội dung văn bản theo mặc định nên trường hợp thường là an toàn.
- **Khi hiển thị dữ liệu lấy từ API thay vì từ state** (Sai): Nguồn dữ liệu không quyết định; cách render mới quyết định.
- **Khi dùng dangerouslySetInnerHTML với dữ liệu chưa sạch** (Đúng): JSX thường tự escape, nên rủi ro nằm ở chỗ cố tình chèn HTML thô.
- **Khi dùng template string để tạo nội dung hiển thị** (Sai): Chuỗi ghép vẫn được escape khi render như văn bản.

---
id: quiz-ruby-on-rails-rui-ro-cua-viec-dat-nhieu-logic-vao-callback-vong-doi-cua-model-la-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rủi ro của việc đặt nhiều logic vào callback vòng đời của model là gì?

## Đáp án trắc nghiệm
- [ ] Callback làm chậm truy vấn đọc dữ liệu
- [x] Tác dụng phụ chạy ngầm ở mọi nơi ghi bản ghi
- [ ] Callback chỉ chạy ở môi trường phát triển
- [ ] Callback không chạy được trong giao dịch

## Giải thích (VI)
Chúng chạy ngầm ở mọi nơi ghi bản ghi , kể cả từ kịch bản chạy tay hoặc tác vụ nhập dữ liệu. Gửi thư trong callback nghĩa là một lần nhập dữ liệu hàng loạt sẽ gửi hàng nghìn thư ngoài ý muốn.

### Giải thích các phương án:
- **Callback làm chậm truy vấn đọc dữ liệu** (Sai): Chúng chỉ chạy ở các thao tác ghi.
- **Tác dụng phụ chạy ngầm ở mọi nơi ghi bản ghi** (Đúng): Mọi lệnh ghi kể cả từ kịch bản chạy tay đều kích hoạt, gây hậu quả ngoài ý muốn.
- **Callback chỉ chạy ở môi trường phát triển** (Sai): Chúng chạy ở mọi môi trường.
- **Callback không chạy được trong giao dịch** (Sai): Chúng chạy trong cùng giao dịch với thao tác ghi.

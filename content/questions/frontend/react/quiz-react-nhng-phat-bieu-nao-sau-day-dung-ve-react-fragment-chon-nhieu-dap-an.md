---
id: quiz-react-nhng-phat-bieu-nao-sau-day-dung-ve-react-fragment-chon-nhieu-dap-an
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về React Fragment? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] Nhóm nhiều element cùng cấp mà không tạo DOM node thừa
- [ ] Fragment giúp render nhanh hơn thẻ div vì React bỏ qua bước diff cho các phần tử bên trong nó
- [ ] Mọi component bắt buộc phải bọc JSX trong Fragment thì mới hợp lệ

## Giải thích (VI)
React Fragment ( hoặc viết tắt <>) nhóm nhiều element cùng cấp mà không tạo thêm DOM node thừa. Dùng khi component cần return nhiều phần tử song song, đặc biệt trong ngữ cảnh HTML chặt chẽ như trong — nơi div bọc ngoài làm sai cấu trúc. Lưu ý: cú pháp rút gọn <>... không nhận key; render danh sách Fragment phải dùng dạng đầy đủ.

### Giải thích các phương án:
- **Nhóm nhiều element cùng cấp mà không tạo DOM node thừa** (Đúng): Đúng — đây là mục đích chính của Fragment: thỏa yêu cầu "một element gốc" của JSX mà không để lại vết tích trong DOM thật. Thay cho việc bọc một thẻ div chỉ để return.
- **Fragment giúp render nhanh hơn thẻ div vì React bỏ qua bước diff cho các phần tử bên trong nó** (Sai): Sai — con của Fragment vẫn được diff bình thường; lợi ích chỉ là không tạo DOM node thừa, không phải bỏ qua reconciliation.
- **Mọi component bắt buộc phải bọc JSX trong Fragment thì mới hợp lệ** (Sai): Sai — component return một element duy nhất (hoặc null) không cần Fragment; chỉ khi return nhiều phần tử cùng cấp mới cần nhóm lại.

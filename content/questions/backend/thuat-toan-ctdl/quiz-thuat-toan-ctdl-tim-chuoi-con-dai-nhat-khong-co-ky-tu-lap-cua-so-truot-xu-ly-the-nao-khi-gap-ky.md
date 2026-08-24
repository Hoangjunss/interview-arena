---
id: quiz-thuat-toan-ctdl-tim-chuoi-con-dai-nhat-khong-co-ky-tu-lap-cua-so-truot-xu-ly-the-nao-khi-gap-ky
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tìm chuỗi con dài nhất không có ký tự lặp. Cửa sổ trượt xử lý thế nào khi gặp ký tự đã có trong cửa sổ?

## Đáp án trắc nghiệm
- [ ] Đặt lại cửa sổ về rỗng rồi bắt đầu từ ký tự hiện tại
- [ ] Giữ nguyên cửa sổ và bỏ qua ký tự đang xét
- [ ] Lùi biên phải lại một bước rồi thử ký tự kế tiếp
- [x] Đẩy biên trái tới ngay sau lần xuất hiện trước

## Giải thích (VI)
Đẩy biên trái tới ngay sau vị trí xuất hiện trước đó của ký tự vừa gặp, lấy từ một map ký tự đến chỉ số. Cửa sổ luôn giữ bất biến "không có ký tự lặp", còn biên phải chỉ tiến, nên mỗi ký tự vào và ra tối đa một lần: O(n).

### Giải thích các phương án:
- **Đặt lại cửa sổ về rỗng rồi bắt đầu từ ký tự hiện tại** (Sai): Cách này bỏ mất phần đuôi hợp lệ nên có thể trả về kết quả ngắn hơn thực tế.
- **Giữ nguyên cửa sổ và bỏ qua ký tự đang xét** (Sai): Bỏ qua ký tự làm chuỗi con không còn liên tiếp.
- **Lùi biên phải lại một bước rồi thử ký tự kế tiếp** (Sai): Biên phải chỉ tiến trong kỹ thuật này, lùi lại phá vỡ tính O(n).
- **Đẩy biên trái tới ngay sau lần xuất hiện trước** (Đúng): Nhảy thẳng tới vị trí hợp lệ gần nhất, giữ bất biến cửa sổ không có ký tự lặp.

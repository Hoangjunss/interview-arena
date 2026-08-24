---
id: quiz-javascript-su-khac-nhau-gia-arrayprototypemap-va-arrayprototypeforeach-la-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa Array.prototype.map() và Array.prototype.forEach() là gì?

## Đáp án trắc nghiệm
- [ ] Cả hai đều trả về mảng mới, không có gì khác biệt
- [ ] map() không thể truy cập index, forEach() thì có
- [x] map() trả về một mảng mới gồm các giá trị được biến đổi
- [ ] forEach() biến đổi mảng gốc tại chỗ, còn map() thì không

## Giải thích (VI)
map() biến đổi từng phần tử và trả về mảng mới cùng độ dài — dùng khi bạn cần kết quả. forEach() chạy callback trên từng phần tử nhưng trả về undefined — dùng cho side-effect (log, ghi DB...). Nếu bạn định gán kết quả của forEach, đó là dấu hiệu nên dùng map.

### Giải thích các phương án:
- **Cả hai đều trả về mảng mới, không có gì khác biệt** (Sai): forEach luôn trả undefined; chỉ map trả mảng mới.
- **map() không thể truy cập index, forEach() thì có** (Sai): Cả hai callback đều nhận (value, index, array); cả hai đều truy cập index được.
- **map() trả về một mảng mới gồm các giá trị được biến đổi** (Đúng): forEach() trả về undefined và chỉ dùng để duyệt/gây side-effect. map là phương thức biến đổi trả mảng mới; forEach không trả gì hữu ích, chỉ chạy callback trên từng phần tử.
- **forEach() biến đổi mảng gốc tại chỗ, còn map() thì không** (Sai): Cả hai đều không tự sửa mảng gốc; map tạo mảng mới, còn side-effect trong forEach là do callback của bạn tự làm.

---
id: quiz-javascript-arrayprototypereduce-dung-de-lam-gi-va-tham-so-cua-callback-gom-nhng-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array.prototype.reduce() dùng để làm gì và tham số của callback gồm những gì?

## Đáp án trắc nghiệm
- [ ] Lọc bỏ các phần tử không thoả điều kiện và trả về mảng ngắn hơn
- [x] Gộp (fold) mảng thành một giá trị duy nhất
- [ ] Sắp xếp mảng tại chỗ theo comparator
- [ ] Biến đổi từng phần tử và trả về mảng mới cùng độ dài

## Giải thích (VI)
reduce gộp cả mảng về một giá trị bằng cách chạy callback (accumulator, currentValue, index, array) trên từng phần tử; giá trị return mỗi bước trở thành accumulator của bước tiếp theo. Nên truyền initialValue làm tham số thứ hai để tránh lỗi với mảng rỗng và xác định rõ kiểu accumulator.

### Giải thích các phương án:
- **Lọc bỏ các phần tử không thoả điều kiện và trả về mảng ngắn hơn** (Sai): Đó là filter; reduce gộp về một giá trị (dù giá trị đó có thể là mảng hay object).
- **Gộp (fold) mảng thành một giá trị duy nhất** (Đúng): Callback nhận (accumulator, currentValue, index, array) và giá trị trả về mỗi bước trở thành accumulator của bước sau. Đúng: reduce tích luỹ kết quả qua từng phần tử; giá trị return của callback là accumulator cho lần lặp kế tiếp.
- **Sắp xếp mảng tại chỗ theo comparator** (Sai): Đó là sort; reduce không sắp xếp mà tích luỹ.
- **Biến đổi từng phần tử và trả về mảng mới cùng độ dài** (Sai): Đó là map; reduce gộp nhiều phần tử về một kết quả tổng hợp.

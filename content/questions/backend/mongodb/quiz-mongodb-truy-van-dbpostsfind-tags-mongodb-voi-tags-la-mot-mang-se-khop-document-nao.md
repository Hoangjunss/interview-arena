---
id: quiz-mongodb-truy-van-dbpostsfind-tags-mongodb-voi-tags-la-mot-mang-se-khop-document-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn db.posts.find({ tags: "mongodb" }) với tags là một mảng sẽ khớp document nào?

## Đáp án trắc nghiệm
- [ ] Chỉ A — trường vô hướng không khớp với truy vấn kiểu mảng
- [ ] Không document nào — phải viết { tags: ["mongodb"] } mới khớp
- [x] A và C — mảng khớp nếu bất kỳ phần tử nào bằng giá trị tìm
- [ ] Chỉ C — muốn tìm trong mảng phải dùng $in hoặc $elemMatch

## Giải thích (VI)
Khớp A và C. Với trường mảng, { tags: "mongodb" } đúng khi có ít nhất một phần tử bằng giá trị đó. Cú pháp này cũng khớp trường vô hướng. Còn { tags: ["mongodb"] } là so khớp toàn bộ mảng — chỉ trúng document có mảng đúng bằng vậy.

### Giải thích các phương án:
- **Chỉ A — trường vô hướng không khớp với truy vấn kiểu mảng** (Sai): Truy vấn không hề "kiểu mảng"; nó khớp cả hai dạng.
- **Không document nào — phải viết { tags: ["mongodb"] } mới khớp** (Sai): Viết như vậy lại là khớp CHÍNH XÁC cả mảng, chỉ trúng document có mảng đúng một phần tử đó.
- **A và C — mảng khớp nếu bất kỳ phần tử nào bằng giá trị tìm** (Đúng): Cùng một cú pháp truy vấn phục vụ cả trường vô hướng lẫn trường mảng: trường có giá trị vô hướng bằng đúng giá trị đó cũng khớp.
- **Chỉ C — muốn tìm trong mảng phải dùng $in hoặc $elemMatch** (Sai): So khớp trực tiếp đã tự động dò vào từng phần tử mảng.

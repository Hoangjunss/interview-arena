---
id: quiz-react-khi-count-0-component-duoi-day-hien-thi-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi count = 0, component dưới đây hiển thị gì?

## Đáp án trắc nghiệm
- [ ] Báo lỗi runtime vì không được đặt giá trị số trực tiếp trong JSX
- [ ] Không hiển thị gì — mọi giá trị falsy đều bị React bỏ qua khi render
- [x] Hiển thị số 0, vì && trả về vế trái khi vế trái là falsy
- [ ] Hiển thị "0 items" — toán tử && luôn đánh giá và render vế phải

## Giải thích (VI)
Hiển thị số "0". Vì 0 là falsy, biểu thức count && ... short-circuit và trả về 0 — mà React render số thành text, khác với null, undefined, true, false (bị bỏ qua hoàn toàn). Fix: đảm bảo vế trái của && là boolean thật — count > 0 && ... hoặc !!count && ... .

### Giải thích các phương án:
- **Báo lỗi runtime vì không được đặt giá trị số trực tiếp trong JSX** (Sai): Số là giá trị render hợp lệ trong JSX ({count} hiển thị bình thường) — không có lỗi nào ở đây, chỉ có kết quả hiển thị ngoài ý muốn.
- **Không hiển thị gì — mọi giá trị falsy đều bị React bỏ qua khi render** (Sai): Sai — React chỉ bỏ qua null, undefined, true, false; số 0 (và NaN) tuy falsy nhưng vẫn được render thành text.
- **Hiển thị số 0, vì && trả về vế trái khi vế trái là falsy** (Đúng): Đúng: 0 là falsy nên && short-circuit trả về 0, và React render số như text node — đây là cạm bẫy kinh điển của && trong JSX. React render số 0 thành text node, khác với null, undefined và boolean vốn bị bỏ qua; sửa bằng count > 0 && ...
- **Hiển thị "0 items" — toán tử && luôn đánh giá và render vế phải** (Sai): Sai — && short-circuit: vế trái falsy thì vế phải không được đánh giá; kết quả của biểu thức là chính vế trái (số 0).

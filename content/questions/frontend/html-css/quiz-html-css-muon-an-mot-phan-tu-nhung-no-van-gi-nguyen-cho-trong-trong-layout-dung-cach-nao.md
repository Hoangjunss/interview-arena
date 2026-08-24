---
id: quiz-html-css-muon-an-mot-phan-tu-nhung-no-van-gi-nguyen-cho-trong-trong-layout-dung-cach-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn ẩn một phần tử nhưng nó vẫn giữ nguyên chỗ trống trong layout, dùng cách nào?

## Đáp án trắc nghiệm
- [ ] opacity: 0 là lựa chọn duy nhất vì hai cách kia đều xóa khoảng trống
- [ ] Đặt width: 0 và height: 0 cho phần tử
- [x] visibility: hidden — phần tử vô hình nhưng vẫn chiếm không gian
- [ ] display: none — phần tử ẩn đi và giữ nguyên khoảng trống

## Giải thích (VI)
Dùng visibility: hidden — phần tử vô hình nhưng box vẫn chiếm chỗ, layout xung quanh không xê dịch. So sánh: display: none gỡ hẳn khỏi layout (mất chỗ, phần tử sau dồn lên); opacity: 0 cũng giữ chỗ nhưng vẫn nhận sự kiện chuột — người dùng có thể bấm nhầm vào thứ không nhìn thấy.

### Giải thích các phương án:
- **opacity: 0 là lựa chọn duy nhất vì hai cách kia đều xóa khoảng trống** (Sai): opacity: 0 đúng là giữ chỗ, nhưng không phải duy nhất — visibility: hidden cũng giữ chỗ; khác biệt là opacity 0 vẫn nhận click, dễ gây bấm nhầm vào phần tử "vô hình".
- **Đặt width: 0 và height: 0 cho phần tử** (Sai): Thu kích thước về 0 chính là làm mất khoảng trống — ngược yêu cầu; nội dung còn có thể tràn ra ngoài nếu không kèm overflow: hidden.
- **visibility: hidden — phần tử vô hình nhưng vẫn chiếm không gian** (Đúng): Đúng hành vi: visibility: hidden chỉ tắt phần vẽ, box vẫn nằm trong layout nên các phần tử xung quanh không xê dịch.
- **display: none — phần tử ẩn đi và giữ nguyên khoảng trống** (Sai): display: none gỡ phần tử khỏi layout hoàn toàn — khoảng trống biến mất và các phần tử sau dồn lên chiếm chỗ.

---
id: quiz-graphql-query-va-mutation-khac-nhau-o-diem-nao-ve-mat-thuc-thi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query và Mutation khác nhau ở điểm nào về mặt thực thi?

## Đáp án trắc nghiệm
- [ ] Mutation không nhận tham số đầu vào
- [x] Trường cấp cao của mutation chạy tuần tự
- [ ] Query không trả về được đối tượng lồng nhau
- [ ] Mutation bắt buộc dùng phương thức POST còn query dùng GET

## Giải thích (VI)
Về mặt thực thi, các trường cấp cao của mutation chạy tuần tự để thứ tự thay đổi dữ liệu là xác định, còn query chỉ đọc nên các trường chạy song song được. Về ngữ nghĩa, query là đọc và mutation là ghi.

### Giải thích các phương án:
- **Mutation không nhận tham số đầu vào** (Sai): Mutation thường nhận một kiểu đầu vào riêng.
- **Trường cấp cao của mutation chạy tuần tự** (Đúng): Query chạy song song được vì chỉ đọc, còn mutation phải tuần tự để thứ tự thay đổi dữ liệu là xác định.
- **Query không trả về được đối tượng lồng nhau** (Sai): Truy vấn lồng nhiều tầng là tính năng chính của GraphQL.
- **Mutation bắt buộc dùng phương thức POST còn query dùng GET** (Sai): Phương thức HTTP là chuyện của tầng truyền tải, không phải quy định của ngôn ngữ.

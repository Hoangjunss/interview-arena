---
id: quiz-typescript-vi-sao-doan-code-sau-loi-compile-va-cach-sua-dung-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao đoạn code sau lỗi compile, và cách sửa đúng là gì?

## Đáp án trắc nghiệm
- [ ] Sửa bằng (id as string).toUpperCase() là cách chuẩn được khuyến nghị
- [ ] Lỗi do thiếu annotation kiểu trả về của hàm — thêm : void là hết lỗi
- [x] Với union type chỉ gọi được member chung của mọi thành viên; number không có toUpperCase
- [ ] Union type không dùng được cho parameter — phải tách thành hai hàm riêng cho string và number

## Giải thích (VI)
Union string | number nghĩa là giá trị có thể là một trong hai — nên TypeScript chỉ cho gọi member tồn tại trên CẢ hai kiểu. toUpperCase chỉ có ở string nên báo lỗi. Cách sửa: narrow bằng if (typeof id === "string") — trong nhánh đó id được thu hẹp về string và gọi method an toàn.

### Giải thích các phương án:
- **Sửa bằng (id as string).toUpperCase() là cách chuẩn được khuyến nghị** (Sai): Compile được nhưng nói dối compiler: khi caller truyền number, code vẫn crash ở runtime. Narrow bằng typeof mới là cách an toàn.
- **Lỗi do thiếu annotation kiểu trả về của hàm — thêm : void là hết lỗi** (Sai): Return type không liên quan; lỗi nằm ở việc gọi toUpperCase trên giá trị có thể là number.
- **Với union type chỉ gọi được member chung của mọi thành viên; number không có toUpperCase** (Đúng): Phải narrow bằng typeof id === "string" trước. TypeScript chỉ cho phép thao tác hợp lệ với TẤT CẢ thành viên của union; kiểm tra typeof thu hẹp về string trong nhánh if nên gọi được method của string.
- **Union type không dùng được cho parameter — phải tách thành hai hàm riêng cho string và number** (Sai): Union parameter hoàn toàn hợp lệ và rất phổ biến; vấn đề chỉ nằm ở việc truy cập member riêng của một thành viên khi chưa narrow.

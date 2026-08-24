---
id: quiz-frontend-core-script-script-async-va-script-defer-khac-nhau-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
<script>, <script async> và <script defer> khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] defer chỉ tải file về sẵn, không bao giờ tự chạy trừ khi gọi thủ công
- [ ] Ba cách hoàn toàn tương đương nếu đặt script ở cuối <body>
- [ ] Cả async và defer đều tải song song và chạy theo đúng thứ tự khai báo trong tài liệu HTML
- [x] async chạy ngay khi tải xong, thứ tự không đảm bảo; defer chạy sau parse, đúng thứ tự

## Giải thích (VI)
Script thường chặn quá trình phân tích HTML: trình duyệt dừng lại, tải và chạy xong mới đi tiếp. async tải song song và chạy ngay khi tải xong, nên thứ tự giữa các script không đảm bảo — hợp với script độc lập như analytics. defer tải song song nhưng hoãn chạy tới khi HTML phân tích xong và giữ đúng thứ tự khai báo — mặc định tốt cho script ứng dụng.

### Giải thích các phương án:
- **defer chỉ tải file về sẵn, không bao giờ tự chạy trừ khi gọi thủ công** (Sai): defer vẫn chạy, chỉ là sau khi HTML được phân tích xong.
- **Ba cách hoàn toàn tương đương nếu đặt script ở cuối <body>** (Sai): Đặt cuối body gần với defer về thời điểm chạy, nhưng vẫn khác về thời điểm bắt đầu tải.
- **Cả async và defer đều tải song song và chạy theo đúng thứ tự khai báo trong tài liệu HTML** (Sai): async chạy ngay khi tải xong nên thứ tự phụ thuộc tốc độ mạng.
- **async chạy ngay khi tải xong, thứ tự không đảm bảo; defer chạy sau parse, đúng thứ tự** (Đúng): Đúng: cả hai đều tải song song với quá trình phân tích HTML, khác nhau ở thời điểm thực thi và việc có giữ thứ tự khai báo hay không. <script> thường thì chặn phân tích HTML để tải và chạy ngay.

---
id: quiz-php-can-doc-file-csv-vai-gb-va-xu-ly-tung-dong-vi-sao-dung-generator-yield-thay-vi-t
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đọc file CSV vài GB và xử lý từng dòng. Vì sao dùng generator (yield) thay vì trả về mảng toàn bộ dòng?

## Đáp án trắc nghiệm
- [x] Chỉ giữ một phần tử tại một thời điểm, bộ nhớ không phụ thuộc kích thước file
- [ ] Generator đọc file bằng nhiều thread song song nên nhanh hơn
- [ ] Generator tự nén dữ liệu trong bộ nhớ nên chứa được file lớn
- [ ] Mảng PHP có giới hạn cứng về số phần tử nên bắt buộc phải dùng generator

## Giải thích (VI)
Generator sinh từng giá trị một khi được lặp tới, thay vì dựng mảng chứa toàn bộ dòng: bộ nhớ giữ ổn định dù file bao nhiêu GB, còn cách trả mảng sẽ vượt memory_limit. Hàm chứa yield tạm dừng sau mỗi giá trị và chạy tiếp khi vòng lặp lấy giá trị kế.

### Giải thích các phương án:
- **Chỉ giữ một phần tử tại một thời điểm, bộ nhớ không phụ thuộc kích thước file** (Đúng): Mỗi lần lặp generator sinh đúng một giá trị rồi tạm dừng — không dựng mảng chứa toàn bộ dòng.
- **Generator đọc file bằng nhiều thread song song nên nhanh hơn** (Sai): Generator không liên quan tới song song hoá; PHP vẫn chạy tuần tự một thread.
- **Generator tự nén dữ liệu trong bộ nhớ nên chứa được file lớn** (Sai): Không có cơ chế nén nào; điểm mấu chốt là không giữ toàn bộ dữ liệu cùng lúc.
- **Mảng PHP có giới hạn cứng về số phần tử nên bắt buộc phải dùng generator** (Sai): Mảng không có giới hạn cứng kiểu đó; vấn đề là memory limit bị vượt khi giữ toàn bộ dòng.

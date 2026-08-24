---
id: dat-ten-va-cau-truc-test-the-nao-de-khi-ci-do-la-biet-ngay-hong-cai-gi
position: backend
technology: đặt-tên-\u0026-cấu-trúc-test
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt tên và cấu trúc test thế nào để khi CI đỏ là biết ngay hỏng cái gì?

## Question (EN)
How should tests be named and structured so a red CI immediately tells you what broke?

## Đáp án chi tiết (VI)
Tên test phải trả lời được **\\"chức năng nào, trong điều kiện nào, kỳ vọng gì\\"** mà không cần mở code ra đọc.\
\
```ts\
// weak: does not say what broke\
it('works', ...)\
it('test discount', ...)\
\
// clear: subject - condition - expectation\
it('applies 10% discount when order total exceeds 500k', ...)\
it('rejects the coupon when it has already expired', ...)\
```\
\
Thân test giữ 3 khối rõ ràng, cách nhau bằng dòng trống: chuẩn bị dữ liệu, gọi hành động, kiểm tra kết quả (arrange - act - assert).\
\
Hai lỗi cấu trúc hay gặp:\
\
- **Lồng `describe` quá sâu.** Ba bốn tầng `beforeEach` khiến người đọc phải cuộn ngược để biết biến `user` đang có giá trị gì. Ưu tiên viết phẳng, dữ liệu tạo ngay trong test hoặc qua một hàm helper gọi tường minh.\
- **Một test assert 10 thứ.** Khi đỏ chỉ biết dòng assert đầu tiên hỏng. Tách theo từng hành vi, mỗi test một lý do để đỏ.\
\
Tiêu chí đánh giá: đọc **danh sách tên test** phải ra được đặc tả của module đó.

## Detailed Answer (EN)
A test name must answer **\\"which behaviour, under which condition, expecting what\\"** without opening the file.\
\
```ts\
// weak: does not say what broke\
it('works', ...)\
it('test discount', ...)\
\
// clear: subject - condition - expectation\
it('applies 10% discount when order total exceeds 500k', ...)\
it('rejects the coupon when it has already expired', ...)\
```\
\
Keep the body in three visually separated blocks: set up data, invoke the action, check the result (arrange - act - assert).\
\
Two common structural mistakes:\
\
- **Over-nested `describe` blocks.** Three or four layers of `beforeEach` force readers to scroll upwards to learn what `user` currently holds. Prefer flat tests with data created inline or via an explicitly called helper.\
- **One test asserting ten things.** When it fails you only learn about the first assertion. Split by behaviour so each test has exactly one reason to fail.\
\
The bar to aim for: reading the **list of test names** should read like the module's specification.

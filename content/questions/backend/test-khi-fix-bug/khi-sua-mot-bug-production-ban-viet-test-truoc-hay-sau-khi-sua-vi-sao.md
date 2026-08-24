---
id: khi-sua-mot-bug-production-ban-viet-test-truoc-hay-sau-khi-sua-vi-sao
position: backend
technology: test-khi-fix-bug
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi sửa một bug production, bạn viết test trước hay sau khi sửa? Vì sao?

## Question (EN)
When fixing a production bug, do you write the test before or after the fix? Why?

## Đáp án chi tiết (VI)
**Viết test trước — và phải thấy nó đỏ trước khi sửa code.**\
\
Quy trình thực tế:\
\
1. Tái hiện bug bằng một test nhỏ nhất có thể, dùng đúng dữ liệu gây lỗi (đơn hàng id X, chuỗi đầu vào Y).\
2. Chạy test → **phải fail**. Bước này quan trọng: nếu test pass ngay từ đầu thì bạn chưa tái hiện đúng bug, và test đó sẽ không bảo vệ được gì.\
3. Sửa code cho tới khi test xanh.\
4. Chạy toàn bộ suite để chắc không làm hỏng chỗ khác.\
\
Lợi ích cụ thể:\
- Chứng minh được bạn hiểu đúng nguyên nhân, không phải sửa mò trúng.\
- Test đó thành **test hồi quy** vĩnh viễn: bug này không quay lại lần thứ ba.\
- Bộ test lớn lên theo đúng những vùng code thực sự hay hỏng, thay vì rải đều một cách ngẫu nhiên.\
\
Đây cũng là cách áp dụng TDD dễ thuyết phục nhất trong nhóm chưa quen TDD: không cần đổi cách làm feature, chỉ cần thêm một bước khi fix bug.

## Detailed Answer (EN)
**Write the test first — and watch it go red before touching the code.**\
\
The practical loop:\
\
1. Reproduce the bug with the smallest possible test, using the exact failing data (order id X, input string Y).\
2. Run it → it **must fail**. This step matters: if it passes immediately, you have not reproduced the bug and the test protects nothing.\
3. Fix the code until it turns green.\
4. Run the full suite to confirm nothing else broke.\
\
Concrete benefits:\
- It proves you understand the actual cause instead of guessing your way to a green screen.\
- The test becomes a permanent **regression test**: this bug does not come back a third time.\
- The suite grows over the code that genuinely breaks, rather than spreading evenly at random.\
\
This is also the easiest way to introduce TDD to a team that does not practise it: feature work stays unchanged, you only add one step to bug fixing.

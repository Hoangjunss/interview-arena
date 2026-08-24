---
id: quiz-thuat-toan-ctdl-vi-sao-3n-500n-20-duoc-viet-gon-thanh-on
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao 3n² + 500n + 20 được viết gọn thành O(n²)?

## Đáp án trắc nghiệm
- [ ] Vì cộng các số hạng lại luôn cho bậc của số hạng đầu tiên
- [x] Khi n đủ lớn, số hạng bậc cao nhất áp đảo phần còn lại
- [ ] Vì 500n và 20 chỉ ảnh hưởng tới bộ nhớ chứ không tới thời gian
- [ ] Vì Big-O chỉ chấp nhận một số hạng duy nhất trong biểu thức

## Giải thích (VI)
Vì Big-O xét hành vi khi n tiến ra vô cùng . Tại n = 1.000.000, 3n² là 3×10¹², còn 500n chỉ là 5×10⁸, nhỏ hơn khoảng 6000 lần. Hằng số và số hạng bậc thấp bị bỏ vì chúng không đổi được hình dạng đường cong tăng trưởng.

### Giải thích các phương án:
- **Vì cộng các số hạng lại luôn cho bậc của số hạng đầu tiên** (Sai): Thứ tự viết không quyết định, bậc cao nhất mới quyết định.
- **Khi n đủ lớn, số hạng bậc cao nhất áp đảo phần còn lại** (Đúng): Với n lớn thì tỉ lệ giữa 3n² và tổng tiến về 1, các số hạng kia thành nhiễu.
- **Vì 500n và 20 chỉ ảnh hưởng tới bộ nhớ chứ không tới thời gian** (Sai): Chúng vẫn là chi phí thời gian, chỉ là bị lấn át khi n lớn.
- **Vì Big-O chỉ chấp nhận một số hạng duy nhất trong biểu thức** (Sai): Không có ràng buộc cú pháp như vậy; đây là kết quả của việc lấy giới hạn.

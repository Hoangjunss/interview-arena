---
id: quiz-vuejs-vi-sao-key-trong-v-for-quan-trong-va-vi-sao-khong-nen-dung-chi-so-lam-key
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao :key trong v-for quan trọng, và vì sao không nên dùng chỉ số làm key?

## Đáp án trắc nghiệm
- [ ] Key dùng để Vue sắp xếp danh sách theo thứ tự tăng dần
- [x] Key là danh tính của item; chỉ số bị dịch khi chèn/xoá nên Vue tái dùng sai node
- [ ] Key chỉ để tránh cảnh báo trong console, không ảnh hưởng hành vi
- [ ] Dùng chỉ số luôn tốt hơn vì nó luôn là số nguyên duy nhất trong toàn bộ danh sách

## Giải thích (VI)
:key cho Vue một danh tính ổn định để so khớp node cũ với item mới, nhờ đó chỉ thêm/xoá/di chuyển đúng phần cần thiết. Dùng chỉ số làm key thì khi chèn hoặc xoá ở giữa, danh tính của các item phía sau bị dịch một bậc: Vue giữ lại node cũ cho item mới, khiến state cục bộ (giá trị input, checkbox, trạng thái mở/đóng) dính sang item khác. Dùng id ổn định từ dữ liệu.

### Giải thích các phương án:
- **Key dùng để Vue sắp xếp danh sách theo thứ tự tăng dần** (Sai): Key không tham gia sắp xếp.
- **Key là danh tính của item; chỉ số bị dịch khi chèn/xoá nên Vue tái dùng sai node** (Đúng): Đúng: key cho Vue biết node nào tương ứng item nào giữa hai lần render. Dùng chỉ số thì khi chèn/xoá giữa danh sách, danh tính bị dịch nên state của item dính nhầm sang item khác.
- **Key chỉ để tránh cảnh báo trong console, không ảnh hưởng hành vi** (Sai): Key ảnh hưởng trực tiếp tới việc tái sử dụng DOM và state của component con.
- **Dùng chỉ số luôn tốt hơn vì nó luôn là số nguyên duy nhất trong toàn bộ danh sách** (Sai): Chỉ số duy nhất trong một lần render nhưng không ổn định giữa các lần render.

---
id: quiz-python-khac-biet-cot-loi-gia-list-va-tuple-trong-python-la-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa list và tuple trong Python là gì?

## Đáp án trắc nghiệm
- [ ] list giữ thứ tự phần tử, còn tuple thì không
- [ ] Không có khác biệt, tuple chỉ là cách viết list bằng ngoặc tròn
- [ ] tuple chỉ chứa được các phần tử cùng kiểu, list thì chứa kiểu hỗn hợp
- [x] list thay đổi được (mutable) — thêm/sửa/xoá phần tử sau khi tạo

## Giải thích (VI)
list mutable: thêm (append), sửa (lst[0] = 9), xoá phần tử được sau khi tạo. tuple immutable: tạo xong là cố định, gán phần tử ném TypeError. Nhờ bất biến, tuple (chứa phần tử hashable) dùng được làm key của dict và phần tử của set — list thì không. Dùng list cho dãy dữ liệu thay đổi, tuple cho bản ghi cố định như tọa độ (x, y).

### Giải thích các phương án:
- **list giữ thứ tự phần tử, còn tuple thì không** (Sai): Cả hai đều là sequence có thứ tự, truy cập theo index như nhau; cấu trúc không thứ tự là set.
- **Không có khác biệt, tuple chỉ là cách viết list bằng ngoặc tròn** (Sai): Chúng là hai kiểu khác nhau với hành vi khác nhau: tuple không có append/remove, không gán phần tử được, và hashable nên làm dict key được.
- **tuple chỉ chứa được các phần tử cùng kiểu, list thì chứa kiểu hỗn hợp** (Sai): Cả hai đều chứa được kiểu hỗn hợp: (1, "a", True) và [1, "a", True] đều hợp lệ; ràng buộc kiểu không phải là khác biệt.
- **list thay đổi được (mutable) — thêm/sửa/xoá phần tử sau khi tạo** (Đúng): tuple bất biến (immutable) — gán phần tử ném TypeError. Đúng: lst[0] = 9 hợp lệ, còn t[0] = 9 trên tuple ném TypeError: 'tuple' object does not support item assignment.

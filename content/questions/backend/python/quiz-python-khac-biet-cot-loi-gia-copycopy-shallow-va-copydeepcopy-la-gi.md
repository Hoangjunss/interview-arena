---
id: quiz-python-khac-biet-cot-loi-gia-copycopy-shallow-va-copydeepcopy-la-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa copy.copy() (shallow) và copy.deepcopy() là gì?

## Đáp án trắc nghiệm
- [ ] Cả hai luôn cho kết quả giống hệt nhau với mọi object
- [ ] copy.copy chỉ dùng cho list, deepcopy chỉ dùng cho dict
- [x] copy.copy chỉ tạo object mới ở cấp ngoài cùng
- [ ] deepcopy nhanh hơn vì được tối ưu bằng C

## Giải thích (VI)
Shallow copy (copy.copy) tạo một object mới ở cấp ngoài cùng nhưng các phần tử bên trong vẫn là tham chiếu dùng chung với bản gốc. Deep copy (copy.deepcopy) sao chép đệ quy mọi cấp lồng nhau, tạo object hoàn toàn độc lập. Với dữ liệu phẳng (chỉ chứa immutable) hai cách như nhau; khác biệt lộ ra khi có list/dict lồng nhau.

### Giải thích các phương án:
- **Cả hai luôn cho kết quả giống hệt nhau với mọi object** (Sai): Chỉ giống khi object "phẳng" (chỉ chứa phần tử immutable). Khi có object con lồng nhau (list trong list), sửa con qua bản shallow sẽ ảnh hưởng bản gốc.
- **copy.copy chỉ dùng cho list, deepcopy chỉ dùng cho dict** (Sai): Cả hai hoạt động tổng quát trên hầu hết object Python (list, dict, instance tự định nghĩa...), không giới hạn theo kiểu.
- **copy.copy chỉ tạo object mới ở cấp ngoài cùng** (Đúng): Đây chính là định nghĩa shallow vs deep: shallow copy chỉ nhân bản container ngoài, deep copy nhân bản toàn bộ đồ thị object bên trong. Các object con lồng bên trong vẫn dùng chung tham chiếu.
- **deepcopy nhanh hơn vì được tối ưu bằng C** (Sai): Ngược lại: deepcopy phải duyệt đệ quy và duy trì bảng memo nên thường chậm hơn shallow copy.

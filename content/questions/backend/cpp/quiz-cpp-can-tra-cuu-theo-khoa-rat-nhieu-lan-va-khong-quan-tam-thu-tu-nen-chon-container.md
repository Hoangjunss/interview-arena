---
id: quiz-cpp-can-tra-cuu-theo-khoa-rat-nhieu-lan-va-khong-quan-tam-thu-tu-nen-chon-container
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần tra cứu theo khoá rất nhiều lần và không quan tâm thứ tự. Nên chọn container nào?

## Đáp án trắc nghiệm
- [x] Bảng băm với thời gian tra cứu trung bình hằng số
- [ ] Danh sách liên kết để chèn xoá nhanh
- [ ] Cây tìm kiếm cân bằng để bảo đảm thời gian tra cứu
- [ ] Mảng động và duyệt tuần tự mỗi lần tra cứu

## Giải thích (VI)
Dùng bảng băm : tra cứu trung bình hằng số và không tốn chi phí giữ thứ tự. Cây tìm kiếm cân bằng chỉ đáng dùng khi cần duyệt theo thứ tự khoá hoặc cần bảo đảm chặt cho trường hợp xấu nhất.

### Giải thích các phương án:
- **Bảng băm với thời gian tra cứu trung bình hằng số** (Đúng): Không cần giữ thứ tự thì bảng băm nhanh hơn cây tìm kiếm trong phần lớn trường hợp.
- **Danh sách liên kết để chèn xoá nhanh** (Sai): Tra cứu phải duyệt tuyến tính nên rất chậm.
- **Cây tìm kiếm cân bằng để bảo đảm thời gian tra cứu** (Sai): Bảo đảm chặt hơn nhưng chậm hơn khi không cần thứ tự.
- **Mảng động và duyệt tuần tự mỗi lần tra cứu** (Sai): Chỉ hợp khi số phần tử rất nhỏ.

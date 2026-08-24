---
id: quiz-cs-fundamentals-can-lay-10-phan-tu-lon-nhat-tu-luong-100-trieu-so-khong-the-chua-het-trong-bo-nh
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần lấy 10 phần tử lớn nhất từ luồng 100 triệu số không thể chứa hết trong bộ nhớ. Cấu trúc dữ liệu nào phù hợp nhất?

## Đáp án trắc nghiệm
- [ ] Max-heap chứa toàn bộ 100 triệu phần tử rồi lấy ra 10 lần
- [x] Min-heap giữ đúng 10 phần tử
- [ ] Hash set để loại trùng rồi duyệt tìm giá trị lớn nhất 10 lần
- [ ] Sắp xếp toàn bộ luồng giảm dần rồi lấy 10 phần tử đầu

## Giải thích (VI)
Min-heap kích thước cố định 10. Duyệt luồng một lần, mỗi số so với gốc heap (phần tử nhỏ nhất trong top hiện tại): nhỏ hơn thì bỏ qua, lớn hơn thì thay gốc và cân bằng lại. Thời gian O(n log k), bộ nhớ O(k) — không cần giữ toàn bộ dữ liệu.

### Giải thích các phương án:
- **Max-heap chứa toàn bộ 100 triệu phần tử rồi lấy ra 10 lần** (Sai): Đúng về kết quả nhưng phải nạp toàn bộ dữ liệu vào bộ nhớ — vi phạm chính ràng buộc của đề bài.
- **Min-heap giữ đúng 10 phần tử** (Đúng): Heap giữ cố định 10 phần tử: mỗi số mới chỉ cần so với gốc (nhỏ nhất trong top 10), lớn hơn thì thay và cân bằng lại — O(n log 10) thời gian, O(10) bộ nhớ.
- **Hash set để loại trùng rồi duyệt tìm giá trị lớn nhất 10 lần** (Sai): Hash set không giữ thứ tự nên vẫn phải duyệt lại toàn bộ cho mỗi lần lấy — O(10n) — và vẫn phải lưu hết dữ liệu trong bộ nhớ.
- **Sắp xếp toàn bộ luồng giảm dần rồi lấy 10 phần tử đầu** (Sai): Tốn O(n log n) và cần giữ toàn bộ dữ liệu; làm thừa việc vì bài toán không yêu cầu biết thứ tự của 99.999.990 phần tử còn lại.

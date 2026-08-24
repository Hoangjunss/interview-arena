---
id: quiz-python-uu-diem-chinh-cua-generator-x-for-x-in-data-so-voi-list-comprehension-x-for-x-in
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ưu điểm chính của generator (x for x in data) so với list comprehension [x for x in data] khi xử lý chuỗi dữ liệu lớn là gì?

## Đáp án trắc nghiệm
- [x] Generator sinh lười từng phần tử nên dùng bộ nhớ O(1)
- [ ] Generator lưu toàn bộ kết quả trong RAM để tái sử dụng nhiều lần
- [ ] Generator cho phép truy cập ngẫu nhiên theo chỉ mục như list
- [ ] Generator luôn chạy nhanh hơn list ở mọi trường hợp

## Giải thích (VI)
Generator đánh giá lười : mỗi lần next() mới sinh một phần tử và chỉ giữ trạng thái hiện tại, nên bộ nhớ là O(1) thay vì O(n) như list comprehension dựng sẵn cả danh sách. Nhờ đó xử lý được luồng dữ liệu rất lớn hoặc vô hạn. Đánh đổi: generator chỉ duyệt một lần, không index, không len().

### Giải thích các phương án:
- **Generator sinh lười từng phần tử nên dùng bộ nhớ O(1)** (Đúng): Generator không dựng sẵn toàn bộ kết quả; mỗi lần next() mới tính một phần tử, nên bộ nhớ không tăng theo kích thước dữ liệu. Nó chỉ giữ trạng thái hiện tại thay vì toàn bộ kết quả.
- **Generator lưu toàn bộ kết quả trong RAM để tái sử dụng nhiều lần** (Sai): Ngược lại: generator không lưu kết quả và chỉ duyệt được một lần ; duyệt cạn là hết, muốn dùng lại phải tạo mới.
- **Generator cho phép truy cập ngẫu nhiên theo chỉ mục như list** (Sai): Generator không hỗ trợ gen[i] hay len(gen); nó chỉ tiến tới tuần tự bằng next().
- **Generator luôn chạy nhanh hơn list ở mọi trường hợp** (Sai): Không hẳn: có overhead mỗi bước và nếu cần duyệt nhiều lần thì phải tạo lại; lợi thế chính là bộ nhớ, không phải tốc độ tuyệt đối.

---
id: quiz-python-so-voi-list-thuan-python-numpyndarray-co-loi-the-chinh-nao-khi-xu-ly-so-luong-lo
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So với list thuần Python, numpy.ndarray có lợi thế chính nào khi xử lý số lượng lớn số liệu?

## Đáp án trắc nghiệm
- [ ] ndarray có thể chứa các phần tử khác kiểu tùy ý giống hệt list
- [ ] Thêm phần tử (append) vào ndarray rẻ hơn append vào list
- [x] Phần tử cùng kiểu nằm liên tục trong bộ nhớ, tính toán vectorized
- [ ] ndarray thuộc thư viện chuẩn nên luôn có sẵn, không cần cài

## Giải thích (VI)
ndarray lưu phần tử cùng một dtype trong bộ nhớ liên tục , và cho phép vectorization — cả phép toán chạy một lần trong C thay vì vòng lặp Python từng phần tử. Nhờ đó nhanh hơn nhiều lần và tốn ít RAM hơn cho dữ liệu số lớn. Đổi lại: kích thước cố định (append tốn kém) và numpy là thư viện bên thứ ba phải cài.

### Giải thích các phương án:
- **ndarray có thể chứa các phần tử khác kiểu tùy ý giống hệt list** (Sai): Mảng số học của numpy là đồng nhất một dtype cố định; chính sự đồng nhất này mới tạo ra hiệu năng. (Muốn hỗn hợp phải dùng dtype=object và mất luôn lợi thế.)
- **Thêm phần tử (append) vào ndarray rẻ hơn append vào list** (Sai): Ngược lại: np.append phải cấp phát mảng mới và copy toàn bộ (O(n)); list append là amortized O(1).
- **Phần tử cùng kiểu nằm liên tục trong bộ nhớ, tính toán vectorized** (Đúng): Bộ đệm liên tục + một dtype cố định cho phép vòng lặp tối ưu trong C (vectorization), tránh overhead của object Python trên từng phần tử. Vòng lặp thật chạy trong C thay vì trong Python.
- **ndarray thuộc thư viện chuẩn nên luôn có sẵn, không cần cài** (Sai): numpy là thư viện bên thứ ba (pip install numpy), không nằm trong standard library.

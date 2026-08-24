---
id: quiz-typescript-voi-type-status-loading-success-error-bien-const-s-status-chap-nhan-nhng-gia-tri
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với type Status = 'loading' | 'success' | 'error', biến const s: Status chấp nhận những giá trị nào?

## Đáp án trắc nghiệm
- [ ] Lỗi khai báo — muốn giới hạn tập giá trị bắt buộc phải dùng enum
- [ ] Ba chuỗi đó và cả undefined, vì biến chưa chắc được gán
- [x] Chỉ đúng 3 chuỗi 'loading', 'success', 'error'
- [ ] Mọi chuỗi bất kỳ — union literal chỉ mang tính gợi ý cho IDE autocomplete

## Giải thích (VI)
Chỉ đúng 3 giá trị 'loading', 'success', 'error' — literal type là kiểu bằng chính xác một giá trị cụ thể, union của chúng tạo tập đóng. Đây là cách tạo kiểu enum-like không tốn runtime overhead, rất phổ biến cho API state. Bẫy: let s = 'loading' suy ra string (widen), cần const hoặc as const để giữ literal.

### Giải thích các phương án:
- **Lỗi khai báo — muốn giới hạn tập giá trị bắt buộc phải dùng enum** (Sai): Union of string literals là cách thay enum phổ biến hơn hiện nay: cùng khả năng giới hạn giá trị nhưng không sinh code runtime.
- **Ba chuỗi đó và cả undefined, vì biến chưa chắc được gán** (Sai): Union không tự thêm undefined; muốn cho phép vắng giá trị phải khai báo tường minh Status | undefined hoặc dùng optional property.
- **Chỉ đúng 3 chuỗi 'loading', 'success', 'error'** (Đúng): Mọi chuỗi khác, kể cả 'Loading' viết hoa, đều lỗi compile. Literal type là kiểu chính xác bằng MỘT giá trị cụ thể; union của 3 literal tạo tập đóng gồm đúng 3 giá trị, so khớp phân biệt hoa thường.
- **Mọi chuỗi bất kỳ — union literal chỉ mang tính gợi ý cho IDE autocomplete** (Sai): Literal union là ràng buộc thật của compiler, không phải gợi ý: gán chuỗi ngoài tập báo lỗi compile ngay.

---
id: lint-react-hooks-exhaustive-deps-bao-thieu-dependency-them-eslint-disable-next-l
position: backend
technology: dependencies
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lint `react-hooks/exhaustive-deps` báo thiếu dependency. Thêm `// eslint-disable-next-line` để tắt cảnh báo có sao không?

## Question (EN)
The `react-hooks/exhaustive-deps` lint warns about a missing dependency. Is it fine to silence it with `// eslint-disable-next-line`?

## Đáp án chi tiết (VI)
Không nên. Cảnh báo đó nói rằng effect **đọc một giá trị reactive** (prop, state, hoặc biến tính từ chúng) nhưng không khai báo trong dependency array — nghĩa là khi giá trị đó đổi, effect **không chạy lại** và tiếp tục dùng giá trị của lần render cũ.\
\
```jsx\
// warning: userId is read but not declared\
useEffect(() =\u003e {\
  fetchProfile(userId).then(setProfile)\
}, [])\
// switching to another user keeps showing the first profile\
```\
\
Cách xử lý đúng theo thứ tự:\
\
1. **Khai báo đủ dependency** — mặc định luôn làm cách này.\
2. Nếu effect chạy quá nhiều vì dependency đổi mỗi render (object, function), **sửa nguồn dependency**: đưa function vào trong effect, tách primitive ra (`user.id` thay vì cả `user`), hoặc bọc bằng `useMemo`/`useCallback`.\
3. Nếu thấy phải tắt lint mới đúng ý, thường effect đó **không nên là effect** — logic thuộc về event handler.\
\
Tắt lint chỉ giấu cảnh báo, bug stale value vẫn còn và rất khó truy khi dữ liệu đổi theo route hoặc theo user.

## Detailed Answer (EN)
$89

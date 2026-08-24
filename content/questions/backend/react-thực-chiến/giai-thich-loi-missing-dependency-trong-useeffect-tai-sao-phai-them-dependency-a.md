---
id: giai-thich-loi-missing-dependency-trong-useeffect-tai-sao-phai-them-dependency-a
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích lỗi 'missing dependency' trong useEffect. Tại sao phải thêm dependency array? Khi nào không cần?

## Question (EN)
Explain the 'missing dependency' warning in useEffect. Why add a dependency array? When is it not needed?

## Đáp án chi tiết (VI)
React cảnh báo 'missing dependency' khi bạn sử dụng một biến bên trong useEffect nhưng không khai báo nó trong dependency array, vì lúc đó effect sẽ dùng giá trị cũ do stale closure.\
\
Nếu không truyền dependency array, effect sẽ chạy sau mỗi lần render. Nếu truyền mảng rỗng [], effect chỉ chạy một lần sau khi component mount. Khi thêm biến vào mảng, effect sẽ chạy lại mỗi khi biến đó thay đổi — đây là cách đúng để đồng bộ side effect với state hoặc props.

## Detailed Answer (EN)
React warns 'missing dependency' when you use a variable inside useEffect but don't declare it in the dependency array — the effect will read a stale value due to closure. Without a dependency array, the effect runs after every render. With an empty array [], it runs only once after mount. Adding variables to the array causes the effect to re-run whenever those variables change — this is the correct way to keep side effects in sync with state or props.

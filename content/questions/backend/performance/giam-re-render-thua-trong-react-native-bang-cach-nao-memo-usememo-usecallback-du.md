---
id: giam-re-render-thua-trong-react-native-bang-cach-nao-memo-usememo-usecallback-du
position: backend
technology: performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giảm re-render thừa trong React Native bằng cách nào? memo, useMemo, useCallback dùng khi nào?

## Question (EN)
How do you reduce needless re-renders in React Native (memo, useMemo, useCallback)?

## Đáp án chi tiết (VI)
React render lại component khi props/state đổi; render lan xuống cây con → dễ dư thừa nếu không kiểm soát.\
\
Công cụ:\
- **`React.memo`**: bọc component để **bỏ qua render** nếu props không đổi (so sánh nông). Hữu ích cho item list, component con nặng.\
- **`useCallback`**: ghi nhớ **hàm** để không tạo tham chiếu mới mỗi render — nếu không, `memo` con vẫn render lại vì prop callback \\"khác\\".\
- **`useMemo`**: ghi nhớ **giá trị/kết quả tính toán nặng** giữa các render.\
\
Lưu ý:\
- Đừng lạm dụng — memoize cũng có chi phí; chỉ dùng khi có render nặng/list dài thực sự.\
- Nguyên nhân re-render thường gặp: object/array/hàm inline làm prop, context đổi rộng, key không ổn định.\
\
Hay hỏi: vì sao truyền `() =\u003e {}` inline làm hỏng `React.memo` của con.

## Detailed Answer (EN)
React re-renders a component when props/state change; renders cascade into children → easily wasteful if uncontrolled.\
\
Tools:\
- **`React.memo`**: wraps a component to **skip rendering** when props are unchanged (shallow compare). Useful for list items and heavy children.\
- **`useCallback`**: memoizes a **function** so it does not get a new reference each render — otherwise a `memo`'d child still re-renders because the callback prop \\"differs\\".\
- **`useMemo`**: memoizes a **value/expensive computation** across renders.\
\
Notes:\
- Do not overuse — memoization has cost; apply it only for genuinely heavy renders/long lists.\
- Common re-render causes: inline object/array/function props, broad context changes, unstable keys.\
\
Common ask: why passing an inline `() =\u003e {}` defeats a child's `React.memo`.

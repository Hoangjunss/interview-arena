---
id: khi-nao-mot-du-an-react-chua-can-thu-vien-quan-ly-state
position: backend
technology: chọn-công-cụ
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào một dự án React chưa cần thư viện quản lý state?

## Question (EN)
When does a React project not need a state-management library yet?

## Đáp án chi tiết (VI)
Phần lớn dự án vừa và nhỏ **chưa cần**. Thứ tự leo thang nên theo:\
\
1. `useState` ngay tại component dùng nó.\
2. **Lift state up** — đưa lên cha chung gần nhất khi hai component anh em cần cùng dữ liệu.\
3. **Truyền props / composition** — đưa JSX qua `children` để tránh chuỗi prop drilling dài.\
4. **Context** cho vài giá trị ít đổi: theme, locale, user đăng nhập.\
5. Thư viện chỉ khi có đủ tín hiệu: state client thật sự dùng chéo nhiều nhánh, cập nhật thường xuyên gây re-render diện rộng, hoặc cần đọc/ghi state từ ngoài React.\
\
Dấu hiệu ngược lại rất quan trọng: nếu 80% state trong app là dữ liệu fetch từ API, thứ cần thêm là **thư viện data-fetching** chứ không phải store global. Sau khi đưa server state cho React Query, phần client state còn lại thường nhỏ tới mức `useState` là đủ.\
\
Cũng đừng lưu **derived state** vào store: cái gì tính được từ state khác thì tính lúc render, đừng tạo thêm một biến rồi phải đồng bộ.

## Detailed Answer (EN)
Most small and mid-size projects **do not need one**. Escalate in this order:\
\
1. `useState` right where it is used.\
2. **Lift state up** to the nearest common parent when two siblings need it.\
3. **Props / composition** — pass JSX through `children` to avoid long prop-drilling chains.\
4. **Context** for a few rarely-changing values: theme, locale, signed-in user.\
5. A library only once the signals are real: client state genuinely shared across branches, frequent updates causing wide re-renders, or a need to read/write state outside React.\
\
The counter-signal matters just as much: if 80% of your state is data fetched from an API, what you need is a **data-fetching library**, not a global store. Once server state moves to React Query, the remaining client state is often small enough for `useState`.\
\
Also do not store **derived state**: anything computable from other state should be computed during render instead of kept in a second variable you must keep in sync.

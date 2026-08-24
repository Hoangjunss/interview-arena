---
id: phan-biet-props-va-state-trong-react
position: backend
technology: react-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt props và state trong React?

## Question (EN)
What is the difference between props and state in React?

## Đáp án chi tiết (VI)
Cả hai đều là dữ liệu điều khiển những gì component render, nhưng khác nhau về **quyền sở hữu và khả năng thay đổi**:\
\
- **Props** (properties): dữ liệu **cha truyền xuống** con. Với chính component nhận, props là **chỉ đọc (read-only)** — không được sửa. Luồng dữ liệu **một chiều, từ trên xuống**. Đổi giá trị props là việc của cha.\
- **State**: dữ liệu **nội bộ do chính component quản lý** qua `useState`/`useReducer`. **Thay đổi được** bằng hàm setter, và mỗi lần đổi sẽ **kích hoạt re-render**.\
\
Điểm mấu chốt:\
- Cùng một dữ liệu: nếu component **tự sở hữu và thay đổi** → state; nếu **nhận từ ngoài** → props.\
- Muốn con \\"đổi\\" dữ liệu của cha: cha truyền **hàm callback qua props**, con gọi để yêu cầu cha cập nhật state (lifting state up).\
- Đừng sao chép props vào state rồi để hai bên lệch nhau — chỉ làm vậy khi thật sự cần giá trị khởi tạo độc lập.

## Detailed Answer (EN)
Both are data that drive what a component renders, but they differ in **ownership and mutability**:\
\
- **Props** (properties): data **passed down from a parent** to a child. To the receiving component, props are **read-only** — you must not modify them. Data flows **one-way, top-down**. Changing a prop’s value is the parent’s job.\
- **State**: **internal data the component manages itself** via `useState`/`useReducer`. It is **mutable** through a setter, and every change **triggers a re-render**.\
\
The crux:\
- For a given piece of data: if the component **owns and changes** it → state; if it **comes from outside** → props.\
- For a child to \\"change\\" the parent’s data: the parent passes a **callback via props**, which the child calls to ask the parent to update its state (lifting state up).\
- Do not copy props into state and let them drift — do that only when you genuinely need an independent initial value.

---
id: compound-components-pattern-la-gi
position: backend
technology: components
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Compound Components pattern là gì?

## Question (EN)
What is the Compound Components pattern?

## Đáp án chi tiết (VI)
**Compound Components** là một design pattern trong React cho phép nhiều component kết hợp cùng nhau để thực hiện một tác vụ hoặc tạo thành một UI duy nhất, trong đó chúng chia sẻ trạng thái (state) ngầm với nhau (thường thông qua React Context) mà không cần phải truyền props thủ công (props drilling).\
\
**Ví dụ điển hình:**\
Thẻ `\u003cselect\u003e` và `\u003coption\u003e` trong HTML là nguồn cảm hứng lớn nhất. Trong React, nó thường trông như thế này:\
```jsx\
\u003cSelect\u003e\
  \u003cSelect.Toggle /\u003e\
  \u003cSelect.List\u003e\
    \u003cSelect.Option value=\\"1\\"\u003eLựa chọn 1\u003c/Select.Option\u003e\
    \u003cSelect.Option value=\\"2\\"\u003eLựa chọn 2\u003c/Select.Option\u003e\
  \u003c/Select.List\u003e\
\u003c/Select\u003e\
```\
\
**Ưu điểm:**\
- **API Declarative \u0026 Linh hoạt:** Người dùng (developer sử dụng component) có thể tự do sắp xếp, thay đổi thứ tự, hoặc lồng ghép các sub-components tùy ý mà chức năng vẫn hoạt động trơn tru.\
- **Đóng gói logic tốt:** Mọi logic xử lý (đóng/mở dropdown, chọn mục hiện tại) đều được giấu kín bên trong component cha (`\u003cSelect\u003e`), giúp UI bên ngoài trở nên rất sạch sẽ và dễ đọc.

## Detailed Answer (EN)
**Compound Components** is a React design pattern that allows multiple components to work together to accomplish a single task or form a unified UI, sharing state implicitly (usually via React Context) without requiring manual prop drilling.\
\
**Classic Example:**\
The HTML `\u003cselect\u003e` and `\u003coption\u003e` elements are the biggest inspiration. In React, it often looks like this:\
```jsx\
\u003cSelect\u003e\
  \u003cSelect.Toggle /\u003e\
  \u003cSelect.List\u003e\
    \u003cSelect.Option value=\\"1\\"\u003eOption 1\u003c/Select.Option\u003e\
    \u003cSelect.Option value=\\"2\\"\u003eOption 2\u003c/Select.Option\u003e\
  \u003c/Select.List\u003e\
\u003c/Select\u003e\
```\
\
**Advantages:**\
- **Declarative \u0026 Flexible API:** Consumers (developers using the component) can freely arrange, reorder, or nest sub-components however they like, and the functionality remains intact.\
- **Excellent Encapsulation:** All the complex logic (toggling the dropdown, managing the active selection) is hidden inside the parent component (`\u003cSelect\u003e`), keeping the external UI implementation clean and highly readable.

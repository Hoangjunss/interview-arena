---
id: componentdidmount-duoc-goi-khi-nao-va-dung-de-lam-gi
position: backend
technology: lifecycle
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
componentDidMount được gọi khi nào và dùng để làm gì?

## Question (EN)
When is componentDidMount called and what is it used for?

## Đáp án chi tiết (VI)
componentDidMount được gọi một lần duy nhất ngay sau khi component được gắn vào DOM lần đầu. Đây là nơi thích hợp để: fetch dữ liệu từ API, đăng ký event listeners, khởi tạo thư viện cần DOM như D3 hay Google Maps. Tương đương `useEffect(() =\u003e { fetchData(); }, [])` trong function component. \
\
**Lưu ý:** gọi setState bên trong sẽ trigger thêm một lần render nhưng user không thấy trạng thái trung gian.

## Detailed Answer (EN)
componentDidMount is called exactly once, right after the component is inserted into the DOM for the first time. It is the right place to fetch data from an API, register event listeners, or initialize DOM-dependent libraries like D3 or Google Maps. The equivalent in function components is `useEffect(() =\u003e { fetchData(); }, [])`. \
\
**Note:** calling setState inside it triggers an extra render, but the user does not see the intermediate state.
